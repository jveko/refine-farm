// Import both auth providers
import { TOKEN_KEY } from "@/constants";
import { msalInstance, tokenRequest } from "@/config";
import { AuthProvider } from "@refinedev/core";
import {
  AccountInfo,
  AuthenticationResult,
  InteractionRequiredAuthError,
  SilentRequest
} from "@azure/msal-browser";
import { jwtDecode } from "jwt-decode";
import { axiosApp, axiosAuth } from "@/config/client";
import { mockAuthProvider } from "./mock-auth";

// Flag to use mock auth provider for testing
const USE_MOCK_AUTH = true;

// Export the mock auth provider if flag is true
export const authProvider: AuthProvider = USE_MOCK_AUTH 
  ? mockAuthProvider 
  : createAzureAuthProvider();

// Original Azure AD auth provider wrapped in a function
function createAzureAuthProvider(): AuthProvider {
  // Token refresh settings
  // Refresh token when it's 10 minutes away from expiring
  const TOKEN_EXPIRY_BUFFER = 10 * 60 * 1000; // 10 minutes in milliseconds
  // Minimum interval between token refresh attempts
  const MIN_TOKEN_REFRESH_INTERVAL = 30 * 1000; // 30 seconds
  // Maximum number of silent refresh attempts before forcing popup
  const MAX_SILENT_REFRESH_ATTEMPTS = 3;

  // Keep track of the refresh timer and last refresh time
  let tokenRefreshTimer: number | null = null;
  let lastTokenRefreshAttempt = 0;
  let isRefreshingToken = false;
  let refreshSubscribers: Array<(token: string) => void> = [];
  let silentRefreshAttempts = 0;

  // Function to add request to queue
  const subscribeTokenRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
  };

  // Function to process queue with new token
  const onTokenRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
  };

  // Helper function to decode JWT and get expiration time
  const getTokenExpirationTime = (token: string): number => {
    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      return decoded.exp * 1000; // Convert to milliseconds
    } catch (error) {
      console.error("Error decoding token:", error);
      // If we can't decode the token, assume it expires in 1 hour
      return Date.now() + 60 * 60 * 1000;
    }
  };

  // Calculate time until token needs to be refreshed
  const getTimeUntilRefresh = (token: string): number => {
    const expirationTime = getTokenExpirationTime(token);
    return Math.max(0, expirationTime - Date.now() - TOKEN_EXPIRY_BUFFER);
  };

  // Helper function to start token refresh timer
  const startTokenRefreshTimer = (token: string) => {
    // Clear any existing timer
    stopTokenRefreshTimer();
    
    // Calculate when to refresh the token
    const timeUntilRefresh = getTimeUntilRefresh(token);
    
    console.debug(`Token will be refreshed in ${Math.floor(timeUntilRefresh / 1000)} seconds`);
    
    // Set up a new timer to refresh the token before it expires
    tokenRefreshTimer = window.setTimeout(async () => {
      try {
        await refreshAccessToken();
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }, timeUntilRefresh);
  };

  // Helper function to stop token refresh timer
  const stopTokenRefreshTimer = () => {
    if (tokenRefreshTimer) {
      window.clearTimeout(tokenRefreshTimer);
      tokenRefreshTimer = null;
    }
  };

  // Helper function to refresh the access token
  const refreshAccessToken = async (): Promise<string | null> => {
    // Prevent multiple simultaneous refresh attempts
    if (isRefreshingToken) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          resolve(token);
        });
      });
    }
    
    // Throttle refresh attempts
    const now = Date.now();
    if (now - lastTokenRefreshAttempt < MIN_TOKEN_REFRESH_INTERVAL) {
      console.debug("Token refresh throttled");
      return localStorage.getItem(TOKEN_KEY);
    }
    
    isRefreshingToken = true;
    lastTokenRefreshAttempt = now;
    
    try {
      const account = msalInstance.getActiveAccount();
      
      if (!account) {
        console.error("No active account found");
        isRefreshingToken = false;
        return null;
      }
      
      const request: SilentRequest = {
        ...tokenRequest,
        account: account,
      };
      
      // Try silent token refresh
      console.debug("Refreshing access token silently");
      try {
        const response = await msalInstance.acquireTokenSilent(request);
        
        // Success - reset silent refresh attempts counter
        silentRefreshAttempts = 0;
        
        localStorage.setItem(TOKEN_KEY, response.accessToken);
        
        // Schedule the next token refresh
        startTokenRefreshTimer(response.accessToken);
        
        // Process any queued requests
        onTokenRefreshed(response.accessToken);
        isRefreshingToken = false;
        
        return response.accessToken;
      } catch (silentError) {
        // If silent refresh fails, increment the counter
        silentRefreshAttempts++;
        
        // If we've tried too many times silently, or if it's an interaction required error,
        // try with popup
        if (silentError instanceof InteractionRequiredAuthError ||
            silentRefreshAttempts >= MAX_SILENT_REFRESH_ATTEMPTS) {
          
          console.debug(`Silent token refresh failed (attempt ${silentRefreshAttempts}), trying popup`);
          
          try {
            // Try to get a new token with popup
            const response = await msalInstance.acquireTokenPopup(tokenRequest);
            
            if (response) {
              // Reset silent refresh attempts counter after successful popup
              silentRefreshAttempts = 0;
              
              localStorage.setItem(TOKEN_KEY, response.accessToken);
              
              // Schedule the next token refresh
              startTokenRefreshTimer(response.accessToken);
              
              // Process any queued requests
              onTokenRefreshed(response.accessToken);
              isRefreshingToken = false;
              
              return response.accessToken;
            }
          } catch (popupError) {
            console.error("Failed to acquire token with popup:", popupError);
            // If popup fails, we need to redirect to login
            stopTokenRefreshTimer();
            localStorage.removeItem(TOKEN_KEY);
            msalInstance.setActiveAccount(null);
            
            // Only redirect if we're not in a hidden iframe
            if (window.self === window.top) {
              window.location.href = "/login";
            }
          }
        } else {
          // If it's not an interaction required error and we haven't exceeded max attempts,
          // log the error but don't try popup yet
          console.warn(`Silent token refresh failed (attempt ${silentRefreshAttempts}), will retry later:`, silentError);
          
          // Schedule another attempt sooner than normal
          const currentToken = localStorage.getItem(TOKEN_KEY);
          if (currentToken) {
            const reducedTime = Math.max(30000, getTimeUntilRefresh(currentToken) / 2);
            
            // Clear any existing timer
            stopTokenRefreshTimer();
            
            // Set up a new timer with reduced time
            tokenRefreshTimer = window.setTimeout(async () => {
              try {
                await refreshAccessToken();
              } catch (error) {
                console.error("Failed to refresh token:", error);
              }
            }, reducedTime);
          }
        }
        
        throw silentError; // Re-throw to be caught by outer catch
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      isRefreshingToken = false;
      return null;
    }
  };

  // Set up axios interceptors to handle token expiration
  const setupAxiosInterceptors = () => {
    // Request interceptor for both axios instances
    const requestInterceptor = (config: any) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    };

    // Response interceptor for both axios instances
    const responseInterceptor = async (error: any) => {
      const originalRequest = error.config;
      
      // If the error is due to an unauthorized request (401) and we haven't tried to refresh the token yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Try to refresh the token
          const token = await refreshAccessToken();
          
          if (token) {
            // Update the request header with the new token
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            
            // Retry the original request with the new token
            if (originalRequest.baseURL === axiosAuth.defaults.baseURL) {
              return axiosAuth(originalRequest);
            } else {
              return axiosApp(originalRequest);
            }
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
        }
      }
      
      return Promise.reject(error);
    };

    // Apply interceptors to both axios instances
    axiosApp.interceptors.request.use(requestInterceptor);
    axiosApp.interceptors.response.use(response => response, responseInterceptor);
    
    axiosAuth.interceptors.request.use(requestInterceptor);
    axiosAuth.interceptors.response.use(response => response, responseInterceptor);
  };

  // Initialize the interceptors
  setupAxiosInterceptors();

  return {
    login: async () => {
      await msalInstance.loginRedirect();
      return {
        success: true,
      };
    },
    register: async () => ({
      success: true,
    }),
    updatePassword: async () => ({
      success: true,
    }),
    logout: async () => {
      stopTokenRefreshTimer();
      localStorage.removeItem(TOKEN_KEY);
      msalInstance.setActiveAccount(null);
      
      // Clear any pending requests
      refreshSubscribers = [];
      isRefreshingToken = false;
      
      return {
        success: true,
        redirectTo: "/login?isLoggedOut=true",
      };
    },
    check: async () => {
      try {
        const account = msalInstance.getActiveAccount();
        if (account === null) {
          return {
            authenticated: false,
            redirectTo: "/login",
          };
        }
        
        // Get the current token from localStorage
        const currentToken = localStorage.getItem(TOKEN_KEY);
        
        // If we don't have a token, try to get one silently
        if (!currentToken) {
          try {
            const request: SilentRequest = {
              ...tokenRequest,
              account: account,
            };
            
            const token = await msalInstance.acquireTokenSilent(request);
            localStorage.setItem(TOKEN_KEY, token.accessToken);
            
            // Start the token refresh timer with the new token
            startTokenRefreshTimer(token.accessToken);
          } catch (tokenError) {
            console.error("Error acquiring token:", tokenError);
            
            if (tokenError instanceof InteractionRequiredAuthError) {
              // Token expired and requires user interaction
              return {
                authenticated: false,
                redirectTo: "/login",
              };
            }
          }
        } else {
          // We have a token, but let's check if it's valid or about to expire
          const expirationTime = getTokenExpirationTime(currentToken);
          const now = Date.now();
          
          // If token is expired or about to expire in the next minute, try to refresh it
          if (expirationTime - now < 60000) {
            try {
              const newToken = await refreshAccessToken();
              if (!newToken) {
                // If we couldn't refresh the token, redirect to login
                return {
                  authenticated: false,
                  redirectTo: "/login",
                };
              }
            } catch (refreshError) {
              console.error("Error refreshing token during check:", refreshError);
              return {
                authenticated: false,
                redirectTo: "/login",
              };
            }
          } else {
            // Token is still valid, set up the refresh timer
            startTokenRefreshTimer(currentToken);
          }
        }
        
        return {
          authenticated: true,
        };
      } catch (e) {
        console.error("Error checking authentication:", e);
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }
    },
    onError: async (error) => {
      // Check if the error is related to authentication
      if (error?.response?.status === 401) {
        // Try to refresh the token
        try {
          const token = await refreshAccessToken();
          
          if (!token) {
            // If we couldn't refresh the token, redirect to login
            console.warn("Authentication error: Unable to refresh token, redirecting to login");
            return {
              error,
              logout: true,
              redirectTo: "/login",
            };
          }
          
          // If we successfully refreshed the token, we can retry the request
          console.debug("Token refreshed successfully after 401 error");
          return { error };
        } catch (refreshError) {
          console.error("Error refreshing token in onError:", refreshError);
          return {
            error,
            logout: true,
            redirectTo: "/login",
          };
        }
      } else if (error?.response?.status === 403) {
        // Forbidden - user doesn't have permission
        console.warn("Permission error: User doesn't have access to this resource");
        // We don't log out here, just return the error
        return { error };
      } else if (error?.response?.status >= 500) {
        // Server error
        console.error("Server error:", error);
        return { error };
      }
      
      console.error("Unhandled error:", error);
      return { error };
    },
    getPermissions: async () => null,
    getIdentity: async (): Promise<undefined> => {
      return undefined;
    },
  };
}

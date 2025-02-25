import { TOKEN_KEY } from "@/constants";
import {
  AccountInfo,
  AuthenticationResult,
  BrowserCacheLocation,
  Configuration,
  EventPayload,
  EventType,
  InteractionRequiredAuthError,
  PublicClientApplication,
  SilentRequest,
} from "@azure/msal-browser";

const {
  VITE_AUTH_AZURE_CLIENT_ID: VITE_AUTH_AZURE_CLIENT_ID,
  VITE_AUTH_AZURE_AUTHORITY: VITE_AUTH_AZURE_AUTHORITY,
  VITE_AUTH_AZURE_REDIRECT_URI: VITE_AUTH_AZURE_REDIRECT_URI,
  VITE_AUTH_AZURE_POST_LOGOUT_REDIRECT_URI:
    VITE_AUTH_AZURE_POST_LOGOUT_REDIRECT_URI,
  VITE_AUTH_AZURE_SCOPE: VITE_AUTH_AZURE_SCOPE,
} = import.meta.env;

if (!VITE_AUTH_AZURE_CLIENT_ID) {
  throw new Error("AUTH_AZURE_CLIENT_ID is not set");
}
if (!VITE_AUTH_AZURE_AUTHORITY) {
  throw new Error("AUTH_AZURE_AUTHORITY is not set");
}
if (!VITE_AUTH_AZURE_REDIRECT_URI) {
  throw new Error("AUTH_AZURE_REDIRECT_URI is not set");
}
if (!VITE_AUTH_AZURE_POST_LOGOUT_REDIRECT_URI) {
  throw new Error("AUTH_AZURE_POST_LOGOUT_REDIRECT_URI is not set");
}
if (!VITE_AUTH_AZURE_SCOPE) {
  throw new Error("AUTH_AZURE_SCOPE is not set");
}

const msalConfig: Configuration = {
  auth: {
    clientId: VITE_AUTH_AZURE_CLIENT_ID,
    authority: VITE_AUTH_AZURE_AUTHORITY,
    redirectUri: VITE_AUTH_AZURE_REDIRECT_URI,
    postLogoutRedirectUri: VITE_AUTH_AZURE_POST_LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: true,
    secureCookies: import.meta.env.MODE === "production",
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case 0:
            console.error(message);
            return;
          case 1:
            console.warn(message);
            return;
          case 2:
            console.info(message);
            return;
          case 3:
            console.debug(message);
            return;
          default:
            console.log(message);
            return;
        }
      },
      piiLoggingEnabled: false,
      logLevel: import.meta.env.MODE === "development" ? 3 : 1,
    },
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Handle redirect promise to catch any errors during redirect login
msalInstance
  .handleRedirectPromise()
  .then((response) => {
    // Handle successful login
    if (response) {
      msalInstance.setActiveAccount(response.account);
      localStorage.setItem(TOKEN_KEY, response.accessToken);
    }
  })
  .catch((error) => {
    console.error("Error during redirect handling:", error);
  });

msalInstance.addEventCallback(async (event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const payload: EventPayload = event.payload;
    msalInstance.setActiveAccount(payload as AccountInfo);

    const account = msalInstance.getActiveAccount();
    if (account) {
      const request: SilentRequest = {
        ...tokenRequest,
        account: account,
      };
      try {
        const response = await msalInstance.acquireTokenSilent(request);
        localStorage.setItem(TOKEN_KEY, response.accessToken);
      } catch (e) {
        if (e instanceof InteractionRequiredAuthError) {
          // Token expired and requires user interaction
          try {
            const response = await msalInstance.acquireTokenPopup(request);
            localStorage.setItem(TOKEN_KEY, response.accessToken);
          } catch (popupError) {
            console.error("Error acquiring token with popup:", popupError);
          }
        } else {
          console.error("Error acquiring token silently:", e);
        }
      }
    }
  }
  if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
    const authResult = event.payload as AuthenticationResult;
    localStorage.setItem(TOKEN_KEY, authResult.accessToken);
    msalInstance.setActiveAccount(authResult.account);
  }
  if (event.eventType === EventType.ACQUIRE_TOKEN_FAILURE) {
    console.error("Token acquisition failed:", event.error);
    
    // If the error is due to interaction required, we can try to acquire the token with popup
    if (event.error instanceof InteractionRequiredAuthError) {
      const account = msalInstance.getActiveAccount();
      if (account) {
        try {
          const response = await msalInstance.acquireTokenPopup({
            ...tokenRequest,
            account: account,
          });
          localStorage.setItem(TOKEN_KEY, response.accessToken);
        } catch (popupError) {
          console.error("Error acquiring token with popup:", popupError);
        }
      }
    }
  }
  if (event.eventType === EventType.LOGOUT_SUCCESS) {
    localStorage.removeItem(TOKEN_KEY);
    msalInstance.setActiveAccount(null);
  }
});

export const tokenRequest = {
  scopes: [VITE_AUTH_AZURE_SCOPE],
};

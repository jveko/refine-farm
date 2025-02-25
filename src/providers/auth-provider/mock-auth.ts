import { TOKEN_KEY } from "@/constants";
import { AuthProvider } from "@refinedev/core";

// Mock token for testing
const MOCK_TOKEN = "mock-token-for-testing-purposes";

export const mockAuthProvider: AuthProvider = {
  login: async () => {
    // Set mock token in localStorage
    localStorage.setItem(TOKEN_KEY, MOCK_TOKEN);
    return {
      success: true,
      redirectTo: "/",
    };
  },
  register: async () => ({
    success: true,
  }),
  updatePassword: async () => ({
    success: true,
  }),
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }
    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  onError: async (error) => {
    console.error("Auth error:", error);
    return { error };
  },
  getPermissions: async () => ["admin"],
  getIdentity: async () => {
    return {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
    };
  },
};
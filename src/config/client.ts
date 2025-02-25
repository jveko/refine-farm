import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 500,
    },
  },
});

const { VITE_APP_API_URL: VITE_APP_API_URL, VITE_AUTH_API_URL: VITE_AUTH_API_URL } =
  import.meta.env;

if (!VITE_APP_API_URL) {
  throw new Error("APP_API_URL is not defined");
}

if (!VITE_AUTH_API_URL) {
  throw new Error("AUTH_API_URL is not defined");
}

// Create axios instances with base URLs
export const axiosApp = axios.create({
  baseURL: VITE_APP_API_URL,
});

export const axiosAuth = axios.create({
  baseURL: VITE_AUTH_API_URL,
});

// Note: The token refresh and axios interceptors are now managed in the auth provider
// This prevents duplication of logic and ensures consistent behavior

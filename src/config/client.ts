import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TOKEN_KEY } from "@/constants";

export const queryClient = new QueryClient();

const { VITE_APP_API_URL: VITE_APP_API_URL, VITE_AUTH_API_URL: VITE_AUTH_API_URL } =
  import.meta.env;

if (!VITE_APP_API_URL) {
  throw new Error("APP_API_URL is not defined");
}

if (!VITE_AUTH_API_URL) {
  throw new Error("AUTH_API_URL is not defined");
}

export const axiosApp = axios.create({
  baseURL: VITE_APP_API_URL,
});

axiosApp.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const axiosAuth = axios.create({
  baseURL: VITE_AUTH_API_URL,
});

axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

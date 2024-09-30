import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { TOKEN_KEY } from "@/constants";

export const queryClient = new QueryClient();

const { FARM_APP_API_URL: APP_API_URL, FARM_AUTH_API_URL: AUTH_API_URL } =
  import.meta.env;

if (!APP_API_URL) {
  throw new Error("APP_API_URL is not defined");
}

if (!AUTH_API_URL) {
  throw new Error("AUTH_API_URL is not defined");
}

export const axiosApp = axios.create({
  baseURL: APP_API_URL,
});

axiosApp.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const axiosAuth = axios.create({
  baseURL: AUTH_API_URL,
});

axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

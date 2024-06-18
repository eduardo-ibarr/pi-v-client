import axios from "axios";
import { getAccessToken } from "../utils/auth";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

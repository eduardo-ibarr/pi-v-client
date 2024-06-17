import axios from "axios";
import { getAccessToken } from "../utils/auth";

export const client = axios.create({
  baseURL: "http://148.113.172.32:3333",
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

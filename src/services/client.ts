import axios from "axios";

export const client = axios.create({
  baseURL: "http://34.227.53.207:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

  return config;
});

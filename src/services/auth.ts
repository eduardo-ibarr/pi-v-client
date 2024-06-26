import { AxiosError } from "axios";
import { LoginData } from "../models/auth";
import { client } from "./client";

export class AuthServices {
  static async login(data: LoginData) {
    try {
      const response = await client.post("/auth/login", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async logout() {
    try {
      const response = await client.post("/auth/logout");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
}

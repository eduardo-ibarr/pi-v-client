import { AxiosError } from "axios";
import { LoginData } from "../models/auth";
import { client } from "./client";

export class AuthServices {
  static async login(data: LoginData) {
    try {
      const response = await client.post("/auth", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
}

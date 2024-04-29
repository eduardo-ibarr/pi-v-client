import { LoginData } from "../models/auth";
import { client } from "./client";

export class AuthServices {
  static async login(data: LoginData) {
    const response = await client.post("/auth/login", data);
    return response.data;
  }
}

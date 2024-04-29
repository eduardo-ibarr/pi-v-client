import {
  RegisterData,
  UpdateProfileData,
  UpdatePasswordData,
  ForgotPasswordData,
  ResetPasswordData,
} from "../models/users";
import { client } from "./client";

export class UsersServices {
  static async register(data: RegisterData) {
    const response = await client.post("/users", data);
    return response.data;
  }

  static async getProfile() {
    const response = await client.get("/users");
    return response.data;
  }

  static async updateProfile(data: UpdateProfileData) {
    const response = await client.put("/users", data);
    return response.data;
  }

  static async updatePassword(data: UpdatePasswordData) {
    const response = await client.put("/users/password", data);
    return response.data;
  }

  static async forgotPassword(data: ForgotPasswordData) {
    const response = await client.post("/users/forgot-password", data);
    return response.data;
  }

  static async resetPassword(data: ResetPasswordData) {
    const response = await client.post("/users/reset-password", data);
    return response.data;
  }
}

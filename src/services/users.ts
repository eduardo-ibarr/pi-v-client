import { AxiosError } from "axios";
import {
  RegisterData,
  UpdateProfileData,
  UpdatePasswordData,
  ForgotPasswordData,
  ResetPasswordData,
  User,
} from "../models/users";
import { client } from "./client";

export class UsersServices {
  async register(data: RegisterData) {
    try {
      const response = await client.post("/users", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async update(id: number, data: UpdateProfileData) {
    try {
      const response = await client.put(`/users/${id}`, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async getById(id: number) {
    try {
      const response = await client.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async list() {
    try {
      const response = await client.get("/users");
      return response.data as User[];
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async updateProfile(data: UpdateProfileData) {
    try {
      const response = await client.put("/users", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async updatePassword(data: UpdatePasswordData) {
    try {
      const response = await client.put("/users/password", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async forgotPassword(data: ForgotPasswordData) {
    try {
      const response = await client.post("/users/forgot-password", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async resetPassword(data: ResetPasswordData) {
    try {
      const response = await client.post("/users/reset-password", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async delete(id: number) {
    try {
      const response = await client.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
}

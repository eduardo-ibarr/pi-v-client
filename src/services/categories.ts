import { AxiosError } from "axios";
import { client } from "./client";
import {
  UpdateCategoryData,
  CreateCategoryData,
  Category,
} from "../models/categories";

export class CategoriesServices {
  static async create(data: CreateCategoryData) {
    try {
      const response = await client.post("/categories", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async list(): Promise<Category[] | undefined> {
    try {
      const response = await client.get("/categories");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async delete(id: string) {
    try {
      const response = await client.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async update({ id, ...data }: UpdateCategoryData) {
    try {
      const response = await client.put(`/categories/${id}`, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async show(id: string) {
    try {
      const response = await client.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async search(query: string) {
    try {
      const response = await client.get(`/categories/search?q=${query}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
}

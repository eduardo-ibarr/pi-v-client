import { AxiosError } from "axios";
import { client } from "./client";
import { CreateProductData, UpdateProductData } from "../models/products";

export class ProductsServices {
  static async create(data: CreateProductData) {
    try {
      const response = await client.post("/products", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async list() {
    try {
      const response = await client.get("/products");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async delete(id: string) {
    try {
      const response = await client.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async update({ id, ...data }: UpdateProductData) {
    try {
      const response = await client.put(`/products/${id}`, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async show(id: string) {
    try {
      const response = await client.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async search(query: string) {
    try {
      const response = await client.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
}

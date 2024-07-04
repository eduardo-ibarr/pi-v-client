import { AxiosError } from "axios";
import { client } from "./client";
import {
  CreateProductData,
  ProductsPaginated,
  QueryListProducts,
  UpdateProductData,
} from "../models/products";

export class ProductsServices {
  async create(data: CreateProductData) {
    try {
      const response = await client.post("/products", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async list(data: QueryListProducts): Promise<ProductsPaginated | undefined> {
    try {
      let url = `/products?page=${data.page}&limit=${data.limit}`;
      if (data.sort) {
        url += `&sort=${data.sort}`;
      }
      if (data.search) {
        url += `&search=${encodeURIComponent(data.search)}`;
      }
      const response = await client.get(url);

      const activeProducts = response.data.items.filter(
        (product: any) => product.is_active
      );

      response.data.items = activeProducts;

      return response.data as ProductsPaginated;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async delete(id: string) {
    try {
      const response = await client.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async update({ id, ...data }: UpdateProductData) {
    try {
      const response = await client.put(`/products/${id}`, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async show(id: string) {
    try {
      const response = await client.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  async search(query: string) {
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

import { AxiosError } from "axios";
import { client } from "./client";
import {
  CreateReservation,
  QueryListReservations,
  UpdateReservationData,
  ReservationsPaginated,
} from "../models/reservations";

export class ReservationsServices {
  static async create(data: CreateReservation) {
    try {
      const response = await client.post("/reservations", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async list(
    data: QueryListReservations
  ): Promise<ReservationsPaginated | undefined> {
    try {
      let url = `/reservations?page=${data.page}&limit=${data.limit}`;
      if (data.sort) {
        url += `&sort=${data.sort}`;
      }
      if (data.search) {
        url += `&search=${encodeURIComponent(data.search)}`;
      }
      const response = await client.get(url);
      return response.data as ReservationsPaginated;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async delete(id: string) {
    try {
      const response = await client.delete(`/reservations/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async update({ id, ...data }: UpdateReservationData) {
    try {
      const response = await client.put(`/reservations/${id}`, data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async show(id: string) {
    try {
      const response = await client.get(`/reservations/${id}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }

  static async search(query: string) {
    try {
      const response = await client.get(`/reservations/search?q=${query}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
    }
  }
}

import { AxiosError } from "axios";
import { client } from "./client";
import {
  CreateEventData,
  CreatePageViewData,
  CreateProductViewData,
  Event,
  PageView,
  ProductView,
} from "../models/trackings";

export class TrackingsService {
  async createEvent(event: CreateEventData): Promise<Event> {
    try {
      const response = await client.post("/trackings", event);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Erro ao criar evento.");
      }
    }
  }

  async createPageView(pageView: CreatePageViewData): Promise<PageView> {
    try {
      const response = await client.post("/trackings/page_views", pageView);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Erro ao criar visualização de página.");
      }
    }
  }

  async createProductView(
    productView: CreateProductViewData
  ): Promise<ProductView> {
    try {
      const response = await client.post(
        "/trackings/product_views",
        productView
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Erro ao criar visualização de produto.");
      }
    }
  }

  async getEventById(eventId: number): Promise<Event | null> {
    try {
      const response = await client.get(`/trackings/${eventId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 404) {
          return null;
        } else {
          throw new Error(error.response.data.message);
        }
      } else {
        throw new Error("Erro ao buscar evento.");
      }
    }
  }

  async getPageViewById(eventId: number): Promise<PageView | null> {
    try {
      const response = await client.get(`/trackings/page_views/${eventId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 404) {
          return null;
        } else {
          throw new Error(error.response.data.message);
        }
      } else {
        throw new Error("Erro ao buscar visualização de página.");
      }
    }
  }

  async getProductViewById(eventId: number): Promise<ProductView | null> {
    try {
      const response = await client.get(`/trackings/product_views/${eventId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 404) {
          return null;
        } else {
          throw new Error(error.response.data.message);
        }
      } else {
        throw new Error("Erro ao buscar visualização de produto.");
      }
    }
  }

  async listEvents(): Promise<Event[]> {
    try {
      const response = await client.get("/trackings");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Erro ao listar eventos.");
      }
    }
  }

  async listPageViews(): Promise<PageView[]> {
    try {
      const response = await client.get("/trackings/page_views");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Erro ao listar visualizações de página.");
      }
    }
  }

  async listProductViews(): Promise<ProductView[]> {
    try {
      const response = await client.get("/trackings/product_views");
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Erro ao listar visualizações de produto.");
      }
    }
  }
}

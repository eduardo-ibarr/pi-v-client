export interface Event {
  id: number;
  event_type: "page_view" | "product_view";
  timestamp: Date;
  user_id: number;
  ip: string;
}

export interface PageView extends Event {
  url: string;
}

export interface ProductView extends Event {
  product_name: string;
  product_id: number;
}

export interface CreateEventData {
  event_type: "page_view" | "product_view";
  user_id: number | null;
}

export interface CreateProductViewData extends CreateEventData {
  product_id: number;
}

export interface CreatePageViewData extends CreateEventData {
  url: string;
}

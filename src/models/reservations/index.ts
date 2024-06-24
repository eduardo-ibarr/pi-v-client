export interface Reservation {
  id: number;
  user_id: number;
  user_name: string;
  user_phone: string;
  total_amount: string;
  reservation_timestamp: string;
  reservation_items: ReservationItem[];
}

export interface ReservationItem {
  product_id: number;
  price: string;
  product_name: string;
  product_description: string;
  product_image_url: string;
}

export interface ReservationsPaginated {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  items: Reservation[];
}

export interface QueryListReservations {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export interface CreateReservation {
  user_id: number;
  total_amount: number;
  reservation_items: CreateReservationItem[];
}

export interface CreateReservationItem {
  product_id: number;
  price: number;
}

export interface UpdateReservationData {
  id: number;
  total_amount?: number;
  reservation_items?: CreateReservationItem[];
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  is_active: boolean;
}

export interface QueryListProducts {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_id: number;
}

export interface UpdateProductData {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  image_url?: string;
  category_id?: number;
}

export interface ProductsPaginated {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  items: Product[];
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category_name: string;
  status: string;
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
  category_id: string;
}

export interface UpdateProductData {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  status?: string;
  image_url?: string;
  category_id?: string;
}

export interface ProductsPaginated {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  items: Product[];
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  image_url: string | null;
  category_id: string;
  created_at: string;
  updated_at: string;
}


/// DTOs (Data Transfer Objects) para crear y actualizar productos, moldes para los datos que llegan del cliente
export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  image_url?: string;
  category_id: string;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image_url?: string;
  category_id?: string;
}
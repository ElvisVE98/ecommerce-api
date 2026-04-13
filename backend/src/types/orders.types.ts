export interface Order {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderDto {
  user_id: string;
}

export interface UpdateOrderDto {
  status?: string;
  total?: number;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export interface CreateOrderItemDto {
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}
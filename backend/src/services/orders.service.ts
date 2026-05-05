import { supabase } from '../config/supabase';
import { Order, CreateOrderDto, UpdateOrderDto, OrderItem, CreateOrderItemDto } from '../types/orders.types';

export const createOrder = async (order: CreateOrderDto): Promise<Order> => {
  console.log('datos recibidos:',order);
  const { data, error } = await supabase
    .from('orders')
    .insert({ 
      user_id:order.user_id,
      status:'pending',
      total:order.total })
    .select()
    .single();

  if (error) {
    console.log('Error en orders:',error)
    throw { statusCode: 400, message: error.message };
  }

  const OrderItems = order.items.map(item => ({
    order_id:data.id,
    product_id:item.product_id,
    quantity: item.quantity,
    unit_price:item.unit_price,
  }));

  const {error: itemsError} = await supabase
  .from('order_items')
  .insert(OrderItems);

  if(itemsError) {
    console.log('error en order_items:',itemsError);
   throw {statusCode: 400, message: itemsError.message}
  }

  return data as Order;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*');

  if (error) throw { statusCode: 500, message: error.message };
  return data as Order[];
};

export const getOrderById = async (id: string): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw { statusCode: 404, message: 'Order not found' };
  return data as Order;
};

export const updateOrder = async (id: string, order: UpdateOrderDto): Promise<Order> => {
  const { data, error } = await supabase
    .from('orders')
    .update(order)
    .eq('id', id)
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data as Order;
};

export const addOrderItem = async (item: CreateOrderItemDto): Promise<OrderItem> => {
  const { data, error } = await supabase
    .from('order_items')
    .insert(item)
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };

  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .select('total')
    .eq('id', item.order_id)
    .single();

  if (!orderError && orderData) {
    const newTotal = Number(orderData.total) + (item.unit_price * item.quantity);
    await supabase
      .from('orders')
      .update({ total: newTotal })
      .eq('id', item.order_id);
  }

  return data as OrderItem;
};

export const getOrderItems = async (order_id: string): Promise<OrderItem[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', order_id);

  if (error) throw { statusCode: 500, message: error.message };
  return data as OrderItem[];
};

export const removeOrderItem = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('order_items')
    .delete()
    .eq('id', id);

  if (error) throw { statusCode: 400, message: error.message };
};
import api from "./api";
import type { Order,CreateOrderDto } from "../types/order.type";



export const getOrders = async(): Promise<Order[]>=>{
    const response = await api.get('/orders');
    return response.data.data;
};


export const createOrder = async(data: CreateOrderDto):Promise <Order[]> =>{
    const response = await api.post('/orders',data);
    return response.data.data;
} ;
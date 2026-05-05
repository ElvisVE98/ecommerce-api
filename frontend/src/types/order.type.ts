
export interface Order {
    id:string;
    user_id:string;
    status:string;
    total:number;
    created_at:string;
}

export interface OrderItem {
    id:string;
    order_id:string;
    product_id : string;
    quantity:number;
    unit_price:number;
}

export interface CreateOrderDto {
    user_id : string;
    total: number;
    items: {
        product_id:string;
        quantity:number;
        unit_price:number;
    }[]
}
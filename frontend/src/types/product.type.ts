
export interface Product {

    id : string;
    name : string
    description : string;
    price : number;
    stock : number;
    image_url : string;
    category_id : string;
    created_At : string;
}

export interface Category{
    id:string;
    name:string;
}


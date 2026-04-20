import api from "./api";
import type{ Product,Category } from "../types/product.type";

export const getProducts = async(): Promise <Product[]> =>{
    const response =await api.get('/products');
    return response.data.data;// el doble data es por la estructura de la respuesta del backend y significa que queremos acceder a la propiedad data dentro de la respuesta del backend, que a su vez contiene otra propiedad data que es donde realmente están los productos.

};

export const getCategories = async() : Promise <Category []> =>{
    const response = await api.get('/categories');
    return response.data.data;
}
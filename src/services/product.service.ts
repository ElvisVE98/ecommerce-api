import { supabase } from '../config/supabase';
import { Product, CreateProductDto, UpdateProductDto } from '../types/product.types';

export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');

    console.log('Data retrieved from Supabase:', data); // Agrega este log para verificar los datos
    console.log('Error retrieved from Supabase:', error); // Agrega este log para verificar los errores

  if (error) throw { statusCode: 500, message: error.message };

  return data as Product[];
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw { statusCode: 404, message: 'Product not found' };

  return data as Product;
};

export const createProduct = async (product: CreateProductDto): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };

  return data as Product;
};

export const updateProduct = async (id: string, product: UpdateProductDto): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };

  return data as Product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw { statusCode: 400, message: error.message };
};
import {supabase} from '../config/supabase';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '../types/categories.types';



export const getAllCategories = async (): Promise<Category[]> =>{
    const {data,error} = await supabase
    .from('categories')
    .select('*');

    console.log('Data retrieved from Supabase:', data); // Agrega este log para verificar los datos
    console.log('Error retrieved from Supabase:', error); // Agrega este log para verificar los errores

    if(error) throw {statusCode: 500, message: error.message};
    return data as Category[];
};



export const getCategoryById = async (id: string): Promise<Category> =>{
    const {data,error} = await supabase
    .from('categories')
    .select('*')
    .eq('id',id)
    .single();

    if(error) throw {statusCode: 404, message: 'Category not found'};
    return data as Category;
};



export const createCategory = async (category:CreateCategoryDto): Promise<Category> =>{
    const {data,error} = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();

    if(error) throw{statusCode: 400, message: error.message};
    return data as Category;
};


export const updateCategory = async(id:string,category:UpdateCategoryDto): Promise<Category>=>{
    const{data,error} = await supabase
    .from('categories')
    .update(category)
    .eq('id',id)
    .select()
    .single();

    if(error) throw{statusCode: 400, message: error.message};
    return data as Category;
}


export const deleteCategory = async(id:string): Promise<void> =>{
    const {error} = await supabase
    .from('categories')
    .delete()
    .eq('id',id);

    if(error) throw{  statusCode: 400, message: error.message};
};

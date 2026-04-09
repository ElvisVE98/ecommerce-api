import { Request,Response,NextFunction} from "express";
import * as categoryService from '../services/categories.service';



export const getAllCategories =async(
    req : Request,
    res : Response,
    next : NextFunction
): Promise<void> =>{
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({success:true, data:categories});
    }catch (error){
        next(error);
    }
};



export const getCategoryById = async(
    req : Request,
    res : Response,
    next : NextFunction
): Promise<void> =>{
    try{
        const {id} = req.params; //esto hace que el id sea un string, si no se proporciona, se lanzará un error
        if (!id){
            res.status(400).json({success:false, message:'ID is required'});
            return;
        }
        const category = await categoryService.getCategoryById(id);
        res.status(200).json({success:true, data:category});
    }catch (error) {
        next(error);
    }
};

export const createCategory = async (
    req : Request,
    res : Response,
    next : NextFunction
): Promise <void> => {
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json({success:true, data:category});
    }catch (error) {
        next(error);

    }
}


export const updateCategory = async (
    req : Request,
    res : Response,
    next : NextFunction 
): Promise<void> => {
    try{
        const {id} = req.params;
        if(!id){
            res.status(400).json({success:false, message:'ID is required'});
            return;
        }
        const category = await categoryService.updateCategory(id,req.body);
        res.status(200).json({success:true, data:category});
    }catch(error){
        next(error);
    }
};


export const deleteCategory = async(
    req : Request,
    res: Response,
    next : NextFunction    
): Promise<void>=>{
    try{
        const {id} = req.params;
        if(!id){
            res.status(400).json({success:false, message:'ID is required'});
            return;
        }
    await categoryService.deleteCategory(id);
    res.status(200).json({success:true, message:'Category deleted successfully'});
} catch(error ) {
    next(error);
}
};
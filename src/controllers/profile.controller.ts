import { Request,Response,NextFunction } from "express";
import * as profileService from '../services/profile.service';




export const getProfileById = async(
    req : Request,
    res:Response,
    next : NextFunction
): Promise <void> =>{
    try {
        const{id} = req.params;
        if(!id){
            res.status(400).json({success:false, message:'ID is required'});
            return;
        }
        const profile = await profileService.getProfileById(id);
        res.status(200).json({success:true, data:profile});
    }catch (error) {
        next(error);
    }
}



export const createProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, full_name } = req.body;
    const profile = await profileService.createProfile(id, full_name);
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};



export const updateProfile = async(
    req:Request,
    res:Response,
    next:NextFunction
):Promise<void> =>{
    try{
        const {id} = req.params;
        if(!id){
            res.status(400).json({success:false, message:'ID is required'});
            return;
        }   
        const profile = await profileService.updateProfile(id, req.body);
        res.status(200).json({success:true, data:profile});
    }catch(error){
        next(error);
    }
};
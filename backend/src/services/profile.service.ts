import {supabase} from '../config/supabase'
import { Profile, UpdateProfileDto } from '../types/profile.types';





export const getProfileById = async (id: string): Promise <Profile> =>{
    const {data,error} = await supabase
    .from('profile')
    .select('*')
    .eq('id',id)
    .single();

    if(error) throw {statusCode: 404, message: 'Profile not found'};
    return data as Profile;
}




export const createProfile = async (id: string, full_name: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from('profile')
    .insert({ id, full_name })
    .select()
    .single();

  if (error) throw { statusCode: 400, message: error.message };
  return data as Profile;
};




export const updateProfile = async (id:string, profile: UpdateProfileDto): Promise<Profile> =>{
    const {data,error} = await supabase
    .from('profile')
    .update(profile)
    .eq('id',id)
    .select()
    .single();
    

    if(error) throw {statusCode: 400, message: 'Profile not found'};
    return data as Profile;
}
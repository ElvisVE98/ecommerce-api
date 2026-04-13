import {supabase} from '../config/supabase';
import { RegisterDto,LoginDto }  from '../types/auth.types';


export const register = async (data : RegisterDto) =>{
    const {data:authData,error} = await supabase.auth.signUp({
        email: data.email,
        password:data.password,
         options:{
             data:{
                 full_name:data.full_name
             }
         }
    });

console.log('Error:', JSON.stringify(error, null, 2));


    if (error) throw {statusCode: 400, message: error.message};
    return authData;
};




export const login = async(data:LoginDto) =>{
    const {data:authData,error} = await supabase.auth.signInWithPassword({
        email: data.email,
        password:data.password
    });
    if (error) throw {statusCode: 401, message: error.message};
    return authData;
}





export const logout = async () =>{
    const {error} = await supabase.auth.signOut();
    if (error) throw {statusCode: 400, message: error.message};
    return;
}





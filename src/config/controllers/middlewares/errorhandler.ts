import  {Request,Response,NextFunction} from 'express';


export interface AppError extends Error {
    statusCode?:number;
}

export const errorHandler = (

    err:AppError,
    req:Request,
    res:Response,
    next:NextFunction
): void => {
    const statusCode = err.statusCode ?? 500;//Si el error tiene un statusCode, úsalo, de lo contrario, usa 500 (Internal Server Error)
    const message = err.message ?? 'internal server error' 
   
    console.error(`[Error] ${statusCode} - ${message}`); //Imprime el error en la consola para facilitar la depuración

    res.status(statusCode).json({
        success: false,
        message,
    });
};
import {z} from 'zod';

// uso de zod : zod sirve basicamente para validar los datos que se reciben en las peticiones, es una libreria de validacion de datos, es muy facil de usar y tiene una sintaxis muy sencilla, ademas de ser muy rapida, es una libreria muy popular en el mundo de nodejs y typescript

export const createCategorySchema = z.object({
    name : z.string()
    .min(3,'el nombre debe tener al menos 3 caracteres')
    .max(50,'el nombre no puede tener mas de 50 caracteres'),
});

export const updateCategorySchema = z.object({
    name : z.string()
    .min(3,'el nombre debe tener al menos 3 caracteres')
    .max(50,'el nombre no puede tener mas de 50 caracteres')
    .optional(), // se coloca optional para que no sea obligatorio actualizar el nombre de la categoria, es decir, se puede actualizar solo el nombre o no actualizar nada
});

//esta es la estructura que siempre se usa en zod para validar los datos, se crea un objeto con z.object() y dentro de ese objeto se definen las propiedades que se quieren validar, en este caso se quiere validar el nombre de la categoria, se le dice que debe ser una cadena de texto con z.string() y luego se le agregan las validaciones de longitud con .min() y .max(), ademas se le agrega un mensaje de error personalizado para cada validacion.
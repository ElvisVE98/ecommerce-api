import { z } from 'zod';

export const registerSchema = z.object({
    email : z.string()
    .email('debe ser un email valido'),

    password: z.string()
    .min(8,'la contraseña debe tener al menos 8 caracteres'),

    full_name : z.string()
    .min(2,'el nombre debe tener al menos 2 caracteres')
  
});

export const loginSchema = z.object({
    email:z.string()
    .email('debe ser un email valido'),

    password: z.string()
    .min(1,'la contraseña es requerida')
    })

import { z } from 'zod';

export const updateProfileSchema = z.object({
    full_name: z.string()
        .min(2, 'el nombre debe tener al menos 2 caracteres')
        .max(100, 'el nombre no puede tener mas de 100 caracteres')
        .optional(),

    adress: z.string()
        .min(5, 'la dirección debe tener al menos 5 caracteres')
        .max(255, 'la dirección no puede tener mas de 255 caracteres')
        .optional(),
});

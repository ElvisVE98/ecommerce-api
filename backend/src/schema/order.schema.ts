import {z} from 'zod';



export const createOrderSchema = z.object({
  user_id: z.string()
    .uuid('el id del usuario debe ser un uuid valido'),
  total: z.number()
    .positive('el total debe ser un número positivo'),
  items: z.array(z.object({
    product_id: z.string().uuid('el id del producto debe ser un uuid valido'),
    quantity: z.number().int().positive('la cantidad debe ser mayor a 0'),
    unit_price: z.number().positive('el precio debe ser mayor a 0'),
  })).min(1, 'debe haber al menos un producto'),
});

export const updateOrderSchema = z.object({
    status: z.string()
    .min(3, 'el estado debe tener al menos 3 caracteres')
    .max(20, 'el estado no puede tener mas de 20 caracteres')
    .optional(), // se coloca optional para que no sea obligatorio actualizar el estado del pedido, es decir, se puede actualizar solo el estado o no actualizar nada
});

export const createOrderItemSchema = z.object({
    order_id : z.string()
    .uuid('el id del pedido debe ser un uuid valido'),

    product_id : z.string()
    .uuid('el id del producto debe ser un uuid valido'),

    quantity : z.number()
    .int('la cantidad debe ser un numero entero')
    .positive('la cantidad debe ser un numero positivo'),

    unit_price : z.number()
    .positive('el precio unitario debe ser un numero positivo'),
})
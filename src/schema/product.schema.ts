import {z} from 'zod';


export const createProductSchema = z.object({
    name : z.string()
    .min (3,"el nombre del producto debe tener al menos 3 caracteres")
    .max(50,"el nombre del producto no puede tener mas de 50 caracteres"),

    description : z.string()
    .min(10,"la descripcion del producto debe tener al menos 10 caracteres")
    .max(500,"la descripcion del producto no puede tener mas de 500 caracteres")
    .optional(), // se coloca optional para que no sea obligatorio agregar una descripcion al producto, es decir, se puede crear un producto sin descripcion o con descripcion

    price: z.number()
    .positive("el precio del producto debe ser un numero positivo"),

    stock: z.number()
    .int("el stock del producto debe ser un numero entero")
    .nonnegative("el stock del producto no puede ser un numero negativo"),

    image_url : z.string()
    .url("la url de la imagen del producto debe ser una url valida")
    .optional(), // se coloca optional para que no sea obligatorio agregar una imagen al producto, es decir, se puede crear un producto sin imagen o con imagen

    category_id: z.string()
    .uuid("el id de la categoria del producto debe ser un uuid valido")

})

// el Id nunca se agrega ya que el id se genera automaticamente en la Base de datos, por lo tanto no es necesario validarlo en el schema de zod, ademas el id no se recibe en las peticiones de creacion o actualizacion de productos, ya que el id se genera automaticamente en la Base de datos, por lo tanto no es necesario validarlo en el schema de zod.
// el created_at y update_At tampoco se agregan ya que estos campos se generan automaticamente en la Base de datos, por lo tanto no es necesario validarlos en el schema de zod, ademas estos campos no se reciben en las peticiones de creacion o actualizacion de productos, ya que estos campos se generan automaticamente en la Base de datos, por lo tanto no es necesario validarlos en el schema de zod.
// en el schema solo van los campos que el cliente envia, todo lo que genera la BD no se agrega

export const updateProductSchema = z.object({
    name : z.string()
    .min (3,"el nombre del producto debe tener al menos 3 caracteres")
    .max(50,"el nombre del producto no puede tener mas de 50 caracteres")
    .optional(),

    description : z.string()
    .min(10,"la descripcion del producto debe tener al menos 10 caracteres")
    .max(500,"la descripcion del producto no puede tener mas de 500 caracteres")
    .optional(), // se coloca optional para que no sea obligatorio agregar una descripcion al producto, es decir, se puede crear un producto sin descripcion o con descripcion

    price: z.number()
    .positive("el precio del producto debe ser un numero positivo")
    .optional(),

    stock: z.number()
    .int("el stock del producto debe ser un numero entero")
    .nonnegative("el stock del producto no puede ser un numero negativo")
    .optional(),

    image_url : z.string()
    .url("la url de la imagen del producto debe ser una url valida")
    .optional(), // se coloca optional para que no sea obligatorio agregar una imagen al producto, es decir, se puede crear un producto sin imagen o con imagen

    category_id: z.string()
    .uuid("el id de la categoria del producto debe ser un uuid valido")
    .optional(),

})

import { createClient } from "@supabase/supabase-js"; //funcion de SDK de supabase para crear un cliente que se conecta a la base de datos de supabase, esta funcion recibe dos argumentos: la url de supabase y la clave anonima de supabase, ambos valores se obtienen del archivo env.ts que a su vez los obtiene del archivo .env
import { env } from "./env";


//en caso de error, verificar que las variables lleguen bien, para eso se pueden agregar unos console.log para verificar que las variables de entorno se estén leyendo correctamente, si las variables no llegan bien, el cliente de supabase no podrá conectarse a la base de datos y se generarán errores al intentar realizar operaciones con la base de datos. Por lo tanto, es importante asegurarse de que las variables de entorno estén configuradas correctamente y se estén leyendo correctamente en el código.
console.log('SUPABASE_URL:', env.supabaseUrl);
console.log('SUPABASE_KEY:', env.supabaseAnonKey);


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //esto es para evitar el error de certificado autofirmado, esto no es recomendable para producción, pero para desarrollo puede ser útil, esto hace que el cliente de supabase acepte certificados autofirmados, lo cual puede ser útil si estás utilizando un entorno de desarrollo local o si estás utilizando un proxy que utiliza un certificado autofirmado. Sin embargo, ten en cuenta que esto puede representar un riesgo de seguridad si se utiliza en un entorno de producción, ya que permite conexiones inseguras. Por lo tanto, es importante asegurarse de que esta configuración solo se utilice en entornos de desarrollo y no en producción.    

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);

// supabase.from('categories').select('*').then(({ data, error }) => {
//   console.log('Test conexión data:', data);
//   console.log('Test conexión error:', error);
// });
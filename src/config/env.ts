import dotenv from 'dotenv';


dotenv.config();

export const env = {
port : process.env.PORT ?? '3000', //El ?? es el operador "nullish coalescing" — significa "si esto es undefined o null, usa el valor de la derecha como respaldo
supabaseUrl : process.env.SUPABASE_URL ?? '',
supabaseAnonKey : process.env.SUPABASE_ANON_KEY ?? '',
} as const; //El "as const" es una aserción de tipo que le dice a TypeScript que trate el objeto env como un objeto de solo lectura, lo que significa que las propiedades no pueden ser reasignadas. Esto ayuda a garantizar la seguridad de los tipos y evita errores accidentales al modificar las variables de entorno en tiempo de ejecución.


import { createClient } from "@supabase/supabase-js"; //funcion de SDK de supabase para crear un cliente que se conecta a la base de datos de supabase, esta funcion recibe dos argumentos: la url de supabase y la clave anonima de supabase, ambos valores se obtienen del archivo env.ts que a su vez los obtiene del archivo .env
import { env } from "./env";

export const supabase = createClient(env.supabaseUrl, env.supabaseAnonKey);
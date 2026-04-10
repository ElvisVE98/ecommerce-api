export interface Profile {
    id :string;
    full_name : string;
    adress: string | null;
    created_at: string;
}


//DTOs (DATA TRANSFER OBJECTS)
// LOS DTOS SON LOS QUE ENVIA EL CLIENTE EN RESUMEN.

// no se crea el " CreateProfileDto " porque no se necesita crear un perfil, el perfil se crea automáticamente al crear un usuario, por lo que solo se necesita el " UpdateProfileDto " para actualizar los datos del perfil

export interface UpdateProfileDto {
    full_name?: string 
    adress?: string 
}
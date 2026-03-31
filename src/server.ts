import app from './app';
import {env} from './config/env';

const PORT = Number(env.port);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

// este codigo es basicamente para iniciar el servidor, se importa la aplicacion creada en app.ts y se le indica que escuche en un puerto especifico, en este caso el puerto se obtiene de las variables de entorno, y se imprime un mensaje en la consola indicando que el servidor está corriendo y en qué puerto está escuchando.

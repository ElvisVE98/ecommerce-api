import express from 'express';
import { errorHandler } from './config/controllers/middlewares/errorhandler';


const app = express(); // aqui crea la aplicacion, es el servidor en si, es el objeto que se encarga de manejar las rutas, los middlewares, las peticiones y las respuestas, es el core de la aplicacion, es el que se encarga de recibir las peticiones y devolver las respuestas, es el que se encarga de manejar todo lo relacionado con el servidor, es el que se encarga de escuchar en un puerto y responder a las peticiones que llegan a ese puerto

app.use(express.json()); //esto sirve para que el servidor pueda entender las peticiones con cuerpo en formato JSON, es decir, para parsear el cuerpo de las peticiones entrantes como JSON y ponerlo a disposición en req.body

app.get('/health', (req, res) => { //health es la URL que se utiliza para verificar si el servidor está funcionando correctamente, es una ruta de prueba que devuelve un mensaje de éxito si el servidor está corriendo, es comúnmente utilizada por herramientas de monitoreo para verificar la salud del servidor
    res.json({success: true,message: ' server is running'});
});

app.use(errorHandler); //esto es un middleware de manejo de errores, se encarga de capturar cualquier error que ocurra en las rutas y devolver una respuesta con el mensaje de error y el status code correspondiente

export default app;


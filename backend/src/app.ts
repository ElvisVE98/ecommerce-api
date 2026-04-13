import express from 'express';
import { errorHandler } from './middlewares/errorhandler';
import productRoutes from './routes/products.routes';
import categoryRoutes from './routes/categories.routes';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import orderRoutes from './routes/orders.routes';
import cors from 'cors'


const app = express(); // aqui crea la aplicacion, es el servidor en si, es el objeto que se encarga de manejar las rutas, los middlewares, las peticiones y las respuestas, es el core de la aplicacion, es el que se encarga de recibir las peticiones y devolver las respuestas, es el que se encarga de manejar todo lo relacionado con el servidor, es el que se encarga de escuchar en un puerto y responder a las peticiones que llegan a ese puerto

app.use(express.json()); //esto sirve para que el servidor pueda entender las peticiones con cuerpo en formato JSON, es decir, para parsear el cuerpo de las peticiones entrantes como JSON y ponerlo a disposición en req.body

app.use(cors({
    origin: 'http://localhost:5173', // esto es para permitir que el frontend pueda hacer peticiones al backend, es decir, para permitir que el frontend pueda acceder a los recursos del backend, en este caso, el frontend está corriendo en localhost:5173, por lo que se permite el acceso desde esa URL, si el frontend estuviera corriendo en otra URL, se tendría que cambiar esta configuración para permitir el acceso desde esa URL
    credentials: true, // esto es para permitir que el frontend pueda enviar cookies al backend, es decir, para permitir que el frontend pueda enviar el token de autenticación al backend, esto es necesario para que el backend pueda identificar al usuario que está haciendo la petición y darle acceso a los recursos protegidos, si no se permite el envío de cookies, el backend no podrá identificar al usuario y no podrá darle acceso a los recursos protegidos
}));

app.get('/health', (req, res) => { //health es la URL que se utiliza para verificar si el servidor está funcionando correctamente, es una ruta de prueba que devuelve un mensaje de éxito si el servidor está corriendo, es comúnmente utilizada por herramientas de monitoreo para verificar la salud del servidor
    res.json({success: true,message: ' server is running'});
});



// aqui estan las rutas de la aplicacion, cada una de ellas se encarga de manejar las peticiones relacionadas con un recurso en particular, por ejemplo, productRoutes se encarga de manejar las peticiones relacionadas con los productos, categoryRoutes se encarga de manejar las peticiones relacionadas con las categorias, authRoutes se encarga de manejar las peticiones relacionadas con la autenticacion, cada una de estas rutas tiene sus propias rutas internas que se encargan de manejar las peticiones específicas para cada recurso, por ejemplo, en productRoutes puede haber una ruta GET / que devuelve todos los productos, una ruta GET /:id que devuelve un producto por su id, una ruta POST / que crea un nuevo producto, una ruta PUT /:id que actualiza un producto por su id, y una ruta DELETE /:id que elimina un producto por su id

app.use('/api/products', productRoutes); // al colocar api decimos que es un endpoint de la API, es decir, que es una ruta que se utiliza para acceder a los recursos de la API, en este caso, los productos, esto hace que todas las rutas definidas en productRoutes estén bajo el prefijo /api/products, por ejemplo, si en productRoutes hay una ruta GET /, esta ruta estará disponible en /api/products/, si hay una ruta GET /:id, esta ruta estará disponible en /api/products/:id, y así sucesivamente
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler); //esto es un middleware de manejo de errores, se encarga de capturar cualquier error que ocurra en las rutas y devolver una respuesta con el mensaje de error y el status code correspondiente

export default app;


import {useState } from "react"; // el usestate sirve para manejar el estado de los inputs, guardar el valor que el usuario ingresa en los campos de email y contraseña, y actualizar ese valor a medida que el usuario escribe.
import {login} from '../services/auth.service'; // importamos la función de login desde el servicio de autenticación para poder usarla en el componente de inicio de sesión.
import { useNavigate } from "react-router-dom";

const LoginPage = () =>{
    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const navigate = useNavigate(); // el useNavigate es un hook que nos permite programáticamente navegar a diferentes rutas dentro de nuestra aplicación. En este caso, lo usaremos para redirigir al usuario al catálogo de productos después de un inicio de sesión exitoso.
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        //console.log('Email:', email, 'Password:', password);

        try{
            console.log('llamando a la API');
            const Response = await login({email,password});
            console.log('respuesta de la API:',Response);

            //guardar el token y usuario en el localStorage
            localStorage.setItem('token',Response.data.session.access_token);
            localStorage.setItem('user',JSON.stringify(Response.data.user));

            //ir al catalogo de productos

        navigate('/catalog');    
        }catch(error){
            console.error('Error al iniciar sesión:', error);
        }
    };

    return(
        //console.log('email:',email,'password:',password), // esto es para verificar que los valores de email y password se están actualizando correctamente a medida que el usuario escribe en los campos de entrada.
        
        <div>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // la "e" es el evento que se dispara cuando el usuario escribe en el campo de entrada. El valor del campo de entrada se actualiza con el valor actual del input cada vez que el usuario escribe algo nuevo.
             />

            <input
             type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
             />

            <button>Iniciar Sesión</button>
        </form>
     </div>
    );
};

export default LoginPage;
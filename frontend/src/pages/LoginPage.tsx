import {useState } from "react"; // el usestate sirve para manejar el estado de los inputs, guardar el valor que el usuario ingresa en los campos de email y contraseña, y actualizar ese valor a medida que el usuario escribe.
import {login} from '../services/auth.service'; // importamos la función de login desde el servicio de autenticación para poder usarla en el componente de inicio de sesión.
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);


    const navigate = useNavigate(); // el useNavigate es un hook que nos permite programáticamente navegar a diferentes rutas dentro de nuestra aplicación. En este caso, lo usaremos para redirigir al usuario al catálogo de productos después de un inicio de sesión exitoso.


    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        //console.log('Email:', email, 'Password:', password);

        try{
            //console.log('llamando a la API');
            const Response = await login({email,password});
            //console.log('respuesta de la API:',Response);

            //guardar el token y usuario en el localStorage
            localStorage.setItem('token',Response.data.session.access_token);
            localStorage.setItem('user',JSON.stringify(Response.data.user));

            //ir al catalogo de productos
        navigate('/catalog');    
        }catch(error:any){
            setError('Correo o contraseña incorrecta')
            console.error('Error al iniciar sesión:', error);
        }finally{
            setLoading(false);
        }
    };
    return(
        //console.log('email:',email,'password:',password), // esto es para verificar que los valores de email y password se están actualizando correctamente a medida que el usuario escribe en los campos de entrada.
        
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex overflow-hidden">


                 {/* Panel izquierdo */}
                <div className="w-1/2 bg-slate-900 p-10 flex items-end min-h-80">
                    <div>
                        <h2 className="text-white text-3xl font-bold mb-2">Mercado Local</h2>
                        <p className="text-slate-300 text-sm">Curaduria experta para un estilo de vida consciente.</p>                
                    </div>
                </div>


                <div className="w-1/2 p-10">
                <h1 className=" text-2xl font-bold text-slate-800 mb-1">
                    Bienvenido de Nuevo</h1>
                    <p className="text-slate-500 text-sm mb-8">
                    Accede a tu cuenta de Mercado local</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Correo Electrónico</label>                   
                    <input 
                    type="email" 
                    placeholder="Nombre@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // la "e" es el evento que se dispara cuando el usuario escribe en el campo de entrada. El valor del campo de entrada se actualiza con el valor actual del input cada vez que el usuario escribe algo nuevo.
                    className="border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    />
                    </div>


                    <div className=" flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Contraseña</label>
                    <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    />
                    </div>

                    
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    
                    <button type="submit" disabled={loading} className="bg-slate-700 text-white rounded-lg py-3 font-semibold hover:bg-slate-800 transition disabled:opacity-50">
                        {loading ? ' Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                        </form>
                        <p className="text-center text-sm text-slate-500 mt-2">¿Aun no tienes Cuenta? {''}
                            <Link to= "/register" className="text-blue-600 font-semibold hover:underline">Crear Cuenta</Link>
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default LoginPage;
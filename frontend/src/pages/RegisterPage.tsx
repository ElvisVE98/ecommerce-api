import { useState } from "react";
import { register } from '../services/auth.service';
import { useNavigate,Link } from "react-router-dom";




const RegisterPage = () =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [full_name,setFullname] = useState('');
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    

    try{
        await register({email,password,full_name});

        navigate('/login');
    }catch(error:any){
        setError("Error al crear la cuenta. Intenta con otro email.")
    }finally{
        setLoading(false);
    }
    
};

    return(

    

    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl flex overflow-hidden">



        




        <div className="w-1/2 p-10"> 
        <h1 className=" text-2xl font-bold text-slate-800 mb-1">Crear Cuenta</h1>
        <p className="text-slate-500 text-sm mb-8">Completa tus datos para comenzar tu experiencia</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className=" flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Nombre Completo</label>
        <input type="text"
        placeholder="Juan Pérez"
        value={full_name}
        onChange={(e)=>setFullname(e.target.value)}
        className="border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
         />
        </div>



        <div className=" flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Correo Electrónico</label>
        <input type="email"
        placeholder="Nombre@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
        </div>


        <div className=" flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Contraseña</label>
        <input type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
        </div>




       {error && <p className="text-red-500 text-sm">{error}</p>}

       <button type="submit" disabled={loading} className="bg-slate-700 text-white rounded-lg py-3 font-semibold hover:bg-slate-800 transition disabled:opacity-50">{loading ? 'Creando cuenta' : 'Crear cuenta'}  </button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-2">¿Ya tienes una cuenta?
        <Link to={'/login'}className="text-blue-600 font-semibold hover:underline">Iniciar Sesión</Link>   
        </p>
         </div>

        {/* Panel derecho */}
    <div className="w-1/2 bg-slate-900 p-10 flex items-end min-h-80">
        <div>
        <h2 className="text-white text-3xl font-bold mb-2">únete a la nueva era del comercio Local</h2>
        <p className="text-slate-300 text-sm">Descubre productos seleccionados por expertos y apoya el talento local en una plataforma diseñada para la inspiración</p>
        </div>
    </div>

    </div>
</div>
    

    );
};

export default RegisterPage;
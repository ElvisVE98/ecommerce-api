import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { logout } from '../services/auth.service';





const Navbar = () =>{

    const navigate = useNavigate();
    const [user,setUser] = useState<{email : string} | null>(null);

    //useeffect sirve en siples palabras para ejecutar código después de que el componente se haya renderizado. En este caso, lo usamos para verificar si hay un usuario autenticado almacenado en el localStorage cada vez que el componente Navbar se monta o cuando cambia el estado del usuario. Si encontramos un usuario, actualizamos el estado del usuario con esa información.
    useEffect(()=>{
        const savedUser = localStorage.getItem('user');
        if(savedUser){
            setUser(JSON.parse(savedUser));
        }
    },[]);

    const handleLogout = ()=>{
        logout(); // llamamos a la función de logout para cerrar la sesión del usuario en el backend.
        setUser(null); // actualizamos el estado del usuario a null para reflejar que no hay un usuario autenticado.
        navigate('/login');
    };

    return (
    <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <Link to="/catalog" className="text-xl font-bold text-slate-800 tracking-tight hover:text-blue-600 transition">Mercado Local</Link>

        <div className="flex items-center gap-9">
            <Link to="/catalog" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Catálogo </Link>
            <Link to="/orders" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Mis Pedidos </Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Sobre Nosotros </Link>
        </div>

        <div className="flex items-center gap-4"> 
            {user ?(
                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-600 font-medium">{user.email.split('@')[0]}</span>
                    <Link to="/cart" className="relative text-slate-600 hover:text-slate-900 transition">🛍️
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
                    </Link>
                    <button onClick={handleLogout} className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition ">Cerrar sesión</button>
                </div>
            ):(
                <Link to="/login" className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition">Iniciar sesión</Link>
            )}

            
        </div>

    </nav>
    );
}

export default Navbar;
// la logica con el operador ternario es basicamente hay usuarios? si - muestra email y loguot, no - muestra link de login
// condicion ? si es verdadero muestra esto" " : " si es falso muestra esto"""
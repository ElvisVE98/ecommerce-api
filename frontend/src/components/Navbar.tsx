import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { logout } from '../services/auth.service';
import { useCart } from "../hooks/UseCart";





const Navbar = () =>{

    const navigate = useNavigate();
    const [user,setUser] = useState<{email : string} | null>(null);
    const [menuAbierto,setMenuAbierto] = useState(false);

    const {totalItems} = useCart();
    

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
        <>
    <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <Link to="/catalog" className="text-xl font-bold text-slate-800 tracking-tight hover:text-blue-700 transition">Mercado Local</Link>

        <Link to="/cart" className="relative text-slate-600 hover:text-slate-900 transition md:hidden">🛍️
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{totalItems}</span>
        </Link>

        

        {/* Botón hamburguesa — solo en móvil */}
        <button
        onClick={()=> setMenuAbierto(!menuAbierto)}
        className="md:hidden text-slate-800 text-2xl">
            {menuAbierto ? 'X':'☰'}
        </button>

        {/* Links — ocultos en móvil */}
        <div className="hidden md:flex items-center gap-9">
            <Link to="/catalog" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Catálogo </Link>
            <Link to="/orders" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Mis Pedidos </Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">Sobre Nosotros </Link>
        </div>

        {/* Usuario — oculto en móvil */}
        <div className="flex items-center gap-4"> 
            {user ?(
                <div className="hidden md:flex items-center gap-4">
                    <span className="text-sm text-slate-600 font-medium">{user.email.split('@')[0]}</span>
                    <Link to="/cart" className="relative text-slate-600 hover:text-slate-900 transition">🛍️
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{totalItems}</span>
                    </Link>
                    <button onClick={handleLogout} className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition ">Cerrar sesión</button>
                </div>
            ):(
                <Link to="/login" className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition">Iniciar sesión</Link>
            )}            
        </div>
    </nav>


    {/* Menú móvil — aparece cuando menuAbierto es true */}
    {menuAbierto &&(
        <div className="md:hidden bg-white border-b border-gray-100 px-8 py-4 flex flex-col gap-4 shadow-sm">
            <Link to="/catalog" onClick={()=> setMenuAbierto(false)} className="text-sm font-medium text-slate-600">Catalogo</Link>
            <Link to="/orders" onClick={()=> setMenuAbierto(false)} className="text-sm font-medium text-slate-600">Mis Pedidos</Link>
            <Link to="/about" onClick={()=> setMenuAbierto(false)} className="text-sm font-medium text-slate-600">Sobre Nosotros</Link>
            {user &&(
                <button onClick={handleLogout} className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg text-left">Cerrar Sesión</button>
            )}
        </div>
    )}
    </>
    );
}

export default Navbar;
// la logica con el operador ternario es basicamente hay usuarios? si - muestra email y loguot, no - muestra link de login
// condicion ? si es verdadero muestra esto" " : " si es falso muestra esto"""

// <> </> Fragmento de React — agrupa múltiples elementos sin agregar divs extras al HTML
// Se usa cuando el return necesita devolver más de un elemento raíz
// Ejemplo: nav + menú móvil juntos sin un div padre innecesario
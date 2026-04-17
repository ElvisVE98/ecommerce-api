import { FaGithub,FaLinkedin,FaGlobeAmericas } from "react-icons/fa"
import { Link } from "react-router-dom";




const Footer = () =>{

    return (
        
        <footer className="bg-slate-900 text-white mt-auto">
         <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-3 gap-8">


            <div>
                <h3 className="text-lg font-bold mb-3">Mercado Local</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Plataforma de E-commerce para Pymes y comercios Locales</p>
             </div>


             <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Navegación</h4>
                <ul className="flex flex-col gap-2">
                    <li><Link to="/catalog" className="text-slate-300 text-sm hover:text-white transition">Catálogo</Link></li>
                    <li><Link to="/about" className="text-slate-300 text-sm hover:text-white transition">Sobre Nosotros</Link></li>
                    <li><Link to="/contact" className="text-slate-300 text-sm hover:text-white transition">Contacto</Link></li>
                </ul>
             </div>



             <div>

                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-4">Desarrollado por</h4>
                <p className="text-slate-300 text-sm mb-4">Elvis Velásquez</p>
                <div className="flex gap-4">
                <a href="https://github.com/ElvisVE98" target="blank" className="text-slate-400 hover:text-white transition"><FaGithub size={25} /></a>
                <a href="https://www.linkedin.com/in/elvis-velasquez-28b9a3251/" target="blank" className="text-slate-400 hover:text-white transition"><FaLinkedin size={25}  /></a>
                <a href="https://portafoliodevweb.netlify.app/" target="blank" className="text-slate-400 hover:text-white transition"><FaGlobeAmericas size={25}  /></a>
                </div>
             </div>
        </div>



        <div className="border-t border-slate-800 px-8 py-4">
            <p className="text-center text-slate-500 text-xs">© 2026 Mercado Local — Todos los derechos reservados</p>
        </div>
        </footer>        
    );
};

export default Footer;
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/FooterPage';
import { 
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiVite,
  SiExpress,
 } from "react-icons/si";
 import { FaNodeJs } from "react-icons/fa";
 import { FaCheck } from "react-icons/fa";
 import { FaArrowRight } from "react-icons/fa";


const AboutPage = () => {

  {/*aqui se estaran agregando las animaciones con GSAP*/}
  const subtituloRef = useRef(null); {/*Referencia para el subtitulo (p), para animarlo con GSAP */}
  const tituloRef = useRef(null); {/*Referencia para el titulo (h1), para animarlo con GSAP */}
  const descripcionRef = useRef(null); {/*Referencia para la descripcion (p), para animarla con GSAP */}
  const botonRef = useRef(null); {/*Referencia para el boton (Link), para animarlo con GSAP */}

  {/*Referencias para los contadores*/ }
  const contador1Ref = useRef<HTMLSpanElement>(null);
  const contador2Ref = useRef<HTMLSpanElement>(null);
  const contador3Ref = useRef<HTMLSpanElement>(null);
  const contador4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Aquí irán las animaciones GSAP

    gsap.to(subtituloRef.current, {
      opacity:1,
      y:0,
      duration:0.6,
      ease: "power2.out",
    });

    gsap.to(tituloRef.current, {
      opacity:1,
      y:0,
      duration:0.8,
      delay: 0.2,
      ease: "power2.out",
    });

    gsap.to(descripcionRef.current,{
      opacity:1,
      y:0,
      duration:0.8,
      delay: 0.4,
      ease: "power2.out",
    });

    gsap.to(botonRef.current,{
      opacity:1,
      y:0,
      duration:0.8,
      delay: 0.6,
      ease: "power2.out",
    });

    const observar = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if( entry.isIntersecting) {
    gsap.to('.tech-icon', {
      opacity:1,
      y:0,
      duration:0.5,
      stagger: 0.1,
      delay: 0.4,
      ease: "power2.out",
    });
    observar.disconnect(); // para que no se repita
        }
      });
    });

    const techSection = document.querySelector('.tech-section');
    if(techSection) observar.observe(techSection);


    const observarContador = new IntersectionObserver((entires) =>{
      entires.forEach(entry =>{
        if(entry.isIntersecting) {
          gsap.to(contador1Ref.current, {
            innerHTML : 8,
            duration: 2,
            ease: "power2.inOut",
            snap: {innerHTML:1},
          });

            gsap.to(contador2Ref.current, {
            innerHTML : 5,
            duration: 2,
            ease: "power2.inOut",
            snap: {innerHTML:1},
            delay:0.2,
          });

            gsap.to(contador3Ref.current, {
            innerHTML : 3,
            duration: 2,
            ease: "power2.inOut",
            snap: {innerHTML:1},
            delay:0.4,
          });

            gsap.to(contador4Ref.current, {
            innerHTML : 15,
            duration: 2,
            ease: "power2.inOut",
            snap: {innerHTML:1},
            delay:0.6,
          });

          observarContador.disconnect(); // para que no se repita
        }
      })
    })
    const contadorSection = document.querySelector('.contador-section');
    if(contadorSection) observarContador.observe(contadorSection);
  }, []);


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className='py-32 bg-linear-to-br from-slate-900 via-blue-800 to-slate-800'>

          <div className='max-w-4xl mx-auto text-center'>
            <p ref={subtituloRef} className='text-blue-300 text-sm uppercase tracking-widest mb-4 opacity-0'>Proyecto de Aprendizaje Fullstack</p>
          <h1 ref={tituloRef} className='text-5xl font-bold bg-linear-to-r from-white via-blue-100 to-slate-00 bg-clip-text text-transparent opacity-0'>Mercado Local</h1>
          <p ref={descripcionRef} className='mt-6 text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto opacity-0'>E-commerce moderno construido con React, Node.js, TypeScript y Supabase.Un proyecto para aprender y dominar el desarrollo fullstack.</p>
          <div className='mt-8'>
            <Link to="/catalog" ref={botonRef} className='bg-blue-600 text-white px-8 py-3 rounded-full font-semibold opacity-0 hover:bg-blue-500 transition'>
            Ver Catalogo</Link>         
          </div>
          </div>
        </section>






        <section className='py-20 bg-white'>

          <div className='text-center mx-auto max-w-4xl mb-12'>
            <h2 className='text-3xl uppercase font-bold'> Misión</h2>
            <p className='text-slate-600 text-sm mt-2'> 
              Mercado Local es un proyecto fullstack desarrollado para dominar 
              tecnologías modernas del mundo real. Desde la arquitectura del 
              backend hasta la experiencia de usuario en el frontend, cada 
              decisión técnica fue tomada con intención de aprendizaje y calidad.</p>
          </div>

          {/*Columna izquierda con textos y iconos*/}
          <div className='grid grid-cols-2 gap-12 max-w-7xl mx-auto px-8'>
            <div className='flex flex-col justify-center'>

              <h3 className='text-2xl font-semibold mb-4 '>¿Por qué este proyecto?</h3>
              <p className='text-slate-600 mb-6'>Este proyecto nació de la necesidad de aprender y dominar el desarrollo fullstack utilizando tecnologías modernas. Quería crear una aplicación real que me permitiera aplicar mis conocimientos y enfrentar desafíos del mundo real.</p>
              

              <div className='flex flex-col gap-2 mt-4'>

                <div className='flex items-center gap-2'>
                  <FaCheck className='text-blue-500 shrink-0' />
                  <p className='text-slate-600 text-sm'>API REST con Node.js y Express</p>
                </div>

                <div className='flex items-center gap-2'>
                  <FaCheck className='text-blue-500 shrink-0' />
                  <p className='text-slate-600 text-sm'>Autenticación con Supabase</p>
                </div>

                <div className='flex items-center gap-2'>
                  <FaCheck className='text-blue-500 shrink-0' />
                  <p className='text-slate-600 text-sm'>Frontend moderno con React y Tailwind</p>
                </div>

                <div className='flex items-center gap-2'>
                  <FaCheck className='text-blue-500 shrink-0' />
                  <p className='text-slate-600 text-sm'>Base de datos PostgreSQL</p>
                </div>
              </div>
            </div>


            <div className='rounded-2xl overflow-hidden border border-slate-100'>
              <img 
              src="https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Espacio de desarrollo"
              className='w-full h-full object-cover' />
            </div>
          </div>
        </section>






        <section className='py-20 bg-slate-950'>

          <div className='text-center mx-auto max-w-4xl mb-12'>
            {/*aqui van los titulos y descripciones*/}
          <h2 className='text-3xl font-bold text-white uppercase'>Tecnologias </h2>
          <p className='text-slate-500 text-sm mt-2'>El Stack utilizado para este Proyecto</p>
          </div>

          <div className='tech-section max-w-4xl mx-auto grid grid-cols-4 gap-8 px-8'>
            {/*aqui van los iconos*/}
            <div className='tech-icon flex flex-col items-center gap-2 opacity-0'>
              <SiReact size={48} className='text-cyan-400 grayscale hover:grayscale-0 duration-300 hover:scale-130 transition ' />
              <p className='text-sm font-medium text-slate-400'>React</p>
            </div>

            <div className='tech-icon flex flex-col items-center gap-2 opacity-0'>
              <SiTypescript size={48} className='text-blue-600 grayscale hover:grayscale-0 duration-300 hover:scale-130 transition ' />
              <p className='text-sm font-medium text-slate-400'>Typescript</p>
            </div>

            <div className='tech-icon flex flex-col items-center gap-2 opacity-0'>
              <SiTailwindcss size={48} className='text-cyan-500 grayscale hover:grayscale-0 duration-300 hover:scale-130 transition ' />
              <p className='text-sm font-medium text-slate-400'>Tailwind CSS</p>
            </div>

            <div className='tech-icon flex flex-col items-center gap-2 opacity-0'>
              <SiSupabase size={48} className='text-emerald-500 grayscale hover:grayscale-0 duration-300 hover:scale-130 transition ' />
              <p className='text-sm font-medium text-slate-400'>Supabase</p>
            </div>

            <div className='tech-icon flex flex-col items-center gap-2 opacity-0'>
              <SiPostgresql size={48} className='text-blue-400 grayscale hover:grayscale-0 duration-300 hover:scale-130 transition ' />
              <p className='text-sm font-medium text-slate-400'>PostgreSQL</p>
            </div>

            <div className='tech-icon flex flex-col items-center gap-2 opacity-0'>
              <SiVite size={48} className='text-purple-500 grayscale hover:grayscale-0 duration-300 hover:scale-130 transition ' />
              <p className='text-sm font-medium text-slate-400'>Vite</p>
            </div>

            <div className='tech-icon flex flex-col items-center gap-2 opacity-0'>
              <SiExpress size={48} className='text-slate-700 grayscale hover:grayscale-0 duration-300 hover:scale-130 transition ' />
              <p className='text-sm font-medium text-slate-400'>Express</p>
            </div>

            <div className='tech-icon flex flex-col items-center gap-2 opacity-0'>
              <FaNodeJs size={48} className='text-green-500 grayscale hover:grayscale-0 duration-300 hover:scale-130 transition ' />
              <p className='text-sm font-medium text-slate-400'>Node.js</p>
            </div>

          </div>        
        </section>






        <section className='py-20 bg-linear-to-br from-blue-800 to-purple-950'>
          <div className='text-center mb-12 mx-auto max-w-4xl'>
            <h2 className='uppercase text-white text-3xl font-bold'>Estadisticas</h2>
            <p className='mt-4 text-slate-400 text-sm'>El proyecto en números</p>
          </div>

          <div className='contador-section grid grid-cols-4 mx-auto max-w-4xl gap-8 px-8'>
            
            
            <div className='flex flex-col items-center bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 cursor-pointer'>
              <span ref={contador1Ref} className='text-white font-bold mb-2 text-4xl'>0</span>
              <p className='text-center text-white text-sm'>Endpoints API</p>              
            </div>

            <div className='flex flex-col items-center bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 cursor-pointer'>
              <span ref={contador2Ref} className='text-white font-bold mb-2 text-4xl'>0</span>
              <p className='text-center text-white text-sm'>Tablas en BD</p>              
            </div>

            <div className='flex flex-col items-center bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 cursor-pointer'>
              <span ref={contador3Ref} className='text-white font-bold mb-2 text-4xl'>0</span>
              <p className='text-center text-white text-sm'>Fases del Proyecto</p>              
            </div>

            <div className='flex flex-col items-center bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 cursor-pointer'>
              <span ref={contador4Ref} className='text-white font-bold mb-2 text-4xl'>0</span>
              <p className='text-center text-white text-sm'>Productos</p>              
            </div>
          </div>
        </section>





        <section className='bg-white py-20'>
          <div className='text-center mb-12 mx-auto max-w-4xl'>
            <h2 className='uppercase font-bold text-3xl'>Lo que viene</h2>
            <p className='text-slate-600 text-sm mt-2'>Este proyecto esta en constante evolución</p>
          </div>

          <div className='max-w-xl mx-auto flex flex-col gap-4'>

            <div className='flex items-center gap-3 p-4 rounded-xl bg-slate-200 border border-slate-100'>
              <FaArrowRight className='text-blue-500 shrink-0'> </FaArrowRight>
              <p className='text-slate-700 text-sm'>Panel de administración para gestionar productos y pedidos</p>
            </div>

            <div className='flex items-center gap-3 p-4 rounded-xl bg-slate-200 border border-slate-100'>
              <FaArrowRight className='text-blue-500 shrink-0'> </FaArrowRight>
              <p className='text-slate-700 text-sm'>Integración con Transbank para pagos reales</p>
            </div>

            <div className='flex items-center gap-3 p-4 rounded-xl bg-slate-200 border border-slate-100'>
              <FaArrowRight className='text-blue-500 shrink-0'> </FaArrowRight>
              <p className='text-slate-700 text-sm'>Sistema de roles — admin y cliente</p>
            </div>

            <div className='flex items-center gap-3 p-4 rounded-xl bg-slate-200 border border-slate-100'>
              <FaArrowRight className='text-blue-500 shrink-0'> </FaArrowRight>
              <p className='text-slate-700 text-sm'>Notificaciones por email al confirmar pedidos</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
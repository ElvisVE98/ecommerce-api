import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/FooterPage';

const AboutPage = () => {

  useEffect(() => {
    // Aquí irán las animaciones GSAP
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <p>Contenido aquí</p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
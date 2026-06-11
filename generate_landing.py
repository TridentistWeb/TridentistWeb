content = """import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Landing/Hero';
import Specialists from '../components/Landing/Specialists';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5 } },
  out: { opacity: 0, transition: { duration: 0.5 } }
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['INICIO', 'QUIENES SOMOS', 'NUESTROS DOCTORES', 'UBICACION', 'CONTACTO'];

  return (
    <nav className={"fixed-top w-100 transition-all p-4 z-3 " + (scrolled ? "bg-black" : "bg-transparent")} style={{ transition: 'background-color 0.3s ease' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        <a href="#inicio" className="text-white text-decoration-none">
          <h1 className="fw-black text-uppercase m-0 tracking-tighter" style={{fontSize: '1.5rem', letterSpacing: '-1px'}}>Tridentist</h1>
        </a>
        
        <div className="d-none d-lg-flex gap-4">
          {navItems.map(item => (
            <a 
              key={item} 
              href={"#" + item.toLowerCase().replace(' ', '-')} 
              className="text-white text-decoration-none fw-bold text-uppercase fs-6 tracking-widest hover-text-info transition-all"
              style={{ letterSpacing: '2px' }}
            >
              {item}
            </a>
          ))}
        </div>
        
        <a href="/admin/login" className="btn btn-outline-light rounded-0 border-2 fw-bold text-uppercase tracking-widest px-4 py-2 d-none d-lg-block hover-bg-white text-decoration-none">
          Portal Admin
        </a>
      </div>
    </nav>
  );
};

const Landing = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="bg-black text-white"
    >
      <Navigation />
      
      <div id="inicio">
        <Hero />
      </div>

      {/* Placeholders for other sections to make it a SPA */}
      <section id="quienes-somos" className="vh-100 bg-dark d-flex align-items-center justify-content-center border-bottom border-secondary">
        <div className="container text-center">
          <h2 className="display-1 fw-black text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-3px' }}>Quiénes Somos</h2>
          <p className="fs-4 text-secondary max-w-700 mx-auto">La excelencia no es un acto, es un hábito. Redefinimos el estándar de atención dental.</p>
        </div>
      </section>

      <div id="nuestros-doctores">
        <Specialists />
      </div>
      
      <section id="ubicacion" className="vh-100 bg-dark d-flex align-items-center justify-content-center border-bottom border-secondary">
        <div className="container text-center">
          <h2 className="display-1 fw-black text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-3px' }}>Ubicación</h2>
          <p className="fs-4 text-secondary">Avenida Principal 123, Distrito Central, Ciudad</p>
        </div>
      </section>

      <section id="contacto" className="vh-100 bg-black d-flex align-items-center justify-content-center">
        <div className="container text-center">
          <h2 className="display-1 fw-black text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-3px' }}>Contacto</h2>
          <p className="fs-4 text-secondary mb-5">Hablemos sobre tu próxima sonrisa.</p>
          <a href="mailto:info@tridentist.com" className="btn btn-info rounded-0 border-0 fw-black text-uppercase tracking-widest px-5 py-3 fs-5">
            AGENDAR CITA
          </a>
        </div>
      </section>

      <footer className="py-5 bg-black text-center border-top border-secondary">
        <h2 className="fs-3 fw-black uppercase tracking-tighter text-white opacity-25 mb-3">Tridentist</h2>
        <p className="text-secondary small">© 2026 Tridentist Dental Clinic. All Rights Reserved.</p>
      </footer>
    </motion.div>
  );
};

export default Landing;
"""

with open("Frontend/src/pages/Landing.jsx", "w") as f:
    f.write(content)

print("Updated Landing.jsx")

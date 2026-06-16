import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Landing/Hero';
import Specialists from '../components/Landing/Specialists';
import BookingModal from '../components/Landing/BookingModal';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5 } },
  out: { opacity: 0, transition: { duration: 0.5 } }
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['INICIO', 'QUIENES SOMOS', 'NUESTROS DOCTORES', 'UBICACION', 'CONTACTO'];

  return (
    <>
      <nav className={"fixed-top w-100 transition-all p-3 p-md-4 z-5 " + (scrolled || isOpen ? "bg-black" : "bg-transparent")} style={{ transition: 'background-color 0.3s ease' }}>
        <div className="w-100 d-flex justify-content-between align-items-center px-2 px-md-4">
          <a href="#inicio" className="text-white text-decoration-none z-5 d-flex align-items-center">
            <img src="/logo.png" alt="Tridentist" style={{ height: '40px', width: 'auto' }} />
          </a>
          
          {/* Minimalist Hamburger Button (Always visible on all screens) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="d-flex flex-column justify-content-center align-items-end border-0 bg-transparent p-2 z-5"
            style={{ width: '40px', height: '40px', cursor: 'pointer', outline: 'none' }}
            aria-label="Toggle Menu"
          >
            <motion.div
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: '24px', height: '2px', transformOrigin: 'center', marginBottom: '5px' }}
              className="bg-white"
            />
            <motion.div
              animate={isOpen ? { opacity: 0, width: '0px' } : { opacity: 1, width: '24px' }}
              transition={{ duration: 0.2 }}
              style={{ height: '2px', marginBottom: '5px' }}
              className="bg-white"
            />
            <motion.div
              animate={isOpen ? { rotate: -45, y: -7, width: '24px' } : { rotate: 0, y: 0, width: '16px' }}
              transition={{ duration: 0.3 }}
              style={{ height: '2px', transformOrigin: 'center' }}
              className="bg-white"
            />
          </button>
        </div>
      </nav>

      {/* Hamburger Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="position-fixed top-0 start-0 w-100 vh-100 d-flex flex-column align-items-center justify-content-center"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 4,
            }}
          >
            <div className="d-flex flex-column align-items-center gap-4 text-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                >
                  <a
                    href={"#" + item.toLowerCase().replace(' ', '-')}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-decoration-none fw-black text-uppercase display-6 tracking-widest hover-text-info transition-all"
                    style={{ letterSpacing: '4px' }}
                  >
                    {item}
                  </a>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navItems.length * 0.08, duration: 0.3 }}
                className="mt-4"
              >
                <a
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-outline-light rounded-0 border-2 fw-bold text-uppercase tracking-widest px-4 py-2 hover-bg-white text-decoration-none"
                >
                  Portal Admin
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="bg-black text-white w-100 min-vh-100 overflow-x-hidden m-0 p-0"
    >
      <Navigation />
      
      <div id="inicio" className="w-100">
        <Hero onOpenModal={() => setIsModalOpen(true)} />
      </div>

      <section id="quienes-somos" className="min-vh-100 w-100 position-relative d-flex align-items-center justify-content-center border-bottom border-secondary overflow-hidden px-3 py-5">
        <video autoPlay loop muted playsInline className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" style={{ zIndex: 0 }} src="/quienes_somos.webm" />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-75" style={{ zIndex: 1 }}></div>
        <div className="w-100 text-center position-relative px-2" style={{ zIndex: 2 }}>
          <h2 className="display-3 display-md-1 fw-black text-white text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-1px' }}>Quiénes Somos</h2>
          <p className="fs-5 fs-md-4 text-light max-w-700 mx-auto">La excelencia no es un acto, es un hábito. Redefinimos el estándar de atención dental.</p>
        </div>
      </section>

      <div id="nuestros-doctores" className="w-100">
        <Specialists />
      </div>
      
      <section id="ubicacion" className="min-vh-100 w-100 position-relative d-flex align-items-center justify-content-center border-bottom border-secondary overflow-hidden px-3 py-5">
        <video autoPlay loop muted playsInline className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" style={{ zIndex: 0 }} src="/ubicacion.webm" />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-75" style={{ zIndex: 1 }}></div>
        <div className="w-100 text-center position-relative px-2" style={{ zIndex: 2 }}>
          <h2 className="display-3 display-md-1 fw-black text-white text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-1px' }}>Ubicación</h2>
          <p className="fs-5 fs-md-4 text-light">Avenida Principal 123, Distrito Central, Ciudad</p>
        </div>
      </section>

      <section id="contacto" className="min-vh-100 w-100 position-relative d-flex align-items-center justify-content-center overflow-hidden px-3 py-5">
        <video autoPlay loop muted playsInline className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" style={{ zIndex: 0 }} src="/contacto.webm" />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-75" style={{ zIndex: 1 }}></div>
        <div className="w-100 text-center position-relative px-2" style={{ zIndex: 2 }}>
          <h2 className="display-3 display-md-1 fw-black text-white text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-1px' }}>Contacto</h2>
          <p className="fs-5 fs-md-4 text-light mb-4 mb-md-5">Hablemos sobre tu próxima sonrisa.</p>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-info rounded-0 border-0 fw-black text-uppercase tracking-widest px-4 py-3 px-md-5 py-md-3 fs-6 fs-md-5">
            AGENDAR CITA
          </button>
        </div>
      </section>

      <footer className="py-5 bg-black text-center border-top border-secondary w-100">
        <h2 className="fs-3 fw-black uppercase tracking-tighter text-white opacity-25 mb-3">Tridentist</h2>
        <p className="text-secondary small">© 2026 Tridentist Dental Clinic. All Rights Reserved.</p>
      </footer>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

export default Landing;
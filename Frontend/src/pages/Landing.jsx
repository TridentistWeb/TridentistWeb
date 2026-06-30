import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Landing/Hero';
import Specialists from '../components/Landing/Specialists';
import SuccessCases from '../components/Landing/SuccessCases';
import Promotions from '../components/Landing/Promotions';
import Footer from '../components/Landing/Footer';
import WhatsAppButton from '../components/Landing/WhatsAppButton';
import BookingModal from '../components/Landing/BookingModal';
import { HeartHandshake, ChevronRight, X, UserCheck } from 'lucide-react';

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

  const navItems = [
    { label: 'INICIO', href: '#inicio' },
    { label: 'QUIÉNES SOMOS', href: '#quienes-somos' },
    { label: 'CASOS DE ÉXITO', href: '#casos-exito' },
    { label: 'PROMOCIONES', href: '#promociones' },
    { label: 'NUESTROS DOCTORES', href: '#doctores' },
    { label: 'UBICACIÓN & CONTACTO', href: '#ubicacion-contacto' },
  ];

  return (
    <>
      <nav 
        className={"fixed-top w-100 transition-all p-3 p-md-4 " + (scrolled ? "bg-black shadow-lg" : "bg-transparent")} 
        style={{ transition: 'background-color 0.3s ease', zIndex: 10000 }}
      >
        <div className="w-100 d-flex justify-content-between align-items-center px-2 px-md-4">
          <a href="#inicio" className="text-white text-decoration-none d-flex align-items-center gap-2" style={{ zIndex: 10002 }}>
            <div className="bg-white p-1.5 rounded-2 d-inline-flex align-items-center shadow-sm">
              <img src="/logo.png" alt="Tridentist" style={{ height: '38px', width: 'auto', objectFit: 'contain' }} />
            </div>
          </a>
          
          <div className="d-flex align-items-center gap-3" style={{ zIndex: 10002 }}>
            {/* Direct Portal Admin Button on Navbar */}
            <a
              href="/admin/login"
              className="btn btn-outline-light rounded-pill px-3 py-1.5 fw-bold text-uppercase tracking-wider hover-bg-white text-decoration-none d-flex align-items-center gap-1"
              style={{ fontSize: '0.8rem' }}
            >
              <UserCheck size={14} /> Portal Admin
            </a>

            {/* GTA VI Style Sandwich Icon */}
            <button
              onClick={() => setIsOpen(true)}
              className="d-flex flex-column justify-content-center align-items-end border-0 bg-transparent p-2 hover-opacity-80"
              style={{ width: '44px', height: '44px', cursor: 'pointer', outline: 'none' }}
              aria-label="Open Menu"
            >
              <div style={{ width: '28px', height: '2.5px', marginBottom: '6px' }} className="bg-white rounded-pill" />
              <div style={{ width: '28px', height: '2.5px' }} className="bg-white rounded-pill" />
            </button>
          </div>
        </div>
      </nav>

      {/* GTA VI Style Side Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Dim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="position-fixed top-0 start-0 w-100 vh-100"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                zIndex: 99998,
              }}
            />

            {/* Right Side Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="position-fixed top-0 end-0 h-100 d-flex flex-column justify-content-between p-4 p-md-5"
              style={{
                width: '100%',
                maxWidth: '440px',
                backgroundColor: '#0c1017',
                borderLeft: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
                zIndex: 99999,
              }}
            >
              {/* Drawer Header */}
              <div>
                <div className="d-flex justify-content-between align-items-center mb-5 pb-3 border-bottom border-secondary border-opacity-25">
                  <div className="d-flex align-items-center gap-2">
                    <img src="/logo.png" alt="Tridentist" style={{ height: '32px', width: 'auto', filter: 'brightness(1.2)' }} />
                    <span className="text-secondary small fw-bold text-uppercase tracking-wider">Tridentist Clinic</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="btn btn-outline-secondary rounded-circle p-2 d-flex align-items-center justify-content-center border-opacity-50 text-white hover-bg-white hover-text-dark transition-all"
                    style={{ width: '40px', height: '40px' }}
                    aria-label="Close Menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Vertical Menu Links List */}
                <div className="d-flex flex-column gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-white text-decoration-none fw-black text-uppercase py-3 px-2 d-flex align-items-center justify-content-between rounded-3 transition-all hover-bg-dark-gray group"
                        style={{
                          fontSize: '1.25rem',
                          letterSpacing: '1.5px',
                          borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}
                      >
                        <span className="group-hover-text-info transition-colors">{item.label}</span>
                        <ChevronRight size={20} className="text-secondary opacity-50 group-hover-text-info transition-all" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-4 border-top border-secondary border-opacity-25">
                <a
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-info w-100 py-3 rounded-3 fw-black text-uppercase tracking-widest text-dark d-flex align-items-center justify-content-center gap-2 shadow hover-bg-white transition-all mb-3"
                >
                  <UserCheck size={18} /> Acceso Portal Admin
                </a>
                <p className="text-secondary small text-center mb-0 opacity-75">
                  Av. del Aire 1222, San Luis • +51 953 507 917
                </p>
              </div>
            </motion.div>
          </>
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

      {/* Quiénes Somos Section */}
      <section id="quienes-somos" className="min-vh-100 w-100 position-relative d-flex align-items-center justify-content-center border-bottom border-secondary border-opacity-25 overflow-hidden px-3 py-5">
        <video autoPlay loop muted playsInline className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" style={{ zIndex: 0, opacity: 0.35 }} src="/quienes_somos.webm" />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-b from-black via-black/80 to-black" style={{ zIndex: 1 }}></div>
        
        <div className="container position-relative px-2 py-5" style={{ zIndex: 2 }}>
          <div className="max-w-900 mx-auto text-center">
            
            <div className="mb-4 d-inline-block">
              <span className="badge bg-info bg-opacity-10 text-info px-4 py-2 rounded-pill text-uppercase tracking-widest fw-bold d-inline-flex align-items-center gap-2">
                <HeartHandshake size={18} /> Bienvenidos a Tridentist
              </span>
            </div>

            <h2 className="display-4 display-md-2 fw-black text-white text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-1px' }}>
              Quiénes <span className="text-info">Somos</span>
            </h2>

            {/* Featured Brand Welcome Card */}
            <div className="bg-dark bg-opacity-80 p-4 p-md-5 rounded-4 border border-secondary border-opacity-25 shadow-lg mb-4 backdrop-blur">
              <div className="d-flex justify-content-center mb-4">
                <div className="bg-white p-3 rounded-3 shadow">
                  <img src="/logo.png" alt="Tridentist Logo" style={{ height: '64px', width: 'auto', objectFit: 'contain' }} />
                </div>
              </div>
              
              <p className="fs-4 fs-md-3 text-light fw-semibold lh-relaxed mb-4" style={{ letterSpacing: '0.2px' }}>
                ¡Transformamos cada sonrisa en Tridentist! ✨ Nos dedicamos a cuidar de tu sonrisa en un ambiente acogedor y profesional. Nuestro equipo de expertos está aquí para garantizar que disfrutes de una experiencia dental cómoda y sin estrés. ¡Te esperamos! 😁🦷
              </p>
            </div>

            <p className="fs-5 text-secondary">
              La excelencia no es un acto, es un hábito. Redefinimos el estándar de atención dental con tecnología clínica de vanguardia y atención personalizada.
            </p>

          </div>
        </div>
      </section>

      {/* Casos de Éxito Section */}
      <SuccessCases />

      {/* Promociones Dinámicas Section */}
      <Promotions />

      {/* Nuestros Doctores Section */}
      <div id="doctores" className="w-100">
        <Specialists />
      </div>
      
      {/* Footer & Map & Contact Section */}
      <Footer />

      {/* Persistent Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Modal for Booking */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
};

export default Landing;
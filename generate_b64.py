import base64

content = """import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axiosConfig';

const Specialists = () => {
  const [doctors, setDoctors] = useState([]);
  const [hoveredDoctor, setHoveredDoctor] = useState(null);
  const [activeDoctor, setActiveDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/doctors'); 
        const enriched = res.data.map((doc) => ({
          ...doc,
          bio: doc.bio || 'Especialista de primer nivel enfocado en brindar el mejor cuidado en ' + doc.especialidad + '. Con años de experiencia y un compromiso inquebrantable con la excelencia clínica y la innovación tecnológica.',
          videoUrl: doc.videoUrl || '/hero-bg.webm',
          slogan: doc.slogan || 'PASIÓN POR LA ' + doc.especialidad.toUpperCase(),
        }));
        setDoctors(enriched);
        if(enriched.length > 0) {
          setHoveredDoctor(enriched[0]);
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };
    fetchDoctors();
  }, []);

  if (activeDoctor) {
    return (
      <AnimatePresence>
        <motion.div 
          className="vh-100 vw-100 position-fixed top-0 start-0 z-3"
          style={{ zIndex: 1050 }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
            style={{ zIndex: -1 }}
            src={activeDoctor.videoUrl}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-50" style={{ zIndex: -1 }}></div>

          <div className="container-fluid h-100 d-flex flex-column justify-content-between p-5 position-relative z-1">
            <div className="d-flex justify-content-between align-items-start mt-4">
              <h1 className="fw-black text-white text-uppercase tracking-tighter m-0" style={{fontSize: '2rem', letterSpacing: '-2px'}}>
                Tridentist
              </h1>
              <button 
                onClick={() => setActiveDoctor(null)}
                className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold text-uppercase d-flex align-items-center gap-2"
                style={{ transition: 'all 0.3s' }}
              >
                <span>&#8592;</span> VOLVER A LA LISTA
              </button>
            </div>

            <div className="mb-5 pb-5">
              <motion.h2 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="fw-black text-white text-uppercase mb-0 tracking-tight"
                style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: '0.9', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
              >
                DR. {activeDoctor.nombres}
                <br />
                {activeDoctor.apellidos}
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="fs-3 text-info fw-bold text-uppercase mt-3 mb-4 tracking-wide"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                {activeDoctor.slogan}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-dark bg-opacity-75 p-4 border-start border-info border-4 mt-4"
                style={{ maxWidth: '600px', backdropFilter: 'blur(10px)' }}
              >
                <p className="fs-5 text-light mb-0 lh-lg">{activeDoctor.bio}</p>
                <div className="mt-4 pt-3 border-top border-secondary">
                  <span className="badge bg-info text-dark px-3 py-2 fs-6 text-uppercase">
                    {activeDoctor.especialidad}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <section id="nuestros-doctores" className="vh-100 bg-black overflow-hidden d-flex flex-column">
      <div className="row g-0 flex-grow-1 h-100">
        
        <div className="col-12 col-lg-7 position-relative h-100 d-none d-lg-block">
          <AnimatePresence mode="wait">
            {hoveredDoctor && (
              <motion.div
                key={hoveredDoctor.codigo}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-100 h-100 position-absolute top-0 start-0"
              >
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-100 h-100 object-fit-cover opacity-75"
                  src={hoveredDoctor.videoUrl}
                />
                <div className="position-absolute bottom-0 start-0 w-100 h-50" style={{ background: 'linear-gradient(to top, rgba(0,0,0,1), transparent)' }}></div>
                
                <div className="position-absolute bottom-0 start-0 p-5 w-100 z-2 mb-4">
                  <div className="bg-black bg-opacity-50 p-4 border border-secondary" style={{ backdropFilter: 'blur(8px)', maxWidth: '500px' }}>
                    <p className="text-info fw-bold text-uppercase tracking-wider mb-2">{hoveredDoctor.especialidad}</p>
                    <h3 className="text-white fw-black fs-2 text-uppercase mb-3" style={{ letterSpacing: '-1px' }}>DR. {hoveredDoctor.nombres} {hoveredDoctor.apellidos}</h3>
                    <p className="text-gray-300 fs-6 mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{hoveredDoctor.bio}</p>
                    <button 
                      onClick={() => setActiveDoctor(hoveredDoctor)}
                      className="btn btn-info text-dark fw-bold text-uppercase px-4 py-2 hover-bg-white transition-all"
                    >
                      Ver Perfil Completo
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="position-absolute top-0 start-0 p-5 z-3 w-100 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3" style={{ cursor: 'pointer' }}>
              <div className="bg-white rounded-circle d-flex justify-content-center align-items-center" style={{width: '40px', height: '40px'}}>
                <span className="text-black ms-1">&#9658;</span>
              </div>
              <span className="text-white fw-bold text-uppercase small tracking-widest" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Tour Virtual</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5 h-100 bg-dark overflow-auto position-relative z-3 shadow-lg custom-scrollbar" style={{ scrollbarWidth: 'thin' }}>
          <div className="p-4 p-lg-5 mt-lg-5">
            <h2 className="text-secondary fw-bold text-uppercase mb-5 fs-6" style={{ letterSpacing: '3px' }}>
              Conoce a nuestros <span className="text-white">Especialistas</span>
            </h2>
            
            <ul className="list-unstyled d-flex flex-column gap-3 mb-5 pb-5">
              {doctors.map((doc) => (
                <li key={doc.codigo}>
                  <button
                    onMouseEnter={() => setHoveredDoctor(doc)}
                    onClick={() => setActiveDoctor(doc)}
                    className="w-100 text-start bg-transparent border-0 p-3 p-lg-4 transition-all position-relative"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      transform: hoveredDoctor?.codigo === doc.codigo ? 'translateX(10px)' : 'none',
                      color: hoveredDoctor?.codigo === doc.codigo ? '#fff' : '#6c757d'
                    }}
                  >
                    <h3 className="fw-black text-uppercase m-0 d-flex flex-column lh-1" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-2px' }}>
                      <span className="text-white">{doc.nombres}</span> 
                      <span style={{ 
                        color: hoveredDoctor?.codigo === doc.codigo ? 'transparent' : 'inherit', 
                        WebkitTextStroke: hoveredDoctor?.codigo === doc.codigo ? '1px rgba(255,255,255,0.5)' : 'none',
                        transition: 'all 0.3s'
                      }}>
                        {doc.apellidos}
                      </span>
                    </h3>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Specialists;"""

with open("Frontend/src/components/Landing/Specialists.jsx", "w") as f:
    f.write(content)

print("Updated Specialists.jsx")

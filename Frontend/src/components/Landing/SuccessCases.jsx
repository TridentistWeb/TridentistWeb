import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, Award, Smile } from 'lucide-react';

const casesData = [
  {
    id: 'ortodoncia',
    title: 'Ortodoncia Estética e Invisible',
    subtitle: 'Alineación dental perfecta y corrección de mordida',
    patient: 'Caso #1 - Alineación Completa',
    duration: '12 Meses de tratamiento',
    beforeImg: '/cases/ortodoncia_before.png',
    afterImg: '/cases/ortodoncia_after.png',
    description: 'Transformación integral utilizando alineadores estéticos de alta precisión, logrando una sonrisa simétrica y funcional.'
  },
  {
    id: 'blanqueamiento',
    title: 'Blanqueamiento Dental LED Pro',
    subtitle: 'Aclaramiento intensivo de hasta 4 tonos en 1 sesión',
    patient: 'Caso #2 - Blanqueamiento Clínico',
    duration: '1 Sesión de 60 mins',
    beforeImg: '/cases/blanqueamiento_before.png',
    afterImg: '/cases/blanqueamiento_after.png',
    description: 'Eliminación de manchas superficiales y profundas devolviendo el brillo natural a las piezas dentales.'
  }
];

const BeforeAfterSlider = ({ beforeImg, afterImg, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const onMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onMouseUp);
    return () => {
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="position-relative overflow-hidden rounded-4 shadow-lg border border-secondary border-opacity-25 select-none"
      style={{ height: '420px', cursor: 'ew-resize', touchAction: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchMove={handleTouchMove}
    >
      {/* After Image */}
      <img 
        src={afterImg} 
        alt={`Después - ${title}`} 
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover pointer-events-none" 
      />
      <div className="position-absolute bottom-0 end-0 m-3 bg-success text-white px-3 py-1 rounded-pill fw-bold small shadow-sm d-flex align-items-center gap-1" style={{ zIndex: 2 }}>
        <Sparkles size={14} /> DESPUÉS
      </div>

      {/* Before Image */}
      <div 
        className="position-absolute top-0 start-0 h-100 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%`, zIndex: 1, transition: isDragging ? 'none' : 'width 0.1s ease-out' }}
      >
        <img 
          src={beforeImg} 
          alt={`Antes - ${title}`} 
          className="position-absolute top-0 start-0 h-100 object-fit-cover"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%', maxWidth: 'none' }}
        />
        <div className="position-absolute bottom-0 start-0 m-3 bg-dark text-white px-3 py-1 rounded-pill fw-bold small shadow-sm border border-secondary">
          ANTES
        </div>
      </div>

      {/* Divider Bar */}
      <div 
        className="position-absolute top-0 bottom-0 d-flex justify-content-center align-items-center"
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)', 
          zIndex: 3,
          width: '4px',
          backgroundColor: '#0dcaf0',
          boxShadow: '0 0 12px rgba(13, 202, 240, 0.8)'
        }}
      >
        <div 
          className="bg-info text-dark rounded-circle d-flex align-items-center justify-content-center shadow-lg border border-2 border-white"
          style={{ width: '44px', height: '44px', cursor: 'grab' }}
        >
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>&#10094;&#10095;</span>
        </div>
      </div>
    </div>
  );
};

const SuccessCases = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const currentCase = casesData[activeCaseIndex];

  return (
    <section id="casos-exito" className="py-5 bg-black text-white position-relative overflow-hidden border-bottom border-secondary border-opacity-25 min-vh-100 d-flex align-items-center">
      {/* Background Video referentes */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover pointer-events-none" 
        style={{ zIndex: 0, opacity: 0.3 }} 
        src="/christian_soto.webm" 
      />
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none" style={{ zIndex: 1 }}></div>

      <div className="container py-4 position-relative z-2">
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="badge bg-info bg-opacity-10 text-info px-3 py-2 rounded-pill text-uppercase tracking-widest fw-bold mb-3 d-inline-flex align-items-center gap-2">
            <Award size={16} /> Transformaciones Reales
          </span>
          <h2 className="display-4 fw-black text-uppercase tracking-tighter text-white mb-3">
            Casos de <span className="text-info">Éxito</span>
          </h2>
          <p className="text-secondary fs-5">
            Desliza el marcador interactivo para ver el cambio real del "Antes" y "Después" logrado por nuestros especialistas.
          </p>
        </div>

        {/* Case Selection Tabs */}
        <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
          {casesData.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`btn px-4 py-3 rounded-pill fw-bold text-uppercase tracking-wider transition-all d-flex align-items-center gap-2 ${
                activeCaseIndex === idx 
                  ? 'btn-info text-dark shadow-lg scale-105' 
                  : 'btn-outline-secondary text-light border-opacity-50 hover-bg-white'
              }`}
            >
              <Smile size={18} /> {c.title}
            </button>
          ))}
        </div>

        {/* Slider & Detail Row */}
        <div className="row g-4 align-items-center">
          <div className="col-12 col-lg-7">
            <BeforeAfterSlider 
              beforeImg={currentCase.beforeImg} 
              afterImg={currentCase.afterImg} 
              title={currentCase.title}
            />
            <div className="text-center text-secondary small mt-2">
              💡 Arrastra el divisor central hacia la izquierda o derecha
            </div>
          </div>

          <div className="col-12 col-lg-5 ps-lg-4">
            <motion.div 
              key={currentCase.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-dark bg-opacity-90 p-4 p-md-5 rounded-4 border border-secondary border-opacity-25 shadow-sm backdrop-blur"
            >
              <span className="text-info fw-bold text-uppercase tracking-widest small d-block mb-2">
                {currentCase.patient}
              </span>
              <h3 className="fs-2 fw-black text-white text-uppercase mb-3">
                {currentCase.title}
              </h3>
              <p className="text-info opacity-75 fw-semibold mb-3">
                ✨ {currentCase.subtitle}
              </p>
              <p className="text-secondary fs-6 lh-relaxed mb-4">
                {currentCase.description}
              </p>
              
              <div className="p-3 rounded-3 bg-black bg-opacity-50 border border-secondary border-opacity-25 d-flex align-items-center justify-content-between mb-4">
                <span className="text-secondary small">Duración Estimada:</span>
                <span className="text-white fw-bold">{currentCase.duration}</span>
              </div>

              <a 
                href={`https://wa.me/51953507917?text=Hola%20Tridentist,%20me%20interesa%20un%20tratamiento%20similar%20al%20caso%20de%20${encodeURIComponent(currentCase.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-info w-100 py-3 rounded-3 fw-black text-uppercase tracking-widest text-dark d-flex align-items-center justify-content-center gap-2 hover-bg-white transition-all"
              >
                Quiero un resultado así <ChevronRight size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;

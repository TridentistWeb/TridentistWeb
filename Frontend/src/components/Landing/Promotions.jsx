import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Calendar, Gift, CheckCircle2, MessageSquare, Flame } from 'lucide-react';

const promotionsData = [
  {
    id: 'madre',
    category: 'madre',
    title: 'Campaña Día de la Madre',
    badge: 'EDICIÓN ESPECIAL 🌸',
    discount: '30% OFF',
    subtitle: 'Regálale a Mamá la Sonrisa que Merece',
    validity: 'Válido en la temporada de Mayo',
    features: [
      'Profilaxis Ultrasónica Completa',
      'Blanqueamiento LED de alta resolución',
      'Sesión de Fluorización y Diagnóstico Digital 3D'
    ],
    bgGradient: 'from-pink-900/40 via-purple-900/20 to-black',
    borderColor: 'border-pink-500/40',
    accentColor: '#ec4899',
    promoCode: 'MAMA2026'
  },
  {
    id: 'padre',
    category: 'padre',
    title: 'Campaña Día del Padre',
    badge: 'PAPÁ CAMPEÓN 👔',
    discount: '25% OFF',
    subtitle: 'Evaluación Digital + Paquete Ortodoncia Starter',
    validity: 'Válido en la temporada de Junio',
    features: [
      'Estudio Fonético y Radiográfico Completo',
      'Instalación de Brackets Estéticos o Metálicos',
      'Kit de Higiene Oral Especializado de regalo'
    ],
    bgGradient: 'from-blue-900/40 via-indigo-900/20 to-black',
    borderColor: 'border-blue-500/40',
    accentColor: '#3b82f6',
    promoCode: 'PAPA2026'
  },
  {
    id: 'fin-ano',
    category: 'fin-ano',
    title: 'Campaña Fin de Año',
    badge: 'AÑO NUEVO SONRISA NUEVA 🎆',
    discount: '2X1 PACK ESTÉTICO',
    subtitle: 'Recibe el Año Nuevo Lluciendo la Sonrisa Perfecta',
    validity: 'Válido Noviembre y Diciembre',
    features: [
      'Diseño de Sonrisa Digital (DSD)',
      'Limpieza Profunda + Destartraje',
      'Descuento especial en Carillas de Resina/Porcelana'
    ],
    bgGradient: 'from-amber-900/40 via-yellow-900/20 to-black',
    borderColor: 'border-amber-500/40',
    accentColor: '#f59e0b',
    promoCode: 'NEWYEAR2026'
  }
];

const Promotions = () => {
  const [filter, setFilter] = useState('todas');

  const filteredPromos = filter === 'todas' 
    ? promotionsData 
    : promotionsData.filter(p => p.category === filter);

  return (
    <section id="promociones" className="py-5 bg-black text-white position-relative overflow-hidden border-bottom border-secondary border-opacity-25 min-vh-100 d-flex align-items-center">
      {/* Background Video referente */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover pointer-events-none" 
        style={{ zIndex: 0, opacity: 0.3 }} 
        src="/contacto.webm" 
      />
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-b from-black via-black/80 to-black pointer-events-none" style={{ zIndex: 1 }}></div>

      <div className="container py-4 position-relative z-2">
        <div className="text-center max-w-700 mx-auto mb-5">
          <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill text-uppercase tracking-widest fw-bold mb-3 d-inline-flex align-items-center gap-2">
            <Flame size={16} /> Oportunidades Exclusivas
          </span>
          <h2 className="display-4 fw-black text-uppercase tracking-tighter text-white mb-3">
            Promociones <span className="text-info">Estacionales</span>
          </h2>
          <p className="text-secondary fs-5">
            Aprovecha nuestros paquetes especiales diseñados para cada época del año. ¡Reserva con tu código de descuento!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
          <button
            onClick={() => setFilter('todas')}
            className={`btn px-4 py-2 rounded-pill fw-bold text-uppercase small tracking-wider transition-all ${
              filter === 'todas' ? 'btn-info text-dark shadow' : 'btn-outline-secondary text-light border-opacity-25'
            }`}
          >
            Todas las Campañas
          </button>
          <button
            onClick={() => setFilter('madre')}
            className={`btn px-4 py-2 rounded-pill fw-bold text-uppercase small tracking-wider transition-all ${
              filter === 'madre' ? 'btn-info text-dark shadow' : 'btn-outline-secondary text-light border-opacity-25'
            }`}
          >
            🌸 Día de la Madre
          </button>
          <button
            onClick={() => setFilter('padre')}
            className={`btn px-4 py-2 rounded-pill fw-bold text-uppercase small tracking-wider transition-all ${
              filter === 'padre' ? 'btn-info text-dark shadow' : 'btn-outline-secondary text-light border-opacity-25'
            }`}
          >
            👔 Día del Padre
          </button>
          <button
            onClick={() => setFilter('fin-ano')}
            className={`btn px-4 py-2 rounded-pill fw-bold text-uppercase small tracking-wider transition-all ${
              filter === 'fin-ano' ? 'btn-info text-dark shadow' : 'btn-outline-secondary text-light border-opacity-25'
            }`}
          >
            🎆 Fin de Año
          </button>
        </div>

        {/* Banners Grid */}
        <div className="row g-4 justify-content-center">
          <AnimatePresence mode="popLayout">
            {filteredPromos.map((promo) => (
              <motion.div
                key={promo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="col-12 col-md-6 col-lg-4"
              >
                <div 
                  className={`h-100 p-4 p-md-5 rounded-4 border position-relative d-flex flex-column justify-content-between overflow-hidden shadow-lg backdrop-blur ${promo.borderColor}`}
                  style={{
                    backgroundColor: 'rgba(17, 24, 39, 0.85)',
                    backgroundImage: 'radial-gradient(ellipse at top, rgba(30, 41, 59, 0.6), rgba(0, 0, 0, 0.8))'
                  }}
                >
                  {/* Ribbon / Discount Tag */}
                  <div className="position-absolute top-0 end-0 m-3">
                    <span 
                      className="badge px-3 py-2 rounded-pill fw-black text-dark fs-6 shadow-sm"
                      style={{ backgroundColor: promo.accentColor }}
                    >
                      {promo.discount}
                    </span>
                  </div>

                  <div>
                    <span className="text-secondary small fw-bold text-uppercase tracking-widest d-flex align-items-center gap-1 mb-2">
                      <Gift size={14} style={{ color: promo.accentColor }} /> {promo.badge}
                    </span>

                    <h3 className="fs-3 fw-black text-white text-uppercase mb-2">
                      {promo.title}
                    </h3>

                    <p className="text-info opacity-90 small fw-semibold mb-4">
                      {promo.subtitle}
                    </p>

                    <div className="border-top border-secondary border-opacity-25 pt-3 mb-4">
                      <p className="text-secondary small fw-bold uppercase mb-2">Incluye:</p>
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        {promo.features.map((item, i) => (
                          <li key={i} className="text-light small d-flex align-items-start gap-2">
                            <CheckCircle2 size={16} className="text-info flex-shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex align-items-center justify-content-between text-secondary small mb-3 p-2 rounded bg-black bg-opacity-60 border border-secondary border-opacity-25">
                      <span className="d-flex align-items-center gap-1"><Calendar size={14} /> {promo.validity}</span>
                      <span className="fw-mono text-white fw-bold">CÓDIGO: {promo.promoCode}</span>
                    </div>

                    <a 
                      href={`https://wa.me/51953507917?text=Hola%20Tridentist,%20quiero%20reclamar%20la%20promocion%20${encodeURIComponent(promo.title)}%20con%20codigo%20${promo.promoCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-light w-100 py-3 rounded-3 fw-bold text-uppercase tracking-wider d-flex align-items-center justify-content-center gap-2 hover-bg-white transition-all"
                    >
                      <MessageSquare size={18} /> Reclamar por WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Promotions;

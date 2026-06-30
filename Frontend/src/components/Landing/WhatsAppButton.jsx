import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div 
      className="position-fixed bottom-0 end-0 m-3 m-md-4 d-flex flex-column align-items-end"
      style={{ zIndex: 99999 }}
    >
      {/* Pop-up Tooltip Chat Bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white text-dark p-3 rounded-4 shadow-lg mb-2 position-relative border border-success border-opacity-25"
            style={{ maxWidth: '280px' }}
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="position-absolute top-0 end-0 m-2 border-0 bg-transparent text-secondary p-1 rounded-circle hover-bg-light"
              aria-label="Cerrar mensaje"
            >
              <X size={14} />
            </button>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="bg-success text-white rounded-circle p-1 d-inline-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                <MessageCircle size={14} />
              </span>
              <strong className="small text-dark">¡Hola! ¿En qué te ayudamos? 😁</strong>
            </div>
            <p className="small text-muted mb-0" style={{ fontSize: '0.825rem', lineHeight: '1.3' }}>
              Haz clic aquí para chatear directamente con nuestro equipo por WhatsApp.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href="https://wa.me/51953507917?text=Hola%20Tridentist,%20quisiera%20consultar%20sobre%20sus%20servicios%20y%20promociones."
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="btn btn-success rounded-circle p-0 d-flex align-items-center justify-content-center shadow-lg text-white text-decoration-none position-relative"
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          borderColor: '#25D366',
          boxShadow: '0 8px 25px rgba(37, 211, 102, 0.5)'
        }}
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulsing ring */}
        <span 
          className="position-absolute top-0 start-0 w-100 h-100 rounded-circle bg-success opacity-50 pointer-events-none"
          style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
        ></span>

        <MessageCircle size={32} />
      </motion.a>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;

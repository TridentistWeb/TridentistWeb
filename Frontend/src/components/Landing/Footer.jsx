import React from 'react';
import { MapPin, Phone, MessageCircle, Facebook, Clock, Mail, ShieldCheck, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="ubicacion-contacto" className="bg-black text-white position-relative border-top border-secondary border-opacity-25 pt-5 overflow-hidden">
      {/* Background Video referente */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover pointer-events-none" 
        style={{ zIndex: 0, opacity: 0.25 }} 
        src="/ubicacion.webm" 
      />
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-b from-black via-black/85 to-black pointer-events-none" style={{ zIndex: 1 }}></div>

      <div className="container py-4 position-relative z-2">
        {/* Main Grid: Info + Map */}
        <div className="row g-5 align-items-stretch">
          
          {/* Brand & Location Info */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-between">
            <div>
              {/* Official Logo Display */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="bg-white p-2.5 rounded-3 shadow-sm d-inline-block">
                  <img 
                    src="/logo.png" 
                    alt="Tridentist Odontología Especializada" 
                    style={{ height: '70px', width: 'auto', objectFit: 'contain' }} 
                  />
                </div>
              </div>

              <p className="text-secondary fs-6 mb-4 lh-relaxed max-w-600">
                ¡Transformamos cada sonrisa en Tridentist! ✨ Nos dedicamos a cuidar de tu sonrisa en un ambiente acogedor y profesional. Nuestro equipo de expertos está aquí para garantizar que disfrutes de una experiencia dental cómoda y sin estrés. ¡Te esperamos! 😁🦷
              </p>

              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-info bg-opacity-10 p-2 rounded-circle text-info flex-shrink-0 mt-1">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <strong className="d-block text-white text-uppercase tracking-wider small">Dirección Física</strong>
                    <span className="text-secondary">Av. del Aire 1222, San Luis, Lima, Perú (Código Postal: 15004)</span>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-info bg-opacity-10 p-2 rounded-circle text-info flex-shrink-0 mt-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <strong className="d-block text-white text-uppercase tracking-wider small">Teléfono / WhatsApp</strong>
                    <a href="https://wa.me/51953507917" target="_blank" rel="noopener noreferrer" className="text-info text-decoration-none hover-underline fs-5 fw-bold">
                      +51 953 507 917
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-info bg-opacity-10 p-2 rounded-circle text-info flex-shrink-0 mt-1">
                    <Facebook size={20} />
                  </div>
                  <div>
                    <strong className="d-block text-white text-uppercase tracking-wider small">Facebook / Messenger</strong>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-secondary text-decoration-none hover-text-info">
                      Tridentist
                    </a>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-info bg-opacity-10 p-2 rounded-circle text-info flex-shrink-0 mt-1">
                    <Clock size={20} />
                  </div>
                  <div>
                    <strong className="d-block text-white text-uppercase tracking-wider small">Horarios de Atención</strong>
                    <span className="text-secondary d-block">Lunes a Sábado: 9:00 AM - 8:00 PM</span>
                    <span className="text-info opacity-75 small">Domingos y Feriados: Previa Cita</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-top border-secondary border-opacity-25">
              <span className="badge bg-dark border border-secondary text-secondary px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2">
                <ShieldCheck size={16} className="text-info" /> Tecnología Avanzada y Bioseguridad Garantizada
              </span>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="col-12 col-lg-6">
            <div className="h-100 rounded-4 overflow-hidden border border-secondary border-opacity-25 shadow-lg position-relative min-vh-300" style={{ minHeight: '380px' }}>
              <iframe 
                title="Ubicación Tridentist San Luis"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.4649479320297!2d-77.0049449!3d-12.0802778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c86514dd9427%3A0x6b86656711c1df79!2sAv.%20del%20Aire%201222%2C%20San%20Luis%2015004!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1) invert(0.9) hue-rotate(180deg)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-black bg-opacity-75 backdrop-blur text-center border-top border-secondary border-opacity-25">
                <span className="text-light small fw-bold">📍 Av. del Aire 1222, San Luis, Lima</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Footer Bar */}
        <div className="mt-5 pt-4 border-top border-secondary border-opacity-25 d-flex flex-column flex-md-row align-items-center justify-content-between text-secondary small gap-3">
          <div>
            © 2026 Tridentist Odontología Especializada. Todos los derechos reservados.
          </div>
          <div className="d-flex align-items-center gap-3">
            <a href="#inicio" className="text-secondary text-decoration-none hover-text-info">Inicio</a>
            <span>•</span>
            <a href="#quienes-somos" className="text-secondary text-decoration-none hover-text-info">Quiénes Somos</a>
            <span>•</span>
            <a href="#casos-exito" className="text-secondary text-decoration-none hover-text-info">Casos de Éxito</a>
            <span>•</span>
            <a href="#promociones" className="text-secondary text-decoration-none hover-text-info">Promociones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = ({ onOpenModal }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
      >
        <source src="/hero-bg.webm" type="video/webm" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-black/40 to-dark-gray z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          Tridentist
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="text-xl md:text-3xl text-gray-300 font-light mb-12 uppercase tracking-widest"
        >
          Odontología de Alto Rendimiento
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button onClick={onOpenModal} className="bg-dental-blue hover:bg-dental-blue-light text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(10,36,99,0.5)]">
            Reserva tu Cita
          </button>
          <a href="/admin/login" className="text-gray-400 hover:text-white uppercase tracking-widest text-sm font-semibold transition-colors duration-300 border-b border-transparent hover:border-white pb-1">
            Acceso Admin
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 z-20 text-white opacity-50"
      >
        <ChevronDown size={40} />
      </motion.div>
    </div>
  );
};

export default Hero;

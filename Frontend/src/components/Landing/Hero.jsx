import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Sparkles } from 'lucide-react';

const Hero = ({ onOpenModal }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
      >
        <source src="/hero-bg.webm" type="video/webm" />
      </video>

      {/* Overlay Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/90 via-black/50 to-black z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        {/* Official Logo Banner Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 bg-white/95 p-3 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] inline-block backdrop-blur-md border border-white/20"
        >
          <img 
            src="/logo.png" 
            alt="Tridentist Odontología Especializada" 
            className="h-20 md:h-28 w-auto object-contain mx-auto" 
          />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-2xl text-cyan-400 font-bold uppercase tracking-widest mb-8 drop-shadow-md flex items-center gap-2 justify-center"
        >
          <Sparkles size={20} /> Odontología de Alto Rendimiento
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <button 
            onClick={onOpenModal} 
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-full font-black uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 text-base"
          >
            <Calendar size={20} /> Reserva tu Cita
          </button>
          <a 
            href="#quienes-somos" 
            className="w-full sm:w-auto text-gray-300 hover:text-white uppercase tracking-widest text-sm font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-400 rounded-full px-6 py-4 text-center bg-black/40 backdrop-blur"
          >
            Conócenos
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.a 
        href="#quienes-somos"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 z-20 text-white opacity-60 hover:opacity-100 transition-opacity"
      >
        <ChevronDown size={36} />
      </motion.a>
    </div>
  );
};

export default Hero;

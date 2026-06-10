import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Landing/Hero';
import Treatments from '../components/Landing/Treatments';
import Specialists from '../components/Landing/Specialists';

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5 } },
  out: { opacity: 0, transition: { duration: 0.5 } }
};

const Landing = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="bg-dark-gray min-h-screen"
    >
      <Hero />
      <Treatments />
      <Specialists />
      
      <footer className="py-12 bg-black text-center border-t border-gray-900">
        <h2 className="text-3xl font-black uppercase tracking-tighter text-white opacity-50 mb-4">Tridentist</h2>
        <p className="text-gray-600 text-sm">© 2026 Tridentist Dental Clinic. All Rights Reserved.</p>
      </footer>
    </motion.div>
  );
};

export default Landing;

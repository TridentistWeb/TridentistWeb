import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const treatmentsData = [
  { id: 1, title: 'Profilaxis Dental Completa', price: 'S/ 120.00', desc: 'Limpieza profunda ultrasónica.' },
  { id: 2, title: 'Curación Dental con Resina', price: 'S/ 90.00', desc: 'Restauración estética de alta durabilidad.' },
  { id: 3, title: 'Endodoncia Premolar', price: 'S/ 350.00', desc: 'Tratamiento de conductos especializado.' },
  { id: 4, title: 'Blanqueamiento LED', price: 'S/ 450.00', desc: 'Sonrisa brillante en una sola sesión.' }
];

const Treatments = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(
      el.querySelector('.title'),
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-dark-gray relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="title text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-20 opacity-0">
          Tratamientos <span className="text-dental-blue">Estelares</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {treatmentsData.map((t, i) => (
            <div 
              key={t.id} 
              ref={el => cardsRef.current[i] = el}
              className="bg-light-gray border border-gray-800 p-8 rounded-2xl opacity-0 transform transition-transform duration-300 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(10,36,99,0.3)] hover:border-dental-blue group"
            >
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-dental-blue transition-colors">{t.title}</h3>
              <p className="text-gray-400 mb-8">{t.desc}</p>
              <div className="text-3xl font-black text-white">{t.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Treatments;

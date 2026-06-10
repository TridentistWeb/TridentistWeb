import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from '../../api/axiosConfig';

gsap.registerPlugin(ScrollTrigger);

const Specialists = () => {
  const [doctors, setDoctors] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get('/public/doctores'); 
        setDoctors(res.data);
      } catch (err) {
        setDoctors([
          { codigo: 1, nombres: 'Carlos', apellidos: 'Mendoza', especialidad: 'Ortodoncia' },
          { codigo: 2, nombres: 'Ana', apellidos: 'García', especialidad: 'Endodoncia' },
          { codigo: 3, nombres: 'Luis', apellidos: 'Torres', especialidad: 'Cirugía Maxilofacial' }
        ]);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (doctors.length > 0) {
      const el = sectionRef.current;
      gsap.fromTo(
        el.querySelectorAll('.doc-card'),
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          }
        }
      );
    }
  }, [doctors]);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-20 text-right">
          Nuestros <span className="text-dental-blue">Especialistas</span>
        </h2>
        
        <div className="flex flex-col gap-6">
          {doctors.map((doc, index) => (
            <div 
              key={doc.codigo} 
              className="doc-card bg-gradient-to-r from-light-gray to-dark-gray border-l-4 border-dental-blue p-8 flex flex-col md:flex-row items-center justify-between opacity-0 hover:bg-gray-900 transition-colors"
            >
              <div>
                <h3 className="text-3xl font-bold text-white uppercase tracking-wider">
                  Dr. {doc.nombres} {doc.apellidos}
                </h3>
                <p className="text-dental-blue-light text-xl tracking-widest mt-2 uppercase">{doc.especialidad}</p>
              </div>
              <div className="text-gray-500 font-black text-6xl mt-4 md:mt-0 opacity-20">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialists;

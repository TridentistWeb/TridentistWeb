import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import api from '../../api/axiosConfig';

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    email: '',
    telefono: '',
    comoSeEntero: '',
    especialidad: '',
    fecha: '',
    hora: '',
    comentario: '',
    aceptaPoliticas: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const poolsEspecialidades = [
    'Odontología General', 'Estética Dental', 'Ortodoncia', 
    'Endodoncia', 'Periodoncia', 'Implantes Dentales', 'Odontopediatría'
  ];

  const poolsOrigenes = [
    'Redes Sociales', 'Recomendación', 'Publicidad en línea', 
    'Pasaba por la zona', 'Otro'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nombres.trim()) newErrors.nombres = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato de correo inválido';
    }
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.comoSeEntero) newErrors.comoSeEntero = 'Seleccione una opción';
    if (!formData.especialidad) newErrors.especialidad = 'Seleccione una especialidad';
    if (!formData.fecha) newErrors.fecha = 'La fecha es obligatoria';
    if (!formData.hora) newErrors.hora = 'La hora es obligatoria';
    if (!formData.aceptaPoliticas) newErrors.aceptaPoliticas = 'Debe aceptar las políticas de privacidad';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await api.post('/public/citas/enviar-correo', formData);
      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus(null);
        onClose();
        setFormData({
          nombres: '', email: '', telefono: '', comoSeEntero: '', 
          especialidad: '', fecha: '', hora: '', comentario: '', aceptaPoliticas: false
        });
      }, 2500);
    } catch (error) {
      console.error('Error al enviar la cita:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            <div className="p-6 md:p-8">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Reserva tu Cita</h2>
              <p className="text-zinc-400 mb-8">Déjanos tus datos y nos pondremos en contacto contigo a la brevedad.</p>

              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="bg-green-500/20 text-green-400 p-6 rounded-lg text-center border border-green-500/30"
                >
                  <h3 className="text-xl font-bold mb-2">¡Solicitud Enviada!</h3>
                  <p>Pronto nos contactaremos contigo para confirmar tu cita.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="text" name="nombres" placeholder="Nombres y Apellidos"
                        value={formData.nombres} onChange={handleChange}
                        className={`w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${errors.nombres ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-600'}`}
                      />
                      {errors.nombres && <p className="text-red-500 text-xs mt-1">{errors.nombres}</p>}
                    </div>
                    
                    <div>
                      <input 
                        type="email" name="email" placeholder="Correo Electrónico"
                        value={formData.email} onChange={handleChange}
                        className={`w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-600'}`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <input 
                        type="tel" name="telefono" placeholder="Teléfono o Celular"
                        value={formData.telefono} onChange={handleChange}
                        className={`w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${errors.telefono ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-600'}`}
                      />
                      {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                    </div>

                    <div>
                      <div className="relative">
                        <select 
                          name="comoSeEntero" 
                          value={formData.comoSeEntero} onChange={handleChange}
                          className={`w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all appearance-none ${errors.comoSeEntero ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-600'}`}
                        >
                          <option value="" disabled>¿Cómo se enteró?</option>
                          {poolsOrigenes.map(org => <option key={org} value={org}>{org}</option>)}
                        </select>
                      </div>
                      {errors.comoSeEntero && <p className="text-red-500 text-xs mt-1">{errors.comoSeEntero}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <select 
                        name="especialidad" 
                        value={formData.especialidad} onChange={handleChange}
                        className={`w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all appearance-none ${errors.especialidad ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-600'}`}
                      >
                        <option value="" disabled>Seleccione una especialidad</option>
                        {poolsEspecialidades.map(esp => <option key={esp} value={esp}>{esp}</option>)}
                      </select>
                    </div>
                    {errors.especialidad && <p className="text-red-500 text-xs mt-1">{errors.especialidad}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="date" name="fecha"
                        value={formData.fecha} onChange={handleChange}
                        className={`w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${errors.fecha ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-600'} [color-scheme:dark]`}
                      />
                      {errors.fecha && <p className="text-red-500 text-xs mt-1">{errors.fecha}</p>}
                    </div>
                    <div>
                      <input 
                        type="time" name="hora"
                        value={formData.hora} onChange={handleChange}
                        className={`w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${errors.hora ? 'border-red-500 focus:ring-red-500' : 'border-zinc-700 focus:border-zinc-500 focus:ring-zinc-600'} [color-scheme:dark]`}
                      />
                      {errors.hora && <p className="text-red-500 text-xs mt-1">{errors.hora}</p>}
                    </div>
                  </div>

                  <div>
                    <textarea 
                      name="comentario" placeholder="Ingrese un comentario (opcional)..." rows="3"
                      value={formData.comentario} onChange={handleChange}
                      className="w-full bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-600 focus:outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input 
                      type="checkbox" id="aceptaPoliticas" name="aceptaPoliticas"
                      checked={formData.aceptaPoliticas} onChange={handleChange}
                      className="w-4 h-4 bg-zinc-800 border-zinc-700 rounded focus:ring-zinc-600 focus:ring-2 accent-white"
                    />
                    <label htmlFor="aceptaPoliticas" className="ml-2 text-sm text-zinc-400">
                      He leído y acepto las <a href="#" className="text-white hover:underline">Políticas de Privacidad</a>
                    </label>
                  </div>
                  {errors.aceptaPoliticas && <p className="text-red-500 text-xs mt-1">{errors.aceptaPoliticas}</p>}

                  {submitStatus === 'error' && (
                    <p className="text-red-500 text-sm text-center">Hubo un error al enviar la solicitud. Por favor intenta de nuevo.</p>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-widest py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {isSubmitting ? 'Enviando...' : 'Confirmar Reserva'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
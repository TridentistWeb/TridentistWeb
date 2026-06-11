import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('jwt_token', res.data.token);
      localStorage.setItem('admin_name', res.data.nombres);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dental-blue-light/20 via-black to-black z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-dark-gray border border-gray-800 p-10 rounded-2xl z-10 w-full max-w-md shadow-[0_0_50px_rgba(10,36,99,0.3)]"
      >
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-8 text-center">Acceso <span className="text-dental-blue">Admin</span></h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Usuario</label>
            <input 
              type="text" 
              className="w-full bg-black border border-gray-700 text-white p-4 rounded focus:outline-none focus:border-dental-blue transition-colors"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2 uppercase tracking-wider">Contraseña</label>
            <input 
              type="password" 
              className="w-full bg-black border border-gray-700 text-white p-4 rounded focus:outline-none focus:border-dental-blue transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-dental-blue hover:bg-dental-blue-light text-white font-bold py-4 rounded uppercase tracking-widest transition-colors mt-4"
          >
            Ingresar
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

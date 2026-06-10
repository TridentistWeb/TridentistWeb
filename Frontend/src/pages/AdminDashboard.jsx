import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericCRUD from '../components/Admin/GenericCRUD';
import { LogOut, Users, Activity, Calendar, FileText, UserPlus } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pacientes');
  const [adminName, setAdminName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/admin/login');
    }
    setAdminName(localStorage.getItem('admin_name') || 'Admin');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('admin_name');
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'pacientes', label: 'Pacientes', icon: Users },
    { id: 'doctores', label: 'Doctores', icon: UserPlus },
    { id: 'tratamientos', label: 'Tratamientos', icon: Activity },
    { id: 'citas', label: 'Citas', icon: Calendar },
    { id: 'boletas', label: 'Boletas', icon: FileText },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'pacientes':
        return <GenericCRUD 
          entityName="Pacientes" endpoint="/pacientes" primaryKey="codigo"
          columns={[{key: 'dni', label: 'DNI'}, {key: 'nombres', label: 'Nombres'}, {key: 'apellidos', label: 'Apellidos'}, {key: 'celular', label: 'Celular'}]}
          formFields={[{name: 'dni', label: 'DNI', required: true}, {name: 'nombres', label: 'Nombres', required: true}, {name: 'apellidos', label: 'Apellidos'}, {name: 'celular', label: 'Celular'}, {name: 'email', label: 'Email', type: 'email'}]}
        />;
      case 'doctores':
        return <GenericCRUD 
          entityName="Doctores" endpoint="/doctores" primaryKey="codigo"
          columns={[{key: 'dni', label: 'DNI'}, {key: 'nombres', label: 'Nombres'}, {key: 'apellidos', label: 'Apellidos'}, {key: 'especialidad', label: 'Especialidad'}]}
          formFields={[{name: 'dni', label: 'DNI', required: true}, {name: 'nombres', label: 'Nombres', required: true}, {name: 'apellidos', label: 'Apellidos'}, {name: 'especialidad', label: 'Especialidad', required: true}]}
        />;
      case 'tratamientos':
        return <GenericCRUD 
          entityName="Tratamientos" endpoint="/tratamientos" primaryKey="idTratamiento"
          columns={[{key: 'descripcion', label: 'Descripción'}, {key: 'precio', label: 'Precio'}]}
          formFields={[{name: 'descripcion', label: 'Descripción', required: true}, {name: 'precio', label: 'Precio', type: 'number', required: true}]}
        />;
      case 'citas':
        return <GenericCRUD 
          entityName="Citas" endpoint="/citas" primaryKey="idCita"
          columns={[{key: 'fechaHora', label: 'Fecha/Hora'}, {key: 'codigoPaciente', label: 'ID Paciente'}, {key: 'estado', label: 'Estado'}]}
          formFields={[{name: 'fechaHora', label: 'Fecha y Hora (YYYY-MM-DDTHH:mm:ss)', required: true}, {name: 'codigoPaciente', label: 'Código Paciente', type: 'number', required: true}, {name: 'codigoDoctor', label: 'Código Doctor', type: 'number', required: true}, {name: 'idTratamiento', label: 'ID Tratamiento', type: 'number', required: true}, {name: 'estado', label: 'Estado'}]}
        />;
      case 'boletas':
        return <GenericCRUD 
          entityName="Boletas" endpoint="/boletas" primaryKey="numeroBoleta"
          columns={[{key: 'numeroBoleta', label: 'N°'}, {key: 'fechaEmision', label: 'Fecha'}, {key: 'total', label: 'Total'}]}
          formFields={[{name: 'fechaEmision', label: 'Fecha (YYYY-MM-DDTHH:mm:ss)', required: true}, {name: 'codigoPaciente', label: 'Código Paciente', type: 'number', required: true}, {name: 'total', label: 'Total', type: 'number', required: true}]}
        />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-dark-gray border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">Tridentist</h1>
          <p className="text-dental-blue text-sm uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={'flex items-center gap-3 w-full p-3 rounded uppercase font-bold text-sm tracking-wider transition-colors ' + (isActive ? 'bg-dental-blue text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white')}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="mb-4 px-3 text-sm text-gray-400">Hola, <span className="text-white font-bold">{adminName}</span></div>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-500/10 rounded uppercase font-bold text-sm tracking-wider transition-colors">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

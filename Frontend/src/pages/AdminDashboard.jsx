import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericCRUD from '../components/Admin/GenericCRUD';
import Consultas from './Consultas';
import { LogOut, Users, Activity, Calendar, FileText, UserPlus, Search } from 'lucide-react';

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
    { id: 'consultas', label: 'Consultas DTO', icon: Search },
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
      case 'consultas':
        return <Consultas />;
      default: return null;
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-dark text-white p-0 d-flex">
      {/* Sidebar */}
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark border-end border-secondary" style={{ width: '280px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none border-bottom border-secondary pb-3 w-100">
          <span className="fs-4 fw-bold text-uppercase">Tridentist <span className="text-primary fs-6 d-block">Admin Panel</span></span>
        </a>
        <ul className="nav nav-pills flex-column mb-auto mt-3 gap-2">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <li className="nav-item" key={tab.id}>
                <button 
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-link text-uppercase fw-bold w-100 text-start d-flex align-items-center gap-3 ${isActive ? 'active bg-primary' : 'text-white hover-bg-secondary'}`}
                  style={!isActive ? { transition: 'background-color 0.2s' } : {}}
                  onMouseOver={(e) => !isActive && (e.currentTarget.style.backgroundColor = '#343a40')}
                  onMouseOut={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
        <hr className="border-secondary" />
        <div className="dropdown">
          <div className="d-flex align-items-center text-white text-decoration-none">
            <strong className="me-2">Hola, {adminName}</strong>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm ms-auto d-flex align-items-center gap-2">
              <LogOut size={16} /> Salir
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 overflow-auto" style={{ backgroundColor: '#121212' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericCRUD from '../components/Admin/GenericCRUD';
import Consultas from './Consultas';
import { LogOut, Users, Activity, Calendar, FileText, UserPlus, Search, Stethoscope } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('doctores');
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
    { id: 'doctores', label: 'Doctores', icon: UserPlus },
    { id: 'pacientes', label: 'Pacientes', icon: Users },
    { id: 'tratamientos', label: 'Tratamientos', icon: Activity },
    { id: 'citas', label: 'Citas', icon: Calendar },
    { id: 'boletas', label: 'Boletas', icon: FileText },
    { id: 'consultas', label: 'Consultas DTO', icon: Search },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'doctores':
        return <GenericCRUD 
          entityName="Doctores" endpoint="/doctors" primaryKey="codigo"
          columns={[{key: 'dni', label: 'DNI'}, {key: 'nombres', label: 'Nombres'}, {key: 'apellidos', label: 'Apellidos'}, {key: 'especialidad', label: 'Especialidad'}]}
          formFields={[{name: 'dni', label: 'DNI', required: true}, {name: 'nombres', label: 'Nombres', required: true}, {name: 'apellidos', label: 'Apellidos'}, {name: 'especialidad', label: 'Especialidad', required: true}]}
        />;
      case 'pacientes':
        return <GenericCRUD 
          entityName="Pacientes" endpoint="/pacientes" primaryKey="codigo"
          columns={[{key: 'dni', label: 'DNI'}, {key: 'nombres', label: 'Nombres'}, {key: 'apellidos', label: 'Apellidos'}, {key: 'celular', label: 'Celular'}]}
          formFields={[{name: 'dni', label: 'DNI', required: true}, {name: 'nombres', label: 'Nombres', required: true}, {name: 'apellidos', label: 'Apellidos'}, {name: 'celular', label: 'Celular'}, {name: 'email', label: 'Email', type: 'email'}]}
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
    <div className="container-fluid min-vh-100 p-0 d-flex" style={{ backgroundColor: '#0f172a' }}>
      {/* Sidebar Profesional */}
      <div className="d-flex flex-column flex-shrink-0 p-4 text-white shadow-lg" style={{ width: '280px', backgroundColor: '#1e293b' }}>
        <a href="/" className="d-flex align-items-center mb-4 text-white text-decoration-none border-bottom border-secondary pb-3">
          <Stethoscope className="text-primary me-3" size={32} />
          <div>
            <span className="fs-4 fw-bold text-uppercase d-block lh-1" style={{ letterSpacing: '1px' }}>Tridentist</span>
            <span className="text-primary fs-6 fw-semibold" style={{ letterSpacing: '2px' }}>ADMIN PANEL</span>
          </div>
        </a>
        <ul className="nav nav-pills flex-column mb-auto mt-2 gap-2">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <li className="nav-item" key={tab.id}>
                <button 
                  onClick={() => setActiveTab(tab.id)}
                  className={"nav-link fw-semibold w-100 text-start d-flex align-items-center gap-3 py-3 px-3 rounded-3 transition-all " + (isActive ? 'active bg-primary text-white shadow' : 'text-secondary')}
                  style={!isActive ? { transition: 'all 0.3s' } : {}}
                  onMouseOver={(e) => !isActive && (e.currentTarget.classList.add('text-white', 'bg-dark'))}
                  onMouseOut={(e) => !isActive && (e.currentTarget.classList.remove('text-white', 'bg-dark'))}
                >
                  <tab.icon size={20} className={isActive ? 'text-white' : 'text-primary'} />
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-auto border-top border-secondary pt-4">
          <div className="d-flex align-items-center justify-content-between text-white">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: '36px', height: '36px' }}>
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="lh-1">
                <small className="text-secondary d-block">Bienvenido,</small>
                <strong className="fw-semibold">{adminName}</strong>
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-outline-danger btn-sm border-0 rounded-circle p-2" title="Cerrar Sesión">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-5 overflow-auto">
        <div className="container-fluid max-w-1200">
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
            <h2 className="text-white fw-bold m-0">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
            <div className="text-secondary small">
              Panel de Administración / <span className="text-primary">{tabs.find(t => t.id === activeTab)?.label}</span>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

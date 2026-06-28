import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenericCRUD from '../components/Admin/GenericCRUD';
import Consultas from './Consultas';
import Odontograma from '../components/odontograma/Odontograma';
import api from '../api/axiosConfig';
import { LogOut, Users, Activity, Calendar, FileText, UserPlus, Search, Stethoscope, ClipboardList, DollarSign, Package, FlaskConical } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('doctores');
  const [adminName, setAdminName] = useState('');
  const [odontogramaPaciente, setOdontogramaPaciente] = useState(null);
  const [pacientesList, setPacientesList] = useState([]);
  const [selectedPacienteForOdontogram, setSelectedPacienteForOdontogram] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      navigate('/admin/login');
    }
    setAdminName(localStorage.getItem('admin_name') || 'Administrador');
    fetchPacientes();
  }, [navigate]);

  const fetchPacientes = async () => {
    try {
      const res = await api.get('/pacientes');
      if (Array.isArray(res.data)) {
        setPacientesList(res.data);
      }
    } catch (err) {
      console.error('Error fetching pacientes list', err);
    }
  };

  const handleLogout = () => {
    if (window.confirm('¿Desea cerrar la sesión del sistema?')) {
      localStorage.removeItem('jwt_token');
      localStorage.removeItem('admin_name');
      navigate('/admin/login');
    }
  };

  const tabs = [
    { id: 'doctores', label: '👨‍⚕️ Doctores', icon: UserPlus, desc: 'Gestión de médicos odontólogos y sus especialidades.' },
    { id: 'pacientes', label: '👥 Pacientes', icon: Users, desc: 'Registro y lista de pacientes de la clínica.' },
    { id: 'odontograma_tab', label: '🦷 Odontograma Dental', icon: Stethoscope, desc: 'Registro gráfico e interactivo de la dentadura por paciente.' },
    { id: 'tratamientos', label: '🦷 Tratamientos', icon: Activity, desc: 'Catálogo de procedimientos dentales y precios.' },
    { id: 'appointments', label: '📅 Agenda de Citas', icon: Calendar, desc: 'Programación y estado de citas médicas.' },
    { id: 'historias', label: '📋 Historias Clínicas', icon: ClipboardList, desc: 'Fichas clínicas y evolución médica de pacientes.' },
    { id: 'presupuestos', label: '🧾 Presupuestos', icon: FileText, desc: 'Cotizaciones de tratamientos por fases para clientes.' },
    { id: 'caja', label: '💰 Control Financiero (Caja)', icon: DollarSign, desc: 'Registro de ingresos y egresos de caja chica o principal.' },
    { id: 'inventario', label: '📦 Inventario / Insumos', icon: Package, desc: 'Control de productos, materiales dentales y stock.' },
    { id: 'laboratorio', label: '🧪 Laboratorio Dental', icon: FlaskConical, desc: 'Órdenes de prótesis y trabajos enviados a laboratorio.' },
    { id: 'boletas', label: '🧾 Boletas de Venta', icon: FileText, desc: 'Comprobantes de pago y descarga de facturas.' },
    { id: 'consultas', label: '🔍 Búsqueda Avanzada', icon: Search, desc: 'Consultas especializadas por doctor y tratamiento.' },
  ];

  const currentTabObj = tabs.find(t => t.id === activeTab);

  const renderContent = () => {
    switch(activeTab) {
      case 'doctores':
        return <GenericCRUD 
          entityName="Doctores" endpoint="/doctors" primaryKey="codigo"
          description="Añada o modifique los datos del personal médico especialista."
          columns={[{key: 'dni', label: 'DNI / Identificación'}, {key: 'nombres', label: 'Nombres'}, {key: 'apellidos', label: 'Apellidos'}, {key: 'especialidad', label: 'Especialidad Dental'}]}
          formFields={[
            {name: 'dni', label: 'Número de DNI', placeholder: 'Ej. 09876543', required: true}, 
            {name: 'nombres', label: 'Nombres Completos', placeholder: 'Ej. María Elena', required: true}, 
            {name: 'apellidos', label: 'Apellidos Completos', placeholder: 'Ej. Pérez García', required: true}, 
            {name: 'especialidad', label: 'Especialidad Dental', type: 'select', options: ['Odontología General', 'Ortodoncia y Ortopedia Maxilar', 'Endodoncia', 'Periodoncia e Implantología', 'Rehabilitación Oral y Estética', 'Odontopediatría', 'Cirugía Bucal y Maxilofacial'], required: true}
          ]}
        />;
      case 'pacientes':
        return (
          <div>
            <div className="bg-slate-800 p-4 rounded-4 mb-4 border border-secondary d-flex align-items-center justify-content-between">
              <div>
                <h4 className="text-warning fw-bold m-0">🦷 Acceso Rápido al Odontograma</h4>
                <p className="text-light fs-6 m-0">Seleccione un paciente registrado por su Nombre y Apellido para abrir su odontograma dental interactivo.</p>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <select 
                  className="form-select form-select-lg bg-dark text-white border-secondary fs-5"
                  value={selectedPacienteForOdontogram}
                  onChange={(e) => setSelectedPacienteForOdontogram(e.target.value)}
                >
                  <option value="">-- Seleccione Paciente por Nombre --</option>
                  {pacientesList.map(p => (
                    <option key={p.codigo || p.id} value={p.codigo || p.id}>
                      👤 {p.nombres} {p.apellidos} (DNI: {p.dni})
                    </option>
                  ))}
                </select>
                <button 
                  className="btn btn-warning btn-lg fw-bold fs-5 px-4 text-dark flex-shrink-0"
                  disabled={!selectedPacienteForOdontogram}
                  onClick={() => {
                    const found = pacientesList.find(p => String(p.codigo || p.id) === String(selectedPacienteForOdontogram));
                    setOdontogramaPaciente({
                      id: selectedPacienteForOdontogram,
                      nombre: found ? `${found.nombres} ${found.apellidos}` : `Paciente #${selectedPacienteForOdontogram}`
                    });
                  }}
                >
                  🦷 Abrir Odontograma
                </button>
              </div>
            </div>
            <GenericCRUD 
              entityName="Pacientes" endpoint="/pacientes" primaryKey="codigo"
              description="Lista general de pacientes registrados en la clínica."
              columns={[{key: 'dni', label: 'DNI / Identificación'}, {key: 'nombres', label: 'Nombres'}, {key: 'apellidos', label: 'Apellidos'}, {key: 'celular', label: 'Teléfono / Celular'}]}
              formFields={[
                {name: 'dni', label: 'Número de DNI', required: true}, 
                {name: 'nombres', label: 'Nombres Completos', required: true}, 
                {name: 'apellidos', label: 'Apellidos Completos', required: true}, 
                {name: 'celular', label: 'Número de Teléfono Celular', required: true}, 
                {name: 'email', label: 'Correo Electrónico (Opcional)', type: 'email'}
              ]}
            />
          </div>
        );
      case 'odontograma_tab':
        return (
          <div className="bg-slate-800 p-4 p-md-5 rounded-4 border border-secondary text-white">
            <h3 className="text-warning fw-bold mb-3">🦷 Módulo de Odontograma Dental</h3>
            <p className="fs-5 text-light mb-4">Seleccione el paciente por su Nombre y Apellido para cargar su historia gráfica de dentadura:</p>
            <div className="row g-3 align-items-center mb-5">
              <div className="col-md-8 col-lg-6">
                <select 
                  className="form-select form-select-lg bg-dark text-white border-secondary fs-4 p-3"
                  value={selectedPacienteForOdontogram}
                  onChange={(e) => setSelectedPacienteForOdontogram(e.target.value)}
                >
                  <option value="">-- Seleccione un Paciente por Nombre --</option>
                  {pacientesList.map(p => (
                    <option key={p.codigo || p.id} value={p.codigo || p.id}>
                      👤 {p.nombres} {p.apellidos} — DNI: {p.dni}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 col-lg-6">
                <button 
                  className="btn btn-warning btn-lg fw-bold fs-4 px-5 py-3 text-dark shadow-lg d-flex align-items-center gap-2"
                  disabled={!selectedPacienteForOdontogram}
                  onClick={() => {
                    const found = pacientesList.find(p => String(p.codigo || p.id) === String(selectedPacienteForOdontogram));
                    setOdontogramaPaciente({
                      id: selectedPacienteForOdontogram,
                      nombre: found ? `${found.nombres} ${found.apellidos}` : `Paciente #${selectedPacienteForOdontogram}`
                    });
                  }}
                >
                  🦷 Cargar Odontograma Interactivo
                </button>
              </div>
            </div>
            {odontogramaPaciente && (
              <Odontograma 
                pacienteId={odontogramaPaciente.id} 
                pacienteNombre={odontogramaPaciente.nombre} 
                onClose={() => setOdontogramaPaciente(null)} 
              />
            )}
          </div>
        );
      case 'tratamientos':
        return <GenericCRUD 
          entityName="Tratamientos Dentales" endpoint="/tratamientos" primaryKey="idTratamiento"
          description="Catálogo oficial de servicios médicos ofreciendo precios estándar."
          columns={[{key: 'descripcion', label: 'Descripción del Servicio'}, {key: 'precio', label: 'Precio S/.'}]}
          formFields={[
            {name: 'descripcion', label: 'Nombre o Descripción del Tratamiento', placeholder: 'Ej. Limpieza Dental Profunda', required: true}, 
            {name: 'precio', label: 'Precio Total (S/.)', type: 'number', placeholder: 'Ej. 150', required: true}
          ]}
        />;
      case 'appointments':
        return <GenericCRUD 
          entityName="Agenda de Citas" endpoint="/appointments" primaryKey="id"
          description="Gestione las citas programadas entre los doctores y los pacientes."
          columns={[
            {key: 'pacienteId', label: 'Paciente Atendido'}, 
            {key: 'doctorId', label: 'Doctor Asignado'}, 
            {key: 'fechaHoraInicio', label: 'Fecha y Hora Inicio'}, 
            {key: 'motivo', label: 'Motivo de Consulta'}, 
            {key: 'estado', label: 'Estado Actual'}
          ]}
          formFields={[
            {name: 'pacienteId', label: 'Nombre del Paciente', type: 'select-paciente', required: true},
            {name: 'doctorId', label: 'Nombre del Doctor Tratante', type: 'select-doctor', required: true},
            {name: 'fechaHoraInicio', label: '📅 Fecha y Hora de Inicio', type: 'datetime-local', required: true},
            {name: 'fechaHoraFin', label: '📅 Fecha y Hora de Término', type: 'datetime-local', required: true},
            {name: 'motivo', label: '🦷 Motivo de la Consulta', type: 'select', options: ['Consulta Diagnóstica y Odontograma', 'Profilaxis Dental y Curación Ultrasónica', 'Dolor Agudo / Urgencia Dental', 'Curación Estética con Resina', 'Tratamiento de Endodoncia', 'Exodoncia Simple (Extracción)', 'Exodoncia Compleja / Tercera Molar', 'Evaluación para Ortodoncia / Brackets', 'Blanqueamiento Dental LED', 'Corona de Zirconio Monolítico', 'Revisión y Control Post-Tratamiento'], required: true},
            {name: 'estado', label: '📋 Estado de la Cita', type: 'select', options: ['PENDIENTE', 'CONFIRMADA', 'CANCELADA', 'ATENDIDA'], required: true}
          ]}
        />;
      case 'historias':
        return <GenericCRUD 
          entityName="Historias Clínicas" endpoint="/historias-clinicas" primaryKey="id"
          description="Fichas clínicas médicas con la evolución y antecedentes del paciente."
          columns={[
            {key: 'pacienteId', label: 'Paciente Atendido'}, 
            {key: 'anamnesis', label: 'Antecedentes y Sintomatología'}, 
            {key: 'notasEvolucion', label: 'Notas Médicas / Evolución'}
          ]}
          formFields={[
            {name: 'pacienteId', label: 'Seleccione el Paciente por Nombre', type: 'select-paciente', required: true},
            {name: 'anamnesis', label: '📋 Anamnesis / Historia Médica Anterior', type: 'select', options: ['Paciente asintomático en buen estado general.', 'Paciente manifiesta sensibilidad a alimentos fríos/calientes.', 'Paciente reporta dolor punzante constante en zona molar.', 'Paciente refiere sangrado de encías durante el cepillado.', 'Paciente sin alergias medicamentosas conocidas.', 'Paciente hipertenso controlado. Sin alergias a la anestesia.'], required: true},
            {name: 'notasEvolucion', label: '📝 Notas de Evolución Médica', type: 'select', options: ['Se realiza profilaxis completa y aplicación de flúor.', 'Se efectúa curación con resina fotocurable sin complicaciones.', 'Se inicia aperturado y biopulpectomía para endodoncia.', 'Se realiza exodoncia simple bajo anestesia local con éxito.', 'Se toma impresión para prótesis dental y orden de laboratorio.', 'Se realiza control rutinario. Paciente con buena higiene oral.'], required: true}
          ]}
        />;
      case 'presupuestos':
        return <GenericCRUD 
          entityName="Presupuestos Dental" endpoint="/presupuestos" primaryKey="id"
          description="Cotización global de procedimientos organizados para entrega al paciente."
          columns={[
            {key: 'pacienteId', label: 'Paciente'}, 
            {key: 'fecha', label: 'Fecha Emisión'}, 
            {key: 'total', label: 'Monto Total S/.'}, 
            {key: 'estado', label: 'Estado'}
          ]}
          formFields={[
            {name: 'pacienteId', label: 'Seleccione el Paciente por Nombre', type: 'select-paciente', required: true},
            {name: 'fecha', label: '📅 Fecha de Emisión', type: 'date', required: true},
            {name: 'total', label: '💰 Costo Total Estimado S/.', type: 'number', required: true},
            {name: 'estado', label: '📋 Estado del Presupuesto', type: 'select', options: ['APROBADO', 'PENDIENTE', 'RECHAZADO'], required: true}
          ]}
        />;
      case 'caja':
        return <GenericCRUD 
          entityName="Movimientos de Caja" endpoint="/caja/transacciones" primaryKey="id"
          description="Control diario de entradas de dinero (cobros) y salidas (gastos)."
          columns={[
            {key: 'concepto', label: 'Detalle / Concepto'}, 
            {key: 'monto', label: 'Monto S/.'}, 
            {key: 'tipo', label: 'Tipo de Flujo'}, 
            {key: 'cajaId', label: 'Caja N°'}
          ]}
          formFields={[
            {name: 'concepto', label: '📄 Concepto o Detalle del Pago/Gasto', type: 'select', options: ['Cobro por Consulta Diagnóstica y Odontograma', 'Cobro por Curación con Resina Fotocurable', 'Cobro por Profilaxis Dental Ultrasónica', 'Cobro por Tratamiento de Endodoncia', 'Cobro por Extracción Dental (Exodoncia)', 'Cobro por Blanqueamiento Dental LED', 'Pago de Insumos Dentales a Proveedor', 'Pago de Trabajo a Laboratorio Dental', 'Gasto Operativo / Servicios del Consultorio'], required: true},
            {name: 'monto', label: '💰 Monto en Soles S/.', type: 'number', placeholder: 'Ej. 80.00', required: true},
            {name: 'tipo', label: '🔄 Tipo de Movimiento', type: 'select', options: ['INGRESO', 'EGRESO'], required: true},
            {name: 'cajaId', label: '🏦 Número de Caja', type: 'select', options: ['1 (Caja Principal)', '2 (Caja Chica)'], required: true}
          ]}
        />;
      case 'inventario':
        return <GenericCRUD 
          entityName="Inventario de Productos" endpoint="/inventario/productos" primaryKey="id"
          description="Supervise el stock disponible de insumos dentales para evitar desabastecimiento."
          columns={[
            {key: 'nombre', label: 'Nombre del Insumo / Producto'}, 
            {key: 'stockActual', label: 'Unidades Disponibles'}, 
            {key: 'stockMinimo', label: 'Alerta Mínima'}
          ]}
          formFields={[
            {name: 'nombre', label: '📦 Nombre del Producto o Insumo', type: 'select', options: ['Anestesia Lidocaína 2% con Epinefrina (Caja x 50)', 'Resina Fotocurable Filtek Z250 Talla A2 (3M)', 'Guantes de Nitrilo Examen Talla M (Caja x 100)', 'Ácido Grabador Dental 37% Gel (Jeringa)', 'Agujas Dentales Desechables Cortas (Caja x 100)', 'Mascarillas Quirúrgicas 3 Pliegues (Caja x 50)', 'Cemento de Ionómero de Vidrio', 'Puntas de Succión Desechables (Paquete x 100)'], required: true},
            {name: 'stockActual', label: '🔢 Cantidad Actual Disponible (Stock)', type: 'number', required: true},
            {name: 'stockMinimo', label: '⚠️ Cantidad Mínima de Alerta', type: 'number', required: true}
          ]}
        />;
      case 'laboratorio':
        return <GenericCRUD 
          entityName="Órdenes de Laboratorio" endpoint="/laboratorio/ordenes" primaryKey="id"
          description="Control de envío de prótesis o coronas a laboratorios dentales externos."
          columns={[
            {key: 'trabajo', label: 'Tipo de Trabajo Dental'}, 
            {key: 'pacienteId', label: 'Paciente Atendido'}, 
            {key: 'doctorId', label: 'Doctor Solicitante'}, 
            {key: 'laboratorio', label: 'Nombre del Laboratorio'}, 
            {key: 'costo', label: 'Costo S/.'}, 
            {key: 'estado', label: 'Estado de Entrega'}
          ]}
          formFields={[
            {name: 'trabajo', label: '🧪 Descripción del Trabajo Dental', type: 'select', options: ['Corona Monolítica de Zirconio Pieza 16', 'Corona de Porcelana sobre Metal', 'Incrustación de Disilicato de Litio (Inlay/Onlay)', 'Prótesis Parcial Removible Acrílica', 'Placa Miorelajante de Bruxismo Rígida', 'Carilla Estética de Porcelana', 'Puente Fijo de Zirconio (3 piezas)'], required: true},
            {name: 'pacienteId', label: 'Nombre del Paciente', type: 'select-paciente', required: true},
            {name: 'doctorId', label: 'Nombre del Doctor Solicitante', type: 'select-doctor', required: true},
            {name: 'laboratorio', label: '🏢 Nombre del Laboratorio Dental', type: 'select', options: ['Laboratorio Dental OrthoArt Lima', 'Laboratorio ProDent Miraflores', 'Laboratorio Estética Dental Surco', 'Laboratorio Maxilofacial San Isidro'], required: true},
            {name: 'fechaEnvio', label: '📅 Fecha de Envío al Laboratorio', type: 'date', required: true},
            {name: 'fechaEntrega', label: '📅 Fecha Probable de Entrega', type: 'date', required: true},
            {name: 'costo', label: '💰 Costo del Trabajo S/.', type: 'number', required: true},
            {name: 'estado', label: '📋 Estado de Entrega', type: 'select', options: ['ENVIADO', 'EN_PROCESO', 'RECIBIDO', 'RECHAZADO'], required: true}
          ]}
        />;
      case 'boletas':
        return <GenericCRUD 
          entityName="Boletas de Venta" endpoint="/boletas" primaryKey="numeroBoleta"
          description="Historial de comprobantes electrónicos emitidos a pacientes."
          columns={[
            {key: 'numeroBoleta', label: 'N° Boleta'}, 
            {key: 'pacienteId', label: 'Paciente Receptor'}, 
            {key: 'fechaEmision', label: 'Fecha Emisión'}, 
            {key: 'total', label: 'Monto Total S/.'}
          ]}
          formFields={[
            {name: 'pacienteId', label: 'Nombre del Paciente Receptor', type: 'select-paciente', required: true},
            {name: 'fechaEmision', label: '📅 Fecha y Hora de Emisión', type: 'datetime-local', required: true}, 
            {name: 'total', label: '💰 Monto Total S/.', type: 'number', required: true}
          ]}
        />;
      case 'consultas':
        return <Consultas />;
      default: return null;
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-0 d-flex font-sans" style={{ backgroundColor: '#0b1329', color: '#f8fafc' }}>
      {/* Sidebar Ultra Amigable */}
      <div className="d-flex flex-column flex-shrink-0 p-4 shadow-2xl border-end border-secondary" style={{ width: '320px', backgroundColor: '#131f37' }}>
        <a href="/" className="d-flex align-items-center mb-4 text-white text-decoration-none border-bottom border-secondary pb-3 gap-2">
          <div className="bg-primary p-2 rounded-3 text-white">
            <Stethoscope size={36} />
          </div>
          <div>
            <span className="fs-3 fw-black text-uppercase d-block lh-1" style={{ letterSpacing: '1px' }}>Tridentist</span>
            <span className="text-info fs-6 fw-bold">PANEL ADMINISTRATIVO</span>
          </div>
        </a>

        {/* Mensaje Amigable */}
        <div className="bg-slate-800 p-3 rounded-3 mb-3 border border-secondary text-info fs-6">
          👋 <strong>¡Hola!</strong> Seleccione abajo la opción que desea gestionar.
        </div>

        <ul className="nav nav-pills flex-column mb-auto gap-2 overflow-auto pr-1" style={{ maxHeight: 'calc(100vh - 240px)' }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <li className="nav-item" key={tab.id}>
                <button 
                  onClick={() => setActiveTab(tab.id)}
                  className={"nav-link fw-bold w-100 text-start d-flex align-items-center justify-content-between py-3 px-3 rounded-3 transition-all fs-6 " + (isActive ? 'active bg-primary text-white shadow-lg scale-102' : 'text-slate-300 bg-slate-800 hover-bg-slate-700')}
                  style={{ borderLeft: isActive ? '5px solid #38bdf8' : 'none' }}
                >
                  <span className="d-flex align-items-center gap-2">
                    {tab.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Perfil y Salida */}
        <div className="mt-auto border-top border-secondary pt-3">
          <div className="d-flex align-items-center justify-content-between text-white bg-slate-800 p-3 rounded-3">
            <div className="lh-1">
              <small className="text-info d-block fw-bold mb-1">Usuario Activo:</small>
              <strong className="fs-5 fw-bold text-white">{adminName}</strong>
            </div>
            <button onClick={handleLogout} className="btn btn-danger btn-md fw-bold d-flex align-items-center gap-1 px-3 py-2" title="Cerrar Sesión">
              <LogOut size={18} /> Salir
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4 p-md-5 overflow-auto">
        <div className="container-fluid max-w-1400">
          <div className="bg-slate-800 p-4 rounded-4 shadow-md mb-4 border border-secondary d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
            <div>
              <h1 className="text-white fw-black fs-2 m-0 d-flex align-items-center gap-3">
                {currentTabObj?.label}
              </h1>
              <p className="text-info fs-5 mb-0 mt-1 fw-medium">
                {currentTabObj?.desc}
              </p>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>

      {/* Modal Fullscreen para Odontograma */}
      {odontogramaPaciente && activeTab !== 'odontograma_tab' && (
        <div className="modal show d-block z-3" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}>
          <div className="modal-dialog modal-fullscreen p-2 p-md-4">
            <div className="modal-content bg-slate-950 border border-secondary shadow-2xl rounded-4 overflow-auto">
              <div className="modal-body p-0">
                <Odontograma 
                  pacienteId={odontogramaPaciente.id} 
                  pacienteNombre={odontogramaPaciente.nombre} 
                  onClose={() => setOdontogramaPaciente(null)} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

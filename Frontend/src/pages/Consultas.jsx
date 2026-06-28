import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Search, Calendar, FileText, Filter, RefreshCw, Download, UserCheck } from 'lucide-react';

const Consultas = () => {
  const [subTab, setSubTab] = useState('citas'); // 'citas' | 'boletas'

  // Citas State
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [doctores, setDoctores] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [citas, setCitas] = useState([]);
  const [loadingCitas, setLoadingCitas] = useState(false);
  const [citasSearchTerm, setCitasSearchTerm] = useState('');

  // Boletas State
  const [boletas, setBoletas] = useState([]);
  const [loadingBoletas, setLoadingBoletas] = useState(false);
  const [boletasSearchTerm, setBoletasSearchTerm] = useState('');

  useEffect(() => {
    fetchEspecialidades();
    fetchAllCitas();
    fetchAllBoletas();
  }, []);

  useEffect(() => {
    if (selectedEspecialidad) {
      fetchDoctores(selectedEspecialidad);
      setSelectedDoctor('');
    } else {
      setDoctores([]);
      setSelectedDoctor('');
      fetchAllCitas();
    }
  }, [selectedEspecialidad]);

  const fetchEspecialidades = async () => {
    try {
      const res = await api.get('/consultas/especialidades');
      if (Array.isArray(res.data)) setEspecialidades(res.data);
    } catch (err) {
      console.error('Error fetching especialidades', err);
    }
  };

  const fetchDoctores = async (esp) => {
    try {
      const res = await api.get(`/consultas/doctores?especialidad=${esp}`);
      if (Array.isArray(res.data)) setDoctores(res.data);
    } catch (err) {
      console.error('Error fetching doctores', err);
    }
  };

  const fetchAllCitas = async () => {
    setLoadingCitas(true);
    try {
      const res = await api.get('/consultas/citas');
      if (Array.isArray(res.data)) setCitas(res.data);
    } catch (err) {
      console.error('Error fetching all citas', err);
    } finally {
      setLoadingCitas(false);
    }
  };

  const fetchCitasByDoctor = async () => {
    if (!selectedDoctor) {
      fetchAllCitas();
      return;
    }
    setLoadingCitas(true);
    try {
      const res = await api.get(`/consultas/citas/doctor/${selectedDoctor}`);
      if (Array.isArray(res.data)) setCitas(res.data);
    } catch (err) {
      console.error('Error fetching citas by doctor', err);
    } finally {
      setLoadingCitas(false);
    }
  };

  const fetchAllBoletas = async () => {
    setLoadingBoletas(true);
    try {
      const res = await api.get('/boletas');
      if (Array.isArray(res.data)) setBoletas(res.data);
    } catch (err) {
      console.error('Error fetching boletas', err);
    } finally {
      setLoadingBoletas(false);
    }
  };

  const downloadPdf = async (id) => {
    try {
      const response = await api.get(`/boletas/${id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `boleta_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error downloading PDF', err);
      alert('Error al descargar el comprobante PDF.');
    }
  };

  // Filtrar Citas por término de búsqueda
  const filteredCitas = citas.filter(c => {
    if (!citasSearchTerm) return true;
    const term = citasSearchTerm.toLowerCase();
    return (
      (c.pacienteNombre && c.pacienteNombre.toLowerCase().includes(term)) ||
      (c.doctorNombre && c.doctorNombre.toLowerCase().includes(term)) ||
      (c.tratamientoDescripcion && c.tratamientoDescripcion.toLowerCase().includes(term)) ||
      (c.estado && c.estado.toLowerCase().includes(term))
    );
  });

  // Filtrar Boletas por término de búsqueda
  const filteredBoletas = boletas.filter(b => {
    if (!boletasSearchTerm) return true;
    const term = boletasSearchTerm.toLowerCase();
    const pacNombre = b.paciente ? `${b.paciente.nombres} ${b.paciente.apellidos} ${b.paciente.dni}` : '';
    return (
      String(b.numeroBoleta || b.id).includes(term) ||
      pacNombre.toLowerCase().includes(term) ||
      String(b.total).includes(term)
    );
  });

  return (
    <div className="container-fluid p-0">
      {/* Botones Principales de Navegación de Búsqueda */}
      <div className="d-flex gap-3 mb-4">
        <button 
          onClick={() => setSubTab('citas')}
          className={`btn btn-lg fw-bold px-4 py-3 rounded-3 fs-5 d-flex align-items-center gap-2 ${subTab === 'citas' ? 'btn-primary shadow-lg scale-102' : 'btn-outline-light'}`}
        >
          <Calendar size={24} /> 📅 Búsqueda Avanzada de Citas
        </button>
        <button 
          onClick={() => setSubTab('boletas')}
          className={`btn btn-lg fw-bold px-4 py-3 rounded-3 fs-5 d-flex align-items-center gap-2 ${subTab === 'boletas' ? 'btn-primary shadow-lg scale-102' : 'btn-outline-light'}`}
        >
          <FileText size={24} /> 🧾 Búsqueda Avanzada de Boletas de Venta
        </button>
      </div>

      {/* SECCIÓN 1: BÚSQUEDA DE CITAS */}
      {subTab === 'citas' && (
        <div className="card bg-dark text-white border-secondary shadow-lg rounded-4 overflow-hidden">
          <div className="card-header bg-slate-800 p-4 border-bottom border-secondary">
            <h3 className="text-warning fw-bold mb-1 d-flex align-items-center gap-2">
              <Search size={26} /> Consulta y Búsqueda de Citas Dentales
            </h3>
            <p className="text-light fs-6 mb-0">Filtre citas por Especialidad y Doctor, o busque por Nombre de Paciente o Tratamiento.</p>
          </div>

          <div className="card-body p-4 bg-slate-900 border-bottom border-secondary">
            {/* Filtro por Especialidad y Doctor */}
            <div className="row g-3 align-items-end mb-4 p-3 bg-slate-800 rounded-3 border border-secondary">
              <div className="col-md-4">
                <label className="form-label text-info fs-6 fw-bold">1. Filtrar por Especialidad</label>
                <select 
                  className="form-select form-select-lg bg-dark text-white border-secondary fs-5 p-3"
                  value={selectedEspecialidad}
                  onChange={(e) => setSelectedEspecialidad(e.target.value)}
                >
                  <option value="">-- Todas las Especialidades --</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label text-info fs-6 fw-bold">2. Seleccionar Médico Doctor</label>
                <select 
                  className="form-select form-select-lg bg-dark text-white border-secondary fs-5 p-3"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  disabled={!selectedEspecialidad || doctores.length === 0}
                >
                  <option value="">-- Todos los Doctores de esta especialidad --</option>
                  {doctores.map(doc => (
                    <option key={doc.codigo || doc.id} value={doc.codigo || doc.id}>
                      Dr. {doc.nombres} {doc.apellidos}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4 d-flex gap-2">
                <button 
                  className="btn btn-warning btn-lg w-100 fw-bold fs-5 py-3 text-dark d-flex align-items-center justify-content-center gap-2"
                  onClick={fetchCitasByDoctor}
                >
                  <Filter size={22} /> Filtrar Doctor
                </button>
                <button 
                  className="btn btn-outline-light btn-lg fw-bold px-3 py-3"
                  onClick={() => { setSelectedEspecialidad(''); setSelectedDoctor(''); setCitasSearchTerm(''); fetchAllCitas(); }}
                  title="Limpiar filtros"
                >
                  <RefreshCw size={22} />
                </button>
              </div>
            </div>

            {/* Buscador en tiempo real por Nombre / Palabra clave */}
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-secondary text-white border-0 px-3">
                <Search size={24} />
              </span>
              <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary fs-5 p-3" 
                placeholder="🔍 Escriba Nombre de Paciente, Doctor o motivo de consulta..."
                value={citasSearchTerm}
                onChange={(e) => setCitasSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tabla de Resultados de Citas */}
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0 align-middle">
                <thead className="table-active">
                  <tr>
                    <th className="p-4 text-primary fs-5 fw-bold bg-slate-900">N° Cita</th>
                    <th className="p-4 text-primary fs-5 fw-bold bg-slate-900">📅 Fecha y Hora</th>
                    <th className="p-4 text-primary fs-5 fw-bold bg-slate-900">👤 Paciente Atendido</th>
                    <th className="p-4 text-primary fs-5 fw-bold bg-slate-900">🩺 Médico Tratante</th>
                    <th className="p-4 text-primary fs-5 fw-bold bg-slate-900">🦷 Tratamiento / Motivo</th>
                    <th className="p-4 text-center text-primary fs-5 fw-bold bg-slate-900">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingCitas ? (
                    <tr>
                      <td colSpan="6" className="p-5 text-center text-secondary">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <h4 className="text-white fw-bold">Cargando citas...</h4>
                      </td>
                    </tr>
                  ) : filteredCitas.length > 0 ? (
                    filteredCitas.map(c => (
                      <tr key={c.idCita || c.id} className="border-secondary hover-bg-slate-800">
                        <td className="p-4 fw-bold text-light fs-5">#{c.idCita || c.id}</td>
                        <td className="p-4 text-warning fw-bold fs-5">
                          {c.fechaHora ? new Date(c.fechaHora).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
                        </td>
                        <td className="p-4 text-info fw-bold fs-5">👤 {c.pacienteNombre}</td>
                        <td className="p-4 text-light fw-semibold fs-5">{c.doctorNombre} <span className="badge bg-secondary ms-1 fs-6">{c.especialidad}</span></td>
                        <td className="p-4 text-light fs-5">🦷 {c.tratamientoDescripcion}</td>
                        <td className="p-4 text-center">
                          <span className={`badge ${c.estado === 'CONFIRMADA' || c.estado === 'ATENDIDA' ? 'bg-success text-white' : c.estado === 'PENDIENTE' ? 'bg-warning text-dark' : 'bg-danger text-white'} fs-6 px-3 py-2 rounded-pill fw-bold`}>
                            {c.estado}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-5 text-center text-secondary">
                        <h4 className="text-white fw-bold">No se encontraron citas médicas con los criterios especificados.</h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 2: BÚSQUEDA DE BOLETAS DE VENTA */}
      {subTab === 'boletas' && (
        <div className="card bg-dark text-white border-secondary shadow-lg rounded-4 overflow-hidden">
          <div className="card-header bg-slate-800 p-4 border-bottom border-secondary d-flex justify-content-between align-items-center">
            <div>
              <h3 className="text-warning fw-bold mb-1 d-flex align-items-center gap-2">
                <FileText size={26} /> Búsqueda Avanzada de Boletas de Venta
              </h3>
              <p className="text-light fs-6 mb-0">Busque comprobantes emitidos por número de boleta, nombre o DNI del paciente.</p>
            </div>
            <button onClick={fetchAllBoletas} className="btn btn-outline-light btn-lg fw-bold d-flex align-items-center gap-2 px-3 py-2">
              <RefreshCw size={20} /> Actualizar Boletas
            </button>
          </div>

          <div className="card-body p-4 bg-slate-900 border-bottom border-secondary">
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-secondary text-white border-0 px-3">
                <Search size={24} />
              </span>
              <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary fs-5 p-3" 
                placeholder="🔍 Escriba N° Boleta, Nombre de Paciente o DNI..."
                value={boletasSearchTerm}
                onChange={(e) => setBoletasSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0 align-middle">
                <thead className="table-active">
                  <tr>
                    <th className="p-4 text-primary fs-5 fw-bold bg-slate-900">N° Boleta</th>
                    <th className="p-4 text-primary fs-5 fw-bold bg-slate-900">👤 Paciente Receptor</th>
                    <th className="p-4 text-primary fs-5 fw-bold bg-slate-900">📅 Fecha de Emisión</th>
                    <th className="p-4 text-primary fs-5 fw-bold bg-slate-900">💰 Monto Total S/.</th>
                    <th className="p-4 text-center text-primary fs-5 fw-bold bg-slate-900">Comprobante PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingBoletas ? (
                    <tr>
                      <td colSpan="5" className="p-5 text-center text-secondary">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <h4 className="text-white fw-bold">Cargando boletas de venta...</h4>
                      </td>
                    </tr>
                  ) : filteredBoletas.length > 0 ? (
                    filteredBoletas.map(b => (
                      <tr key={b.numeroBoleta || b.id} className="border-secondary hover-bg-slate-800">
                        <td className="p-4 fw-bold text-warning fs-4">N° {String(b.numeroBoleta || b.id).padStart(6, '0')}</td>
                        <td className="p-4 text-info fw-bold fs-5">
                          👤 {b.paciente ? `${b.paciente.nombres} ${b.paciente.apellidos} (DNI: ${b.paciente.dni})` : `Paciente #${b.pacienteId}`}
                        </td>
                        <td className="p-4 text-light fs-5">
                          {b.fechaEmision ? new Date(b.fechaEmision).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
                        </td>
                        <td className="p-4 text-success fw-bold fs-4">S/. {Number(b.total).toFixed(2)}</td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => downloadPdf(b.numeroBoleta || b.id)} 
                            className="btn btn-info btn-lg fw-bold shadow d-flex align-items-center justify-content-center gap-2 mx-auto px-4 py-2"
                          >
                            <Download size={20} /> Descargar PDF
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-5 text-center text-secondary">
                        <h4 className="text-white fw-bold">No se encontraron boletas de venta registradas.</h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consultas;

import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Search } from 'lucide-react';

const Consultas = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [selectedEspecialidad, setSelectedEspecialidad] = useState('');
  const [doctores, setDoctores] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  useEffect(() => {
    if (selectedEspecialidad) {
      fetchDoctores(selectedEspecialidad);
      setSelectedDoctor('');
      setCitas([]);
    } else {
      setDoctores([]);
      setSelectedDoctor('');
      setCitas([]);
    }
  }, [selectedEspecialidad]);

  const fetchEspecialidades = async () => {
    try {
      const res = await api.get('/consultas/especialidades');
      setEspecialidades(res.data);
    } catch (err) {
      console.error('Error fetching especialidades', err);
    }
  };

  const fetchDoctores = async (esp) => {
    try {
      const res = await api.get(`/consultas/doctores?especialidad=${esp}`);
      setDoctores(res.data);
    } catch (err) {
      console.error('Error fetching doctores', err);
    }
  };

  const fetchCitas = async () => {
    if (!selectedDoctor) return;
    setLoading(true);
    try {
      const res = await api.get(`/consultas/citas/doctor/${selectedDoctor}`);
      setCitas(res.data);
    } catch (err) {
      console.error('Error fetching citas', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="card bg-dark text-white border-secondary mb-4">
        <div className="card-header border-secondary d-flex align-items-center gap-2">
          <Search size={20} />
          <h4 className="mb-0 text-uppercase">Consulta de Citas por Doctor (DTO)</h4>
        </div>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label text-secondary fw-bold text-uppercase small">Especialidad</label>
              <select 
                className="form-select bg-dark text-white border-secondary"
                value={selectedEspecialidad}
                onChange={(e) => setSelectedEspecialidad(e.target.value)}
              >
                <option value="">-- Seleccione Especialidad --</option>
                {especialidades.map(esp => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label text-secondary fw-bold text-uppercase small">Doctor</label>
              <select 
                className="form-select bg-dark text-white border-secondary"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                disabled={!selectedEspecialidad || doctores.length === 0}
              >
                <option value="">-- Seleccione Doctor --</option>
                {doctores.map(doc => (
                  <option key={doc.codigo} value={doc.codigo}>{doc.nombres} {doc.apellidos}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <button 
                className="btn btn-primary w-100 text-uppercase fw-bold"
                onClick={fetchCitas}
                disabled={!selectedDoctor || loading}
              >
                {loading ? 'Buscando...' : 'Buscar Citas'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {citas.length > 0 && (
        <div className="card bg-dark text-white border-secondary">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-dark table-hover table-striped mb-0">
                <thead>
                  <tr className="text-uppercase small">
                    <th>ID Cita</th>
                    <th>Fecha y Hora</th>
                    <th>Paciente</th>
                    <th>Tratamiento</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map(cita => (
                    <tr key={cita.idCita}>
                      <td>{cita.idCita}</td>
                      <td>{new Date(cita.fechaHora).toLocaleString()}</td>
                      <td>{cita.pacienteNombre}</td>
                      <td>{cita.tratamientoDescripcion}</td>
                      <td>
                        <span className={`badge ${cita.estado === 'Pendiente' ? 'bg-warning text-dark' : 'bg-success'}`}>
                          {cita.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedDoctor && citas.length === 0 && !loading && (
        <div className="alert alert-secondary bg-dark text-secondary border-secondary text-center">
          No se encontraron citas para el doctor seleccionado.
        </div>
      )}
    </div>
  );
};

export default Consultas;

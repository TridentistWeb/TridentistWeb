import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Trash2, Edit, Plus, FileText, AlertCircle, CheckCircle2, Search, HelpCircle, RefreshCw } from 'lucide-react';

const GenericCRUD = ({ entityName, endpoint, columns, formFields, primaryKey, description }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Listas auxiliares para autocompletado y mapeo de IDs a Nombres
  const [pacientesMap, setPacientesMap] = useState({});
  const [doctoresMap, setDoctoresMap] = useState({});
  const [tratamientosMap, setTratamientosMap] = useState({});
  const [pacientesList, setPacientesList] = useState([]);
  const [doctoresList, setDoctoresList] = useState([]);
  const [tratamientosList, setTratamientosList] = useState([]);

  useEffect(() => {
    fetchData();
    fetchAuxiliaryLists();
  }, [endpoint]);

  const fetchAuxiliaryLists = async () => {
    try {
      const [pRes, dRes, tRes] = await Promise.allSettled([
        api.get('/pacientes'),
        api.get('/doctors'),
        api.get('/tratamientos')
      ]);

      if (pRes.status === 'fulfilled' && Array.isArray(pRes.value.data)) {
        setPacientesList(pRes.value.data);
        const pMap = {};
        pRes.value.data.forEach(p => {
          pMap[p.codigo || p.id] = `${p.nombres} ${p.apellidos} (DNI: ${p.dni})`;
        });
        setPacientesMap(pMap);
      }

      if (dRes.status === 'fulfilled' && Array.isArray(dRes.value.data)) {
        setDoctoresList(dRes.value.data);
        const dMap = {};
        dRes.value.data.forEach(d => {
          dMap[d.codigo || d.id] = `Dr. ${d.nombres} ${d.apellidos} (${d.especialidad})`;
        });
        setDoctoresMap(dMap);
      }

      if (tRes.status === 'fulfilled' && Array.isArray(tRes.value.data)) {
        setTratamientosList(tRes.value.data);
        const tMap = {};
        tRes.value.data.forEach(t => {
          tMap[t.idTratamiento || t.id] = `${t.descripcion} (S/. ${t.precio})`;
        });
        setTratamientosMap(tMap);
      }
    } catch (err) {
      console.error('Error fetching auxiliary data for lookup', err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setNotification(null);
    try {
      const res = await api.get(endpoint);
      if (Array.isArray(res.data)) {
        setData(res.data);
      } else if (res.data && typeof res.data === 'object') {
        setData([res.data]);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error('Error fetching data', err);
      showNotification('danger', '⚠️ Ocurrió un problema al cargar los registros. Asegúrese de que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 6000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(endpoint + '/' + formData[primaryKey], formData);
        showNotification('success', '✅ ¡Registro actualizado con éxito!');
      } else {
        await api.post(endpoint, formData);
        showNotification('success', '🎉 ¡Nuevo registro guardado correctamente!');
      }
      fetchData();
      setShowModal(false);
    } catch (err) {
      console.error('Error saving data', err);
      showNotification('danger', '❌ Error al guardar. Por favor revise que todos los campos requeridos estén llenos.');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('¿Está seguro de que desea eliminar este registro? Esta acción no se puede deshacer.')) {
      try {
        await api.delete(endpoint + '/' + id);
        showNotification('success', '🗑️ Registro eliminado correctamente.');
        fetchData();
      } catch (err) {
        console.error('Error deleting', err);
        showNotification('danger', '❌ No se pudo eliminar el registro.');
      }
    }
  };

  const openAddModal = () => {
    const defaultData = {};
    const todayStr = new Date().toISOString().split('T')[0];
    const nowLocalStr = new Date().toISOString().slice(0, 16);

    formFields.forEach(f => {
      if (f.type === 'date') defaultData[f.name] = todayStr;
      if (f.type === 'datetime-local') defaultData[f.name] = nowLocalStr;
    });

    setFormData(defaultData);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    const formattedItem = { ...item };
    formFields.forEach(f => {
      if (formattedItem[f.name]) {
        if (f.type === 'date' && String(formattedItem[f.name]).includes('T')) {
          formattedItem[f.name] = String(formattedItem[f.name]).split('T')[0];
        }
        if (f.type === 'datetime-local' && String(formattedItem[f.name]).length > 16) {
          formattedItem[f.name] = String(formattedItem[f.name]).slice(0, 16);
        }
      }
    });

    setFormData(formattedItem);
    setIsEditing(true);
    setShowModal(true);
  };

  const downloadPdf = async (id) => {
    try {
      const response = await api.get(endpoint + '/' + id + '/pdf', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'boleta_' + id + '.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Error downloading PDF', err);
      showNotification('danger', 'Error al descargar el archivo PDF.');
    }
  };

  // Mapear IDs a Nombres en la visualización de celdas
  const renderCellValue = (val, key, item) => {
    if (val === null || val === undefined) return <span className="text-secondary fs-6">N/A</span>;
    
    // Mapeo de Paciente
    if (['pacienteId', 'codigoPaciente', 'paciente'].includes(key)) {
      const pId = typeof val === 'object' ? (val.codigo || val.id) : val;
      if (pacientesMap[pId]) {
        return <span className="fw-bold text-info fs-5">👤 {pacientesMap[pId]}</span>;
      }
      if (typeof val === 'object' && val.nombres) {
        return <span className="fw-bold text-info fs-5">👤 {val.nombres} {val.apellidos}</span>;
      }
    }

    // Mapeo de Doctor
    if (['doctorId', 'codigoDoctor', 'doctor'].includes(key)) {
      const dId = typeof val === 'object' ? (val.codigo || val.id) : val;
      if (doctoresMap[dId]) {
        return <span className="fw-bold text-warning fs-5">🩺 {doctoresMap[dId]}</span>;
      }
    }

    // Mapeo de Tratamiento
    if (['idTratamiento', 'tratamiento'].includes(key)) {
      const tId = typeof val === 'object' ? (val.idTratamiento || val.id) : val;
      if (tratamientosMap[tId]) {
        return <span className="fw-bold text-light fs-5">🦷 {tratamientosMap[tId]}</span>;
      }
    }

    if (key === 'estado' || key === 'tipo') {
      const strVal = String(val).toUpperCase();
      let badgeClass = 'bg-secondary';
      if (['CONFIRMADA', 'INGRESO', 'ENTRADA', 'RECIBIDO', 'APROBADO', 'ATENDIDA'].includes(strVal)) badgeClass = 'bg-success text-white';
      if (['PENDIENTE', 'EN_PROCESO', 'ENVIADO'].includes(strVal)) badgeClass = 'bg-warning text-dark';
      if (['CANCELADA', 'EGRESO', 'SALIDA', 'RECHAZADO'].includes(strVal)) badgeClass = 'bg-danger text-white';
      return <span className={`badge ${badgeClass} fs-6 px-3 py-2 rounded-pill fw-bold`}>{strVal}</span>;
    }
    if (typeof val === 'object') return JSON.stringify(val);
    return <span className="fs-5 text-light">{String(val)}</span>;
  };

  // Buscador por nombre, apellido, DNI o cualquier campo
  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    
    const directMatch = Object.values(item).some(val => 
      String(val).toLowerCase().includes(term)
    );
    if (directMatch) return true;

    const pId = item.pacienteId || item.codigoPaciente;
    if (pId && pacientesMap[pId] && pacientesMap[pId].toLowerCase().includes(term)) return true;

    const dId = item.doctorId || item.codigoDoctor;
    if (dId && doctoresMap[dId] && doctoresMap[dId].toLowerCase().includes(term)) return true;

    return false;
  });

  return (
    <div className="card shadow-lg bg-dark text-white border-0 rounded-4 overflow-hidden">
      {/* Encabezado Amigable y Gigante */}
      <div className="card-header bg-gradient bg-slate-800 p-4 border-bottom border-secondary d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="mb-1 fs-3 fw-bold text-primary d-flex align-items-center gap-2">
            Gestión de {entityName}
          </h2>
          <p className="text-secondary mb-0 fs-6 d-flex align-items-center gap-1">
            <HelpCircle size={16} className="text-info" /> {description || 'Utilice este panel para consultar, agregar o modificar información de forma sencilla.'}
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button onClick={fetchData} className="btn btn-outline-light btn-lg d-flex align-items-center gap-2 fw-bold rounded-3 py-2 px-3" title="Actualizar lista">
            <RefreshCw size={20} /> <span className="d-none d-sm-inline">Actualizar</span>
          </button>
          <button onClick={openAddModal} className="btn btn-success btn-lg d-flex align-items-center gap-2 fw-bold shadow-lg rounded-3 py-3 px-4 fs-5">
            <Plus size={26} /> ➕ Registrar Nuevo
          </button>
        </div>
      </div>

      {/* Barra de Búsqueda Grande por Nombre / Apellido */}
      <div className="p-4 bg-slate-900 border-bottom border-secondary">
        <div className="row g-3 align-items-center">
          <div className="col-md-8 col-lg-6">
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-secondary text-white border-0 px-3">
                <Search size={22} />
              </span>
              <input 
                type="text" 
                className="form-control bg-dark text-white border-secondary fs-5 p-3" 
                placeholder={`🔍 Buscar por Nombre, Apellido, DNI o palabra clave...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 col-lg-6 text-md-end text-secondary fs-6 fw-semibold">
            Mostrando <span className="badge bg-primary fs-6 px-3 py-2">{filteredData.length}</span> registros
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      {notification && (
        <div className={`alert alert-${notification.type} m-4 fs-5 p-3 d-flex align-items-center gap-3 shadow rounded-3`} role="alert">
          {notification.type === 'success' ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
          <div className="fw-bold">{notification.message}</div>
        </div>
      )}

      {/* Tabla Clara y Espaciosa */}
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead className="table-active">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="p-4 text-primary fs-5 fw-bold border-secondary bg-slate-900">
                    {col.label}
                  </th>
                ))}
                <th className="p-4 text-center text-primary fs-5 fw-bold border-secondary bg-slate-900" style={{ width: '220px' }}>
                  Acciones Rápidas
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="p-5 text-center text-secondary border-0">
                    <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                    <h4 className="fw-bold text-white">Cargando la información...</h4>
                    <p className="fs-6 mb-0">Por favor espere unos segundos.</p>
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map(item => (
                  <tr key={item[primaryKey]} className="border-secondary hover-bg-slate-800">
                    {columns.map(col => (
                      <td key={col.key} className="p-4 border-secondary">
                        {renderCellValue(item[col.key], col.key, item)}
                      </td>
                    ))}
                    <td className="p-4 text-center border-secondary">
                      <div className="d-flex justify-content-center gap-2">
                        {entityName === 'Boletas' && (
                          <button onClick={() => downloadPdf(item[primaryKey])} className="btn btn-info btn-md d-flex align-items-center gap-1 fw-bold px-3 py-2" title="Descargar PDF">
                            <FileText size={18} /> PDF
                          </button>
                        )}
                        <button onClick={() => openEditModal(item)} className="btn btn-warning btn-md d-flex align-items-center gap-1 fw-bold px-3 py-2 text-dark" title="Editar">
                          <Edit size={18} /> Editar
                        </button>
                        <button onClick={() => handleDelete(item[primaryKey])} className="btn btn-danger btn-md d-flex align-items-center gap-1 fw-bold px-3 py-2" title="Eliminar">
                          <Trash2 size={18} /> Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="p-5 text-center text-secondary border-0">
                    <AlertCircle size={50} className="mb-3 text-warning opacity-75" />
                    <h4 className="text-white fw-bold">No hay registros guardados en {entityName}.</h4>
                    <p className="fs-5 mb-3">Haga clic en el botón verde de arriba para agregar uno nuevo.</p>
                    <button onClick={openAddModal} className="btn btn-success btn-lg fw-bold px-4 py-2">
                      ➕ Crear el Primer Registro
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL CON SELECCIÓN DE FECHAS CON CALENDARIO Y OPCIONES PREDETERMINADAS */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content text-white border border-secondary shadow-2xl rounded-4 overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
              <div className="modal-header bg-primary text-white p-4">
                <h3 className="modal-title fw-bold d-flex align-items-center gap-2 mb-0">
                  {isEditing ? <Edit size={28} /> : <Plus size={28} />}
                  {isEditing ? `Modificar Registro en ${entityName}` : `Agregar Nuevo en ${entityName}`}
                </h3>
                <button type="button" className="btn-close btn-close-white fs-4" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body p-4 p-md-5" style={{ backgroundColor: '#0f172a' }}>
                <div className="alert alert-info fs-6 mb-4 d-flex align-items-center gap-2" style={{ backgroundColor: '#1e293b', color: '#38bdf8', borderColor: '#0284c7' }}>
                  <HelpCircle size={22} className="flex-shrink-0" /> Seleccione las opciones o use el calendario desplegable. Todo está diseñado para ahorrar tiempo.
                </div>
                <form onSubmit={handleSubmit} className="row g-4">
                  {formFields.map(field => {
                    const isPacienteSelect = ['select-paciente', 'pacienteId', 'codigoPaciente'].includes(field.type) || ['pacienteId', 'codigoPaciente'].includes(field.name);
                    const isDoctorSelect = ['select-doctor', 'doctorId', 'codigoDoctor'].includes(field.type) || ['doctorId', 'codigoDoctor'].includes(field.name);
                    const isTratamientoSelect = ['select-tratamiento', 'idTratamiento'].includes(field.type) || field.name === 'idTratamiento';
                    const isSelectOptions = field.type === 'select' || (Array.isArray(field.options) && field.options.length > 0);
                    const isDateField = field.type === 'date' || field.type === 'datetime-local';

                    return (
                      <div className="col-md-6" key={field.name}>
                        {/* ETIQUETA CON CONTRASTE AMARILLO VÍVIDO */}
                        <label className="form-label fs-5 fw-bold mb-2 text-warning" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                          {field.label} {field.required && <span className="text-danger">*</span>}
                        </label>

                        {/* RENDERIZADO SEGÚN EL TIPO DE CAMPO */}
                        {isPacienteSelect ? (
                          <select
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            className="form-select form-select-lg text-white border-warning fs-5 p-3 fw-semibold"
                            style={{ backgroundColor: '#1e293b' }}
                            required={field.required}
                          >
                            <option value="">-- Seleccione un Paciente por Nombre --</option>
                            {pacientesList.map(p => (
                              <option key={p.codigo || p.id} value={p.codigo || p.id}>
                                👤 {p.nombres} {p.apellidos} (DNI: {p.dni})
                              </option>
                            ))}
                          </select>
                        ) : isDoctorSelect ? (
                          <select
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            className="form-select form-select-lg text-white border-warning fs-5 p-3 fw-semibold"
                            style={{ backgroundColor: '#1e293b' }}
                            required={field.required}
                          >
                            <option value="">-- Seleccione un Doctor por Nombre --</option>
                            {doctoresList.map(d => (
                              <option key={d.codigo || d.id} value={d.codigo || d.id}>
                                🩺 Dr. {d.nombres} {d.apellidos} ({d.especialidad})
                              </option>
                            ))}
                          </select>
                        ) : isTratamientoSelect ? (
                          <select
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            className="form-select form-select-lg text-white border-warning fs-5 p-3 fw-semibold"
                            style={{ backgroundColor: '#1e293b' }}
                            required={field.required}
                          >
                            <option value="">-- Seleccione el Tratamiento Dental --</option>
                            {tratamientosList.map(t => (
                              <option key={t.idTratamiento || t.id} value={t.idTratamiento || t.id}>
                                🦷 {t.descripcion} (Precio: S/. {t.precio})
                              </option>
                            ))}
                          </select>
                        ) : isSelectOptions ? (
                          <select
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            className="form-select form-select-lg text-white border-info fs-5 p-3 fw-semibold"
                            style={{ backgroundColor: '#1e293b' }}
                            required={field.required}
                          >
                            <option value="">-- Seleccione una Opción Predeterminada --</option>
                            {field.options.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : isDateField ? (
                          <input 
                            type={field.type} 
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            className="form-control form-control-lg text-white border-info fs-5 p-3 fw-bold"
                            style={{ backgroundColor: '#1e293b', colorScheme: 'dark' }}
                            required={field.required}
                          />
                        ) : (
                          <input 
                            type={field.type || 'text'} 
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            className="form-control form-control-lg text-white border-secondary fs-5 p-3 fw-medium"
                            style={{ backgroundColor: '#1e293b' }}
                            required={field.required}
                            placeholder={field.placeholder || `Escriba ${field.label.toLowerCase()}`}
                          />
                        )}
                      </div>
                    );
                  })}
                  <div className="col-12 mt-5 pt-4 border-top border-secondary d-flex justify-content-end gap-3">
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline-light btn-lg fw-bold px-4 py-3 fs-5">
                      ❌ Cancelar
                    </button>
                    <button type="submit" className="btn btn-success btn-lg fw-bold px-5 py-3 fs-5 d-flex align-items-center gap-2 shadow-lg">
                      <CheckCircle2 size={24} /> {isEditing ? '💾 Guardar Cambios' : '✅ Guardar Registro'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericCRUD;

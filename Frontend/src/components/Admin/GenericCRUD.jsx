import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Trash2, Edit, Plus, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

const GenericCRUD = ({ entityName, endpoint, columns, formFields, primaryKey }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const fetchData = async () => {
    setLoading(true);
    setNotification(null);
    try {
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching data', err);
      setNotification({ type: 'danger', message: 'Error al cargar los datos.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(endpoint + '/' + formData[primaryKey], formData);
        showNotification('success', 'Registro actualizado correctamente.');
      } else {
        await api.post(endpoint, formData);
        showNotification('success', 'Registro creado exitosamente.');
      }
      fetchData();
      setShowModal(false);
    } catch (err) {
      console.error('Error saving data', err);
      showNotification('danger', 'Error al guardar el registro. Verifique los datos.');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('¿Está seguro de que desea eliminar este registro de forma permanente?')) {
      try {
        await api.delete(endpoint + '/' + id);
        showNotification('success', 'Registro eliminado correctamente.');
        fetchData();
      } catch (err) {
        console.error('Error deleting', err);
        showNotification('danger', 'Error al eliminar el registro.');
      }
    }
  };

  const openAddModal = () => {
    setFormData({});
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setFormData(item);
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
      showNotification('danger', 'Error al descargar el PDF.');
    }
  };

  return (
    <div className="card shadow-lg bg-dark text-white border-0" style={{ borderRadius: '12px' }}>
      <div className="card-header bg-dark border-secondary d-flex justify-content-between align-items-center p-4">
        <h3 className="mb-0 fs-4 fw-semibold text-primary">Gestión de {entityName}</h3>
        <button onClick={openAddModal} className="btn btn-primary d-flex align-items-center gap-2 fw-semibold shadow-sm">
          <Plus size={18} /> Añadir Nuevo
        </button>
      </div>

      {notification && (
        <div className={"alert alert-" + notification.type + " m-3 d-flex align-items-center gap-2"} role="alert">
          {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          {notification.message}
        </div>
      )}

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead className="table-active">
              <tr>
                {columns.map(col => <th key={col.key} className="p-3 text-secondary fw-semibold border-secondary">{col.label}</th>)}
                <th className="p-3 text-end text-secondary fw-semibold border-secondary">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="p-5 text-center text-secondary border-0">
                    <div className="spinner-border text-primary mb-3" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                    <p className="mb-0 fw-medium">Cargando datos...</p>
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map(item => (
                  <tr key={item[primaryKey]} className="border-secondary">
                    {columns.map(col => <td key={col.key} className="p-3 border-secondary">{item[col.key]}</td>)}
                    <td className="p-3 text-end border-secondary">
                      <div className="d-flex justify-content-end gap-2">
                        {entityName === 'Boletas' && (
                          <button onClick={() => downloadPdf(item[primaryKey])} className="btn btn-outline-info btn-sm d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} title="Descargar PDF">
                            <FileText size={16} />
                          </button>
                        )}
                        <button onClick={() => openEditModal(item)} className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} title="Editar">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(item[primaryKey])} className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }} title="Eliminar">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="p-5 text-center text-secondary border-0">
                    <AlertCircle size={40} className="mb-3 opacity-50" />
                    <p className="mb-0 fs-5">No se encontraron registros de {entityName}.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark text-white border-0 shadow-lg" style={{ borderRadius: '12px' }}>
              <div className="modal-header border-secondary p-4">
                <h5 className="modal-title fw-bold text-primary d-flex align-items-center gap-2">
                  {isEditing ? <Edit size={20} /> : <Plus size={20} />}
                  {isEditing ? 'Editar' : 'Añadir Nuevo'}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit} className="row g-3">
                  {formFields.map(field => (
                    <div className="col-md-6" key={field.name}>
                      <label className="form-label fw-semibold text-secondary">{field.label}</label>
                      <input 
                        type={field.type || 'text'} 
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className="form-control bg-dark text-white border-secondary"
                        required={field.required}
                        placeholder={"Ingrese " + field.label.toLowerCase()}
                      />
                    </div>
                  ))}
                  <div className="col-12 mt-4 pt-3 border-top border-secondary d-flex justify-content-end gap-3">
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline-light fw-semibold px-4">
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary fw-semibold px-4 d-flex align-items-center gap-2">
                      <CheckCircle2 size={18} /> {isEditing ? 'Guardar Cambios' : 'Registrar'}
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

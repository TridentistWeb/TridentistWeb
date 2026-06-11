import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { Trash2, Edit, Plus, FileText } from 'lucide-react';

const GenericCRUD = ({ entityName, endpoint, columns, formFields, primaryKey }) => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(endpoint + '/' + formData[primaryKey], formData);
      } else {
        await api.post(endpoint, formData);
      }
      fetchData();
      setShowModal(false);
    } catch (err) {
      console.error('Error saving data', err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('¿Eliminar registro?')) {
      try {
        await api.delete(endpoint + '/' + id);
        fetchData();
      } catch (err) {
        console.error('Error deleting', err);
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
    }
  };

  return (
    <div className="card bg-dark text-white border-secondary">
      <div className="card-header border-secondary d-flex justify-content-between align-items-center p-3">
        <h3 className="mb-0 fs-4 fw-bold text-uppercase">Gestión de {entityName}</h3>
        <button onClick={openAddModal} className="btn btn-primary d-flex align-items-center gap-2 fw-bold text-uppercase btn-sm">
          <Plus size={16} /> Nuevo
        </button>
      </div>

      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-dark table-hover table-striped mb-0">
            <thead>
              <tr className="text-uppercase small">
                {columns.map(col => <th key={col.key} className="p-3">{col.label}</th>)}
                <th className="p-3 text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item[primaryKey]}>
                  {columns.map(col => <td key={col.key} className="p-3 align-middle">{item[col.key]}</td>)}
                  <td className="p-3 text-end align-middle">
                    {entityName === 'Boletas' && (
                      <button onClick={() => downloadPdf(item[primaryKey])} className="btn btn-outline-info btn-sm me-2" title="Descargar PDF"><FileText size={16} /></button>
                    )}
                    <button onClick={() => openEditModal(item)} className="btn btn-outline-warning btn-sm me-2" title="Editar"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(item[primaryKey])} className="btn btn-outline-danger btn-sm" title="Eliminar"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr><td colSpan={columns.length + 1} className="p-4 text-center text-secondary">No hay registros</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-secondary text-white">
              <div className="modal-header border-secondary">
                <h5 className="modal-title fw-bold text-uppercase">{isEditing ? 'Editar' : 'Nuevo'} {entityName}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  {formFields.map(field => (
                    <div className="mb-3" key={field.name}>
                      <label className="form-label fw-bold text-uppercase small text-secondary">{field.label}</label>
                      <input 
                        type={field.type || 'text'} 
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className="form-control bg-dark text-white border-secondary"
                        required={field.required}
                      />
                    </div>
                  ))}
                  <div className="d-flex justify-content-end gap-2 mt-4">
                    <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline-secondary fw-bold text-uppercase">Cancelar</button>
                    <button type="submit" className="btn btn-primary fw-bold text-uppercase">Guardar</button>
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

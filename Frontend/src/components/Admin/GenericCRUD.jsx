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
    <div className="bg-light-gray rounded-xl p-6 border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Gestión de {entityName}</h3>
        <button onClick={openAddModal} className="bg-dental-blue hover:bg-dental-blue-light text-white px-4 py-2 rounded flex items-center gap-2 font-bold uppercase text-sm">
          <Plus size={16} /> Nuevo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-gray-400 uppercase text-xs tracking-wider border-b border-gray-800">
              {columns.map(col => <th key={col.key} className="p-4">{col.label}</th>)}
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item[primaryKey]} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                {columns.map(col => <td key={col.key} className="p-4 text-gray-300">{item[col.key]}</td>)}
                <td className="p-4 flex justify-end gap-3">
                  {entityName === 'Boletas' && (
                    <button onClick={() => downloadPdf(item[primaryKey])} className="text-blue-400 hover:text-blue-300"><FileText size={18} /></button>
                  )}
                  <button onClick={() => openEditModal(item)} className="text-yellow-500 hover:text-yellow-400"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(item[primaryKey])} className="text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="p-8 text-center text-gray-500">No hay registros</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-gray border border-gray-700 p-8 rounded-xl w-full max-w-lg">
            <h3 className="text-2xl font-bold text-white mb-6 uppercase">{isEditing ? 'Editar' : 'Nuevo'} {entityName}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {formFields.map(field => (
                <div key={field.name}>
                  <label className="block text-gray-400 text-xs font-bold mb-1 uppercase">{field.label}</label>
                  <input 
                    type={field.type || 'text'} 
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:outline-none focus:border-dental-blue"
                    required={field.required}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white uppercase font-bold text-sm">Cancelar</button>
                <button type="submit" className="bg-dental-blue text-white px-6 py-2 rounded uppercase font-bold text-sm hover:bg-dental-blue-light">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericCRUD;

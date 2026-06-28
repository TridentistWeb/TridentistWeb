import api from '../api/axiosConfig';

export const getOdontogramaByPaciente = async (pacienteId) => {
  const response = await api.get(`/odontograma/${pacienteId}`);
  return response.data;
};

export const guardarOdontograma = async (pacienteId, registros, isPediatric) => {
  const response = await api.post(`/odontograma/${pacienteId}`, {
    pacienteId,
    isPediatric,
    registros
  });
  return response.data;
};

export const getHistorialByPaciente = async (pacienteId) => {
  const response = await api.get(`/odontograma/${pacienteId}/historial`);
  return response.data;
};

export const limpiarOdontograma = async (pacienteId) => {
  const response = await api.delete(`/odontograma/${pacienteId}`);
  return response.data;
};

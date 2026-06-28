import { useState, useEffect, useCallback } from 'react';
import { getOdontogramaByPaciente, guardarOdontograma, limpiarOdontograma as apiLimpiar } from '../services/odontogramaService';

export const TOOTH_NAMES = {
  // Adultos cuadrante 1
  18: "Tercer molar sup. der.", 17: "Segundo molar sup. der.", 16: "Primer molar sup. der.",
  15: "Segundo premolar sup. der.", 14: "Primer premolar sup. der.", 13: "Canino sup. der.",
  12: "Incisivo lateral sup. der.", 11: "Incisivo central sup. der.",
  // Adultos cuadrante 2
  21: "Incisivo central sup. izq.", 22: "Incisivo lateral sup. izq.", 23: "Canino sup. izq.",
  24: "Primer premolar sup. izq.", 25: "Segundo premolar sup. izq.", 26: "Primer molar sup. izq.",
  27: "Segundo molar sup. izq.", 28: "Tercer molar sup. izq.",
  // Adultos cuadrante 3
  31: "Incisivo central inf. izq.", 32: "Incisivo lateral inf. izq.", 33: "Canino inf. izq.",
  34: "Primer premolar inf. izq.", 35: "Segundo premolar inf. izq.", 36: "Primer molar inf. izq.",
  37: "Segundo molar inf. izq.", 38: "Tercer molar inf. izq.",
  // Adultos cuadrante 4
  41: "Incisivo central inf. der.", 42: "Incisivo lateral inf. der.", 43: "Canino inf. der.",
  44: "Primer premolar inf. der.", 45: "Segundo premolar inf. der.", 46: "Primer molar inf. der.",
  47: "Segundo molar inf. der.", 48: "Tercer molar inf. der.",

  // Pediátricos 51-55
  55: "Segundo molar primario sup. der.", 54: "Primer molar primario sup. der.", 53: "Canino primario sup. der.", 52: "Incisivo lat. primario sup. der.", 51: "Incisivo cent. primario sup. der.",
  // Pediátricos 61-65
  61: "Incisivo cent. primario sup. izq.", 62: "Incisivo lat. primario sup. izq.", 63: "Canino primario sup. izq.", 64: "Primer molar primario sup. izq.", 65: "Segundo molar primario sup. izq.",
  // Pediátricos 71-75
  71: "Incisivo cent. primario inf. izq.", 72: "Incisivo lat. primario inf. izq.", 73: "Canino primario inf. izq.", 74: "Primer molar primario inf. izq.", 75: "Segundo molar primario inf. izq.",
  // Pediátricos 81-85
  81: "Incisivo cent. primario inf. der.", 82: "Incisivo lat. primario inf. der.", 83: "Canino primario inf. der.", 84: "Primer molar primario inf. der.", 85: "Segundo molar primario inf. der."
};

export const CONDITIONS = [
  { id: 'sano', label: 'Sano', color: '#FFFFFF', bg: 'bg-white text-dark', symbol: '✓' },
  { id: 'caries', label: 'Caries', color: '#EF4444', bg: 'bg-danger text-white', symbol: 'C' },
  { id: 'obturacion', label: 'Obturación', color: '#3B82F6', bg: 'bg-primary text-white', symbol: 'O' },
  { id: 'corona', label: 'Corona', color: '#EF9F27', bg: 'bg-warning text-dark', symbol: 'Cr' },
  { id: 'extraccion_indicada', label: 'Extracción indicada', color: '#F97316', bg: 'bg-orange text-white', symbol: 'X' },
  { id: 'ausente', label: 'Ausente / Extraído', color: '#6B7280', bg: 'bg-secondary text-white', symbol: 'A' },
  { id: 'fractura', label: 'Fractura', color: '#8B5CF6', bg: 'bg-purple text-white', symbol: 'Fr' },
  { id: 'endodoncia', label: 'Endodoncia', color: '#EC4899', bg: 'bg-pink text-white', symbol: 'E' },
  { id: 'implante', label: 'Implante', color: '#22C55E', bg: 'bg-success text-white', symbol: 'Im' },
];

const createEmptyTeethState = () => {
  const teeth = {};
  const adultNumbers = [
    18,17,16,15,14,13,12,11, 21,22,23,24,25,26,27,28,
    48,47,46,45,44,43,42,41, 31,32,33,34,35,36,37,38,
    55,54,53,52,51, 61,62,63,64,65,
    85,84,83,82,81, 71,72,73,74,75
  ];
  adultNumbers.forEach(num => {
    teeth[num] = {
      faces: {
        mesial: { condition: null, note: '', date: null },
        distal: { condition: null, note: '', date: null },
        oclusal: { condition: null, note: '', date: null },
        vestibular: { condition: null, note: '', date: null },
        lingual: { condition: null, note: '', date: null },
      },
      wholeToothCondition: null,
      note: ''
    };
  });
  return teeth;
};

export const useOdontograma = (pacienteId) => {
  const [teeth, setTeeth] = useState(createEmptyTeethState());
  const [selectedTooth, setSelectedTooth] = useState(null);
  const [selectedFace, setSelectedFace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPediatric, setIsPediatric] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [rawRegistros, setRawRegistros] = useState([]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = useCallback(async () => {
    if (!pacienteId) return;
    setLoading(true);
    try {
      const registros = await getOdontogramaByPaciente(pacienteId);
      setRawRegistros(registros);
      const newTeeth = createEmptyTeethState();
      
      if (Array.isArray(registros)) {
        registros.forEach(reg => {
          const num = reg.numeroDiente;
          if (newTeeth[num]) {
            if (reg.cara === 'completo') {
              newTeeth[num].wholeToothCondition = reg.condicion;
              newTeeth[num].note = reg.notas || '';
            } else if (newTeeth[num].faces[reg.cara]) {
              newTeeth[num].faces[reg.cara] = {
                condition: reg.condicion,
                note: reg.notas || '',
                date: reg.fechaRegistro
              };
            }
          }
        });
      }
      setTeeth(newTeeth);
    } catch (err) {
      console.error('Error al cargar odontograma:', err);
      showToast('No se pudo cargar el odontograma del paciente.', 'danger');
    } finally {
      setLoading(false);
    }
  }, [pacienteId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const openFaceModal = (toothNum, faceName) => {
    setSelectedTooth(toothNum);
    setSelectedFace(faceName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTooth(null);
    setSelectedFace(null);
  };

  const saveCondition = async (conditionId, noteText) => {
    if (!selectedTooth) return;

    const updatedTeeth = { ...teeth };
    const tooth = { ...updatedTeeth[selectedTooth] };
    const todayStr = new Date().toISOString().split('T')[0];

    const recordsToSave = [];

    if (selectedFace === 'completo') {
      tooth.wholeToothCondition = conditionId === 'sano' ? null : conditionId;
      tooth.note = noteText || '';
      recordsToSave.push({
        numeroDiente: selectedTooth,
        cara: 'completo',
        condicion: conditionId === 'sano' ? null : conditionId,
        notas: noteText || '',
        fechaRegistro: todayStr
      });
    } else if (selectedFace) {
      tooth.faces = { ...tooth.faces };
      tooth.faces[selectedFace] = {
        condition: conditionId === 'sano' ? null : conditionId,
        note: noteText || '',
        date: todayStr
      };
      recordsToSave.push({
        numeroDiente: selectedTooth,
        cara: selectedFace,
        condicion: conditionId === 'sano' ? null : conditionId,
        notas: noteText || '',
        fechaRegistro: todayStr
      });
    }

    updatedTeeth[selectedTooth] = tooth;
    setTeeth(updatedTeeth);

    try {
      await guardarOdontograma(pacienteId, recordsToSave, isPediatric);
      showToast('✓ Estado guardado correctamente');
      closeModal();
    } catch (err) {
      console.error('Error al guardar condición:', err);
      showToast('Error al conectar con el servidor para guardar.', 'danger');
    }
  };

  const resetAll = async () => {
    if (window.confirm('¿Está seguro de limpiar todo el odontograma de este paciente? Esta acción no se puede deshacer.')) {
      try {
        await apiLimpiar(pacienteId);
        setTeeth(createEmptyTeethState());
        showToast('🧹 Odontograma limpiado por completo.');
      } catch (err) {
        console.error('Error al limpiar:', err);
        showToast('Error al borrar el odontograma.', 'danger');
      }
    }
  };

  // Contar dientes con afecciones
  const countedAffectedTeeth = Object.keys(teeth).filter(num => {
    const t = teeth[num];
    if (t.wholeToothCondition) return true;
    return Object.values(t.faces).some(f => f.condition);
  }).length;

  return {
    teeth,
    selectedTooth,
    selectedFace,
    isModalOpen,
    isPediatric,
    setIsPediatric,
    loading,
    toast,
    rawRegistros,
    openFaceModal,
    closeModal,
    saveCondition,
    resetAll,
    countedAffectedTeeth,
    reload: loadData
  };
};

import React, { useState, useEffect } from 'react';
import { TOOTH_NAMES, CONDITIONS } from '../../hooks/useOdontograma';
import { CheckCircle2, X, AlertCircle, Calendar, FileText, Stethoscope } from 'lucide-react';

const ToothModal = ({ isOpen, toothNumber, faceName, toothData, onSave, onClose }) => {
  const [selectedCondition, setSelectedCondition] = useState('sano');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen && toothData) {
      if (faceName === 'completo') {
        setSelectedCondition(toothData.wholeToothCondition || 'sano');
        setNote(toothData.note || '');
      } else if (faceName && toothData.faces[faceName]) {
        setSelectedCondition(toothData.faces[faceName].condition || 'sano');
        setNote(toothData.faces[faceName].note || '');
      }
    }
  }, [isOpen, toothNumber, faceName, toothData]);

  if (!isOpen || !toothNumber) return null;

  const toothName = TOOTH_NAMES[toothNumber] || `Diente #${toothNumber}`;
  const faceTitle = faceName === 'completo' ? 'Todo el Diente' : `Cara ${faceName.toUpperCase()}`;
  const todayStr = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSave(selectedCondition, note);
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content bg-slate-900 text-white border border-secondary shadow-2xl rounded-4 overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-gradient bg-slate-800 p-4 border-bottom border-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary p-3 rounded-3 text-white fs-3 fw-bold">
                #{toothNumber}
              </div>
              <div>
                <h3 className="modal-title fw-bold text-white mb-1">
                  Diente #{toothNumber} — {toothName}
                </h3>
                <span className="badge bg-warning text-dark fs-6 px-3 py-1 fw-bold">
                  📍 Seleccionado: {faceTitle}
                </span>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white fs-4" onClick={onClose} aria-label="Close"></button>
          </div>

          {/* Body */}
          <div className="modal-body p-4 p-md-5">
            <form onSubmit={handleFormSubmit}>
              {/* Selector de Condición */}
              <div className="mb-4">
                <label className="form-label fs-5 fw-bold text-light mb-3 d-flex align-items-center gap-2">
                  <Stethoscope className="text-info" size={22} /> Selección de Condición Dental:
                </label>
                <div className="row g-3">
                  {CONDITIONS.map(cond => {
                    const isSelected = selectedCondition === cond.id;
                    return (
                      <div className="col-6 col-sm-4" key={cond.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedCondition(cond.id)}
                          className={`btn w-100 p-3 d-flex align-items-center gap-3 rounded-3 transition-all text-start shadow-sm ${isSelected ? 'ring-4 ring-primary border-2 border-white scale-102' : 'border-secondary opacity-90'}`}
                          style={{ 
                            backgroundColor: cond.color, 
                            color: cond.id === 'sano' || cond.id === 'corona' ? '#000' : '#fff',
                            minHeight: '60px'
                          }}
                        >
                          <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-black fs-4 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                            {cond.symbol}
                          </div>
                          <span className="fw-bold fs-6 lh-sm">{cond.label}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Observaciones */}
              <div className="mb-4">
                <label className="form-label fs-5 fw-bold text-light mb-2 d-flex align-items-center gap-2">
                  <FileText className="text-info" size={20} /> Observaciones Médicas Adicionales:
                </label>
                <textarea
                  className="form-control form-control-lg bg-dark text-white border-secondary fs-5 p-3"
                  rows="3"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Escriba aquí cualquier detalle sobre amalgamas, profundidad de caries o indicación clínica..."
                ></textarea>
              </div>

              {/* Fecha de registro */}
              <div className="p-3 bg-slate-800 rounded-3 border border-secondary mb-4 d-flex align-items-center gap-2 text-info fs-6">
                <Calendar size={18} /> <strong>Fecha de registro:</strong> {todayStr}
              </div>

              {/* Botones de Acción */}
              <div className="d-flex justify-content-end gap-3 pt-3 border-top border-secondary">
                <button type="button" onClick={onClose} className="btn btn-outline-light btn-lg fw-bold px-4 py-3 fs-5">
                  ❌ Cancelar
                </button>
                <button type="submit" className="btn btn-success btn-lg fw-bold px-5 py-3 fs-5 d-flex align-items-center gap-2 shadow-lg">
                  <CheckCircle2 size={24} /> Guardar Condición
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToothModal;

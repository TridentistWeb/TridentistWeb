import React from 'react';
import { CONDITIONS } from '../../hooks/useOdontograma';
import { Printer, Trash2, ShieldAlert, CheckSquare } from 'lucide-react';

const OdontogramaLeyenda = ({ affectedCount, onPrint, onReset }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-4 border border-secondary shadow-lg text-white">
      <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-secondary">
        <h4 className="m-0 fw-bold text-primary d-flex align-items-center gap-2">
          🎨 Leyenda de Condiciones
        </h4>
        <span className="badge bg-warning text-dark fs-6 px-3 py-2 fw-bold d-flex align-items-center gap-1">
          <CheckSquare size={16} /> {affectedCount} diente(s) con registros
        </span>
      </div>

      {/* Grid de Leyenda */}
      <div className="row g-2 mb-4">
        {CONDITIONS.map(cond => (
          <div className="col-6 col-md-4 col-lg-3" key={cond.id}>
            <div className="d-flex align-items-center gap-2 p-2 bg-slate-800 rounded-3 border border-secondary">
              <span 
                className="badge rounded-circle d-flex align-items-center justify-content-center fw-bold fs-6 flex-shrink-0"
                style={{ width: '32px', height: '32px', backgroundColor: cond.color, color: cond.id === 'sano' || cond.id === 'corona' ? '#000' : '#fff' }}
              >
                {cond.symbol}
              </span>
              <span className="fs-6 font-medium text-light">{cond.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Botones Globales de Control */}
      <div className="d-flex flex-wrap gap-3 justify-content-end border-top border-secondary pt-3 no-print">
        <button onClick={onReset} className="btn btn-outline-danger btn-lg fw-bold d-flex align-items-center gap-2 px-4 py-2 fs-6">
          <Trash2 size={20} /> Limpiar Todo
        </button>
        <button onClick={onPrint} className="btn btn-primary btn-lg fw-bold d-flex align-items-center gap-2 px-4 py-2 fs-6 shadow-md">
          <Printer size={20} /> Imprimir Odontograma (PDF)
        </button>
      </div>
    </div>
  );
};

export default OdontogramaLeyenda;

import React from 'react';
import { TOOTH_NAMES, CONDITIONS } from '../../hooks/useOdontograma';

const ToothSVG = ({ number, toothData, onFaceClick, onWholeToothClick }) => {
  const toothName = TOOTH_NAMES[number] || `Diente #${number}`;

  const getColor = (conditionId) => {
    const cond = CONDITIONS.find(c => c.id === conditionId);
    return cond ? cond.color : '#FFFFFF';
  };

  const faces = toothData?.faces || {};
  const wholeCond = toothData?.wholeToothCondition;

  const handleContextMenu = (e) => {
    e.preventDefault();
    onWholeToothClick(number);
  };

  return (
    <div 
      className="d-flex flex-column align-items-center m-1 p-2 rounded-3 transition-all cursor-pointer hover-bg-slate-800"
      style={{ width: '75px', background: wholeCond ? 'rgba(239, 159, 39, 0.15)' : '#1e293b', border: wholeCond ? '2px solid #EF9F27' : '1px solid #334155' }}
      onContextMenu={handleContextMenu}
      title={`${toothName} (Haga clic derecho para marcar todo el diente)`}
    >
      {/* Indicador de condición en todo el diente si existe */}
      {wholeCond && (
        <span 
          className="badge mb-1 fs-7 fw-bold" 
          style={{ backgroundColor: getColor(wholeCond), color: wholeCond === 'sano' || wholeCond === 'corona' ? '#000' : '#fff' }}
        >
          {CONDITIONS.find(c => c.id === wholeCond)?.symbol || wholeCond}
        </span>
      )}

      {/* SVG del Diente con 5 Caras */}
      <svg viewBox="0 0 100 100" width="58" height="58" className="shadow-sm">
        <defs>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Fondo del diente */}
        <rect x="2" y="2" width="96" height="96" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />

        {/* Cara VESTIBULAR (Superior) */}
        <polygon 
          points="2,2 98,2 75,25 25,25" 
          fill={getColor(faces.vestibular?.condition)} 
          stroke="#334155" 
          strokeWidth="2"
          onClick={() => onFaceClick(number, 'vestibular')}
          className="tooth-face-polygon"
        >
          <title>{`${toothName} — Cara Vestibular`}</title>
        </polygon>

        {/* Cara DISTAL / MESIAL (Izquierda) */}
        <polygon 
          points="2,2 25,25 25,75 2,98" 
          fill={getColor(faces.distal?.condition)} 
          stroke="#334155" 
          strokeWidth="2"
          onClick={() => onFaceClick(number, 'distal')}
          className="tooth-face-polygon"
        >
          <title>{`${toothName} — Cara Distal`}</title>
        </polygon>

        {/* Cara MESIAL / DISTAL (Derecha) */}
        <polygon 
          points="98,2 98,98 75,75 75,25" 
          fill={getColor(faces.mesial?.condition)} 
          stroke="#334155" 
          strokeWidth="2"
          onClick={() => onFaceClick(number, 'mesial')}
          className="tooth-face-polygon"
        >
          <title>{`${toothName} — Cara Mesial`}</title>
        </polygon>

        {/* Cara LINGUAL / PALATINO (Inferior) */}
        <polygon 
          points="2,98 25,75 75,75 98,98" 
          fill={getColor(faces.lingual?.condition)} 
          stroke="#334155" 
          strokeWidth="2"
          onClick={() => onFaceClick(number, 'lingual')}
          className="tooth-face-polygon"
        >
          <title>{`${toothName} — Cara Lingual/Palatino`}</title>
        </polygon>

        {/* Cara OCLUSAL / INCISAL (Centro) */}
        <polygon 
          points="25,25 75,25 75,75 25,75" 
          fill={getColor(faces.oclusal?.condition)} 
          stroke="#334155" 
          strokeWidth="2"
          onClick={() => onFaceClick(number, 'oclusal')}
          className="tooth-face-polygon"
        >
          <title>{`${toothName} — Cara Oclusal/Incisal`}</title>
        </polygon>

        {/* Simbolo si la cara oclusal o todo el diente tiene algo */}
        {faces.oclusal?.condition && (
          <text x="50" y="58" textAnchor="middle" fill="#000" fontSize="22" fontWeight="bold" pointerEvents="none">
            {CONDITIONS.find(c => c.id === faces.oclusal.condition)?.symbol}
          </text>
        )}
      </svg>

      {/* Número de Diente FDI */}
      <span className="mt-2 fs-5 fw-bold text-warning font-mono">
        {number}
      </span>
    </div>
  );
};

export default ToothSVG;

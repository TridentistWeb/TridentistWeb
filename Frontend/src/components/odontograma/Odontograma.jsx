import React from 'react';
import { useOdontograma } from '../../hooks/useOdontograma';
import ToothSVG from './ToothSVG';
import ToothModal from './ToothModal';
import OdontogramaLeyenda from './OdontogramaLeyenda';
import { Baby, User, RefreshCw, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

const Odontograma = ({ pacienteId, pacienteNombre, onClose }) => {
  const {
    teeth,
    selectedTooth,
    selectedFace,
    isModalOpen,
    isPediatric,
    setIsPediatric,
    loading,
    toast,
    openFaceModal,
    closeModal,
    saveCondition,
    resetAll,
    countedAffectedTeeth,
    reload
  } = useOdontograma(pacienteId);

  const handlePrint = () => {
    window.print();
  };

  // Cuadrantes Adultos
  const quadrant1 = [18, 17, 16, 15, 14, 13, 12, 11];
  const quadrant2 = [21, 22, 23, 24, 25, 26, 27, 28];
  const quadrant4 = [48, 47, 46, 45, 44, 43, 42, 41];
  const quadrant3 = [31, 32, 33, 34, 35, 36, 37, 38];

  // Cuadrantes Pediátricos
  const pedQuadrant5 = [55, 54, 53, 52, 51];
  const pedQuadrant6 = [61, 62, 63, 64, 65];
  const pedQuadrant8 = [85, 84, 83, 82, 81];
  const pedQuadrant7 = [71, 72, 73, 74, 75];

  return (
    <div className="odontograma-container bg-slate-950 text-white p-4 p-md-5 rounded-4 border border-secondary shadow-2xl position-relative overflow-auto max-w-1400 mx-auto">
      {/* Toast Notificación */}
      {toast && (
        <div className={`position-fixed top-0 end-0 m-4 p-3 alert alert-${toast.type} shadow-2xl rounded-3 d-flex align-items-center gap-3 z-3 fs-5`} style={{ zIndex: 9999 }}>
          {toast.type === 'success' ? <CheckCircle2 size={28} /> : <AlertCircle size={28} />}
          <strong className="fw-bold">{toast.message}</strong>
        </div>
      )}

      {/* Encabezado Principal */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom border-secondary">
        <div>
          <h2 className="fs-2 fw-black text-warning m-0 d-flex align-items-center gap-2">
            🦷 Odontograma Interactivo — Paciente #{pacienteId}
          </h2>
          <p className="text-info fs-5 mb-0 mt-1 fw-semibold">
            {pacienteNombre ? `Paciente: ${pacienteNombre}` : 'Haga clic en la cara de un diente para marcar una condición médica.'}
          </p>
        </div>

        <div className="d-flex align-items-center gap-3 no-print">
          {/* Selector Adulto / Pediátrico */}
          <div className="btn-group p-1 bg-slate-900 rounded-3 border border-secondary" role="group">
            <button
              type="button"
              className={`btn btn-lg fw-bold d-flex align-items-center gap-2 px-3 py-2 ${!isPediatric ? 'btn-primary text-white shadow' : 'btn-dark text-secondary'}`}
              onClick={() => setIsPediatric(false)}
            >
              <User size={20} /> Dentición Adulta (32)
            </button>
            <button
              type="button"
              className={`btn btn-lg fw-bold d-flex align-items-center gap-2 px-3 py-2 ${isPediatric ? 'btn-primary text-white shadow' : 'btn-dark text-secondary'}`}
              onClick={() => setIsPediatric(true)}
            >
              <Baby size={20} /> Pediátrico (20)
            </button>
          </div>

          <button onClick={reload} className="btn btn-outline-light btn-lg p-3 rounded-3" title="Recargar">
            <RefreshCw size={22} />
          </button>

          {onClose && (
            <button onClick={onClose} className="btn btn-danger btn-lg fw-bold px-4 py-2 fs-5">
              ✖ Cerrar
            </button>
          )}
        </div>
      </div>

      {/* Instrucción rápida para boomers */}
      <div className="alert alert-dark border border-secondary text-light fs-6 mb-4 d-flex align-items-center gap-3 shadow-sm no-print">
        <HelpCircle size={24} className="text-warning flex-shrink-0" />
        <div>
          <strong>Guía rápida:</strong> Haga <strong>un clic</strong> en la sección interna/externa de cualquier diente para cambiar su estado (caries, obturación, etc.). Haga <strong>clic derecho</strong> en un diente para marcarlo por completo.
        </div>
      </div>

      {loading ? (
        <div className="text-center p-5">
          <div className="spinner-border text-warning mb-3" style={{ width: '3.5rem', height: '3.5rem' }} role="status"></div>
          <h3 className="fw-bold">Cargando dentadura del paciente...</h3>
        </div>
      ) : (
        <div className="odontograma-grid-wrapper bg-slate-900 p-4 rounded-4 border border-secondary mb-4 overflow-auto">
          {/* MAXILAR SUPERIOR */}
          <div className="text-center mb-4">
            <h4 className="text-info fw-bold mb-3 border-bottom border-slate-800 pb-2 d-inline-block px-4">
              ⬆️ MAXILAR SUPERIOR (ARCADA SUPERIOR)
            </h4>
            <div className="d-flex justify-content-center flex-wrap align-items-center gap-1">
              {/* Cuadrante 1 / 5 */}
              <div className="d-flex border-end border-warning border-3 pe-2 me-2">
                {(!isPediatric ? quadrant1 : pedQuadrant5).map(num => (
                  <ToothSVG key={num} number={num} toothData={teeth[num]} onFaceClick={openFaceModal} onWholeToothClick={(n) => openFaceModal(n, 'completo')} />
                ))}
              </div>
              {/* Cuadrante 2 / 6 */}
              <div className="d-flex ps-2">
                {(!isPediatric ? quadrant2 : pedQuadrant6).map(num => (
                  <ToothSVG key={num} number={num} toothData={teeth[num]} onFaceClick={openFaceModal} onWholeToothClick={(n) => openFaceModal(n, 'completo')} />
                ))}
              </div>
            </div>
          </div>

          <hr className="border-secondary my-4" />

          {/* MAXILAR INFERIOR */}
          <div className="text-center mt-3">
            <h4 className="text-info fw-bold mb-3 border-bottom border-slate-800 pb-2 d-inline-block px-4">
              ⬇️ MAXILAR INFERIOR (ARCADA INFERIOR)
            </h4>
            <div className="d-flex justify-content-center flex-wrap align-items-center gap-1">
              {/* Cuadrante 4 / 8 */}
              <div className="d-flex border-end border-warning border-3 pe-2 me-2">
                {(!isPediatric ? quadrant4 : pedQuadrant8).map(num => (
                  <ToothSVG key={num} number={num} toothData={teeth[num]} onFaceClick={openFaceModal} onWholeToothClick={(n) => openFaceModal(n, 'completo')} />
                ))}
              </div>
              {/* Cuadrante 3 / 7 */}
              <div className="d-flex ps-2">
                {(!isPediatric ? quadrant3 : pedQuadrant7).map(num => (
                  <ToothSVG key={num} number={num} toothData={teeth[num]} onFaceClick={openFaceModal} onWholeToothClick={(n) => openFaceModal(n, 'completo')} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leyenda y Contadores */}
      <OdontogramaLeyenda 
        affectedCount={countedAffectedTeeth} 
        onPrint={handlePrint} 
        onReset={resetAll} 
      />

      {/* Modal de selección */}
      <ToothModal 
        isOpen={isModalOpen} 
        toothNumber={selectedTooth} 
        faceName={selectedFace} 
        toothData={selectedTooth ? teeth[selectedTooth] : null} 
        onSave={saveCondition} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Odontograma;

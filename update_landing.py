import re

with open('Frontend/src/pages/Landing.jsx', 'r') as f:
    content = f.read()

# Replace quienes-somos
content = content.replace(
'''      <section id="quienes-somos" className="vh-100 bg-dark d-flex align-items-center justify-content-center border-bottom border-secondary">
        <div className="container text-center">
          <h2 className="display-1 fw-black text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-3px' }}>Quiénes Somos</h2>
          <p className="fs-4 text-secondary max-w-700 mx-auto">La excelencia no es un acto, es un hábito. Redefinimos el estándar de atención dental.</p>
        </div>
      </section>''',
'''      <section id="quienes-somos" className="vh-100 position-relative d-flex align-items-center justify-content-center border-bottom border-secondary overflow-hidden">
        <video autoPlay loop muted playsInline className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" style={{ zIndex: 0 }} src="/quienes_somos.webm" />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-75" style={{ zIndex: 1 }}></div>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h2 className="display-1 fw-black text-white text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-3px' }}>Quiénes Somos</h2>
          <p className="fs-4 text-light max-w-700 mx-auto">La excelencia no es un acto, es un hábito. Redefinimos el estándar de atención dental.</p>
        </div>
      </section>'''
)

# Replace ubicacion
content = content.replace(
'''      <section id="ubicacion" className="vh-100 bg-dark d-flex align-items-center justify-content-center border-bottom border-secondary">
        <div className="container text-center">
          <h2 className="display-1 fw-black text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-3px' }}>Ubicación</h2>
          <p className="fs-4 text-secondary">Avenida Principal 123, Distrito Central, Ciudad</p>
        </div>
      </section>''',
'''      <section id="ubicacion" className="vh-100 position-relative d-flex align-items-center justify-content-center border-bottom border-secondary overflow-hidden">
        <video autoPlay loop muted playsInline className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" style={{ zIndex: 0 }} src="/ubicacion.webm" />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-75" style={{ zIndex: 1 }}></div>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h2 className="display-1 fw-black text-white text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-3px' }}>Ubicación</h2>
          <p className="fs-4 text-light">Avenida Principal 123, Distrito Central, Ciudad</p>
        </div>
      </section>'''
)

# Replace contacto
content = content.replace(
'''      <section id="contacto" className="vh-100 bg-black d-flex align-items-center justify-content-center">
        <div className="container text-center">
          <h2 className="display-1 fw-black text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-3px' }}>Contacto</h2>
          <p className="fs-4 text-secondary mb-5">Hablemos sobre tu próxima sonrisa.</p>
          <a href="mailto:info@tridentist.com" className="btn btn-info rounded-0 border-0 fw-black text-uppercase tracking-widest px-5 py-3 fs-5">
            AGENDAR CITA
          </a>
        </div>
      </section>''',
'''      <section id="contacto" className="vh-100 position-relative d-flex align-items-center justify-content-center overflow-hidden">
        <video autoPlay loop muted playsInline className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover" style={{ zIndex: 0 }} src="/contacto.webm" />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-75" style={{ zIndex: 1 }}></div>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h2 className="display-1 fw-black text-white text-uppercase tracking-tighter mb-4" style={{ letterSpacing: '-3px' }}>Contacto</h2>
          <p className="fs-4 text-light mb-5">Hablemos sobre tu próxima sonrisa.</p>
          <a href="mailto:info@tridentist.com" className="btn btn-info rounded-0 border-0 fw-black text-uppercase tracking-widest px-5 py-3 fs-5">
            AGENDAR CITA
          </a>
        </div>
      </section>'''
)

with open('Frontend/src/pages/Landing.jsx', 'w') as f:
    f.write(content)

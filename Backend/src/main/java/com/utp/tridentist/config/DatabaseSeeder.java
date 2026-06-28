package com.utp.tridentist.config;

import com.utp.tridentist.model.*;
import com.utp.tridentist.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private TratamientoRepository tratamientoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private HistoriaClinicaRepository historiaClinicaRepository;

    @Autowired
    private PresupuestoRepository presupuestoRepository;

    @Autowired
    private TransaccionRepository transaccionRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private MovimientoInventarioRepository movimientoInventarioRepository;

    @Autowired
    private OrdenLaboratorioRepository ordenLaboratorioRepository;

    @Autowired
    private BoletaRepository boletaRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        List<Tratamiento> tratamientos = seedTratamientos();
        List<Paciente> pacientes = seedPacientes();
        seedCitas(tratamientos, pacientes);
        seedHistoriasClinicas(pacientes);
        seedPresupuestos(pacientes);
        seedTransacciones();
        seedInventario();
        seedOrdenesLaboratorio(pacientes);
        seedBoletas(pacientes);
    }

    private List<Tratamiento> seedTratamientos() {
        if (tratamientoRepository.count() < 8) {
            List<Object[]> tratamientosData = List.of(
                new Object[]{"Consulta Diagnóstica y Odontograma", new BigDecimal("50.00")},
                new Object[]{"Profilaxis Dental y Curación Ultrasónica", new BigDecimal("100.00")},
                new Object[]{"Curación Estética con Resina Fotocurable (Simple)", new BigDecimal("90.00")},
                new Object[]{"Curación Estética con Resina Fotocurable (Compuesta)", new BigDecimal("130.00")},
                new Object[]{"Endodoncia Unirradicular (Dientes anteriores)", new BigDecimal("380.00")},
                new Object[]{"Endodoncia Multirradicular (Molares)", new BigDecimal("580.00")},
                new Object[]{"Exodoncia Simple (Extracción)", new BigDecimal("120.00")},
                new Object[]{"Exodoncia Compleja / Tercera Molar", new BigDecimal("380.00")},
                new Object[]{"Blanqueamiento Dental LED en Consultorio", new BigDecimal("480.00")},
                new Object[]{"Corona de Zirconio Monolítico Estético", new BigDecimal("890.00")},
                new Object[]{"Incrustación de Disilicato de Litio (Inlay/Onlay)", new BigDecimal("650.00")},
                new Object[]{"Carilla Estética de Resina por Pieza", new BigDecimal("280.00")},
                new Object[]{"Instalación de Ortodoncia Brackets Metálicos", new BigDecimal("850.00")},
                new Object[]{"Instalación de Ortodoncia Estética Zafiro", new BigDecimal("1600.00")},
                new Object[]{"Implante Dental de Titanio Osteointegrado", new BigDecimal("2200.00")}
            );

            for (Object[] data : tratamientosData) {
                String desc = (String) data[0];
                BigDecimal precio = (BigDecimal) data[1];
                if (tratamientoRepository.findAll().stream().noneMatch(t -> t.getDescripcion().equalsIgnoreCase(desc))) {
                    Tratamiento t = new Tratamiento();
                    t.setDescripcion(desc);
                    t.setPrecio(precio);
                    tratamientoRepository.save(t);
                }
            }
        }
        return tratamientoRepository.findAll();
    }

    private List<Paciente> seedPacientes() {
        if (pacienteRepository.count() == 0) {
            List<Paciente> lista = List.of(
                createPaciente("45871239", "Juan Carlos", "Quispe Huamán", "987654321", "j.quispe@gmail.com"),
                createPaciente("71234568", "Rosa María", "Flores Chávez", "912345678", "rosa.flores@outlook.com"),
                createPaciente("40987654", "Carlos Alberto", "Mendoza Silva", "955443322", "cmendoza@hotmail.com"),
                createPaciente("73456789", "Claudia Sofía", "Ramírez Ugarte", "998877665", "claudia.ramirez@gmail.com"),
                createPaciente("42112233", "Jorge Luis", "Benavides Morales", "944332211", "jorge.benavides@yahoo.com"),
                createPaciente("76543210", "Ana Lucía", "Torres Vega", "966778899", "ana.torres@gmail.com")
            );
            return pacienteRepository.saveAll(lista);
        }
        return pacienteRepository.findAll();
    }

    private Paciente createPaciente(String dni, String nombres, String apellidos, String celular, String email) {
        Paciente p = new Paciente();
        p.setDni(dni);
        p.setNombres(nombres);
        p.setApellidos(apellidos);
        p.setCelular(celular);
        p.setEmail(email);
        return p;
    }

    private void seedCitas(List<Tratamiento> tratamientos, List<Paciente> pacientes) {
        if (citaRepository.count() == 0 && !tratamientos.isEmpty() && !pacientes.isEmpty()) {
            Integer tratId = tratamientos.get(0).getIdTratamiento();
            List<Doctor> doctores = doctorRepository.findAll();
            Long docId = doctores.isEmpty() ? 1L : doctores.get(0).getCodigo().longValue();

            LocalDateTime ahora = LocalDateTime.now();
            Cita c1 = new Cita(null, docId, pacientes.get(0).getCodigo().longValue(), ahora.plusDays(1).withHour(10).withMinute(0), ahora.plusDays(1).withHour(10).withMinute(30), "Evaluación de caries y limpieza general", "CONFIRMADA");
            c1.setIdTratamiento(tratId);

            Cita c2 = new Cita(null, docId, pacientes.size() > 1 ? pacientes.get(1).getCodigo().longValue() : 1L, ahora.plusDays(2).withHour(11).withMinute(30), ahora.plusDays(2).withHour(12).withMinute(0), "Dolor agudo en tercer molar inferior", "PENDIENTE");
            c2.setIdTratamiento(tratamientos.size() > 1 ? tratamientos.get(1).getIdTratamiento() : tratId);

            Cita c3 = new Cita(null, docId, pacientes.size() > 2 ? pacientes.get(2).getCodigo().longValue() : 1L, ahora.plusDays(3).withHour(16).withMinute(0), ahora.plusDays(3).withHour(17).withMinute(0), "Inicio de tratamiento de Endodoncia", "CONFIRMADA");
            c3.setIdTratamiento(tratamientos.size() > 2 ? tratamientos.get(2).getIdTratamiento() : tratId);

            citaRepository.saveAll(List.of(c1, c2, c3));
        }
    }

    private void seedHistoriasClinicas(List<Paciente> pacientes) {
        if (historiaClinicaRepository.count() == 0 && !pacientes.isEmpty()) {
            Paciente p1 = pacientes.get(0);
            HistoriaClinica hc = new HistoriaClinica();
            hc.setPacienteId(p1.getCodigo().longValue());
            hc.setAnamnesis("Paciente manifiesta sensibilidad a alimentos fríos en zona molar superior derecha. Sin alergias medicamentosas conocidas.");
            hc.setNotasEvolucion("Se realiza exploración clínica y radiografía periapical. Se detecta caries en pieza 16 cara oclusal.");

            TratamientoDiente t1 = new TratamientoDiente(null, 16, "oclusal", "caries", hc);
            TratamientoDiente t2 = new TratamientoDiente(null, 21, "vestibular", "obturacion", hc);
            hc.setTratamientosDiente(List.of(t1, t2));

            historiaClinicaRepository.save(hc);
        }
    }

    private void seedPresupuestos(List<Paciente> pacientes) {
        if (presupuestoRepository.count() == 0 && !pacientes.isEmpty()) {
            Paciente p1 = pacientes.get(0);
            Presupuesto pres = new Presupuesto(null, p1.getCodigo().longValue(), LocalDate.now(), new BigDecimal("480.00"), "APROBADO");
            PresupuestoItem item1 = new PresupuestoItem(null, "Profilaxis Dental y Curación Ultrasónica", new BigDecimal("100.00"), "FASE 1 - Higiene", pres);
            PresupuestoItem item2 = new PresupuestoItem(null, "Curación Estética con Resina Compuesta", new BigDecimal("130.00"), "FASE 2 - Operatoria", pres);
            PresupuestoItem item3 = new PresupuestoItem(null, "Carilla Estética de Resina", new BigDecimal("250.00"), "FASE 3 - Estética", pres);
            pres.setItems(List.of(item1, item2, item3));
            presupuestoRepository.save(pres);
        }
    }

    private void seedTransacciones() {
        if (transaccionRepository.count() == 0) {
            Transaccion t1 = new Transaccion(null, new BigDecimal("250.00"), "INGRESO", "Cobro por curación de resina y consulta - Paciente Quispe", LocalDateTime.now().minusDays(2), 1L, 1L);
            Transaccion t2 = new Transaccion(null, new BigDecimal("480.00"), "INGRESO", "Cobro por blanqueamiento LED - Paciente Flores", LocalDateTime.now().minusDays(1), 1L, 1L);
            Transaccion t3 = new Transaccion(null, new BigDecimal("120.00"), "EGRESO", "Compra de insumos: Cajas de guantes de nitrilo y mascarillas", LocalDateTime.now().minusHours(5), 1L, 1L);
            transaccionRepository.saveAll(List.of(t1, t2, t3));
        }
    }

    private void seedInventario() {
        if (productoRepository.count() == 0) {
            Producto p1 = new Producto(null, "Anestesia Lidocaína 2% con Epinefrina (Caja x 50)", 5, 24);
            Producto p2 = new Producto(null, "Resina Fotocurable Filtek Z250 Talla A2 (3M)", 3, 12);
            Producto p3 = new Producto(null, "Guantes de Nitrilo Examen Talla M (Caja x 100)", 10, 35);
            Producto p4 = new Producto(null, "Ácido Grabador Dental 37% Gel (Jeringa)", 4, 15);
            Producto p5 = new Producto(null, "Agujas Dentales Desechables Cortas (Caja x 100)", 5, 18);
            productoRepository.saveAll(List.of(p1, p2, p3, p4, p5));

            MovimientoInventario m1 = new MovimientoInventario(null, p1, 10, "ENTRADA", LocalDateTime.now().minusDays(5), "Compra inicial a proveedor Dental Lima");
            MovimientoInventario m2 = new MovimientoInventario(null, p2, 2, "SALIDA", LocalDateTime.now().minusDays(1), "Uso en procedimientos de curación turno mañana");
            movimientoInventarioRepository.saveAll(List.of(m1, m2));
        }
    }

    private void seedOrdenesLaboratorio(List<Paciente> pacientes) {
        if (ordenLaboratorioRepository.count() == 0 && !pacientes.isEmpty()) {
            Paciente p1 = pacientes.get(0);
            OrdenLaboratorio o1 = new OrdenLaboratorio(null, "Corona Monolítica de Zirconio Pieza 16", p1.getCodigo().longValue(), 1L, "Laboratorio Dental OrthoArt Lima", LocalDate.now().minusDays(3), LocalDate.now().plusDays(4), "EN_PROCESO", new BigDecimal("320.00"));
            OrdenLaboratorio o2 = new OrdenLaboratorio(null, "Placa Miorelajante de Bruxismo Rígida", pacientes.size() > 1 ? pacientes.get(1).getCodigo().longValue() : 2L, 2L, "Laboratorio ProDent Miraflores", LocalDate.now().minusDays(7), LocalDate.now().minusDays(1), "RECIBIDO", new BigDecimal("150.00"));
            ordenLaboratorioRepository.saveAll(List.of(o1, o2));
        }
    }

    private void seedBoletas(List<Paciente> pacientes) {
        if (boletaRepository.count() == 0 && !pacientes.isEmpty()) {
            Paciente p1 = pacientes.get(0);
            Boleta b = new Boleta();
            b.setFechaEmision(LocalDateTime.now().minusDays(1));
            b.setPaciente(p1);
            b.setTotal(new BigDecimal("230.00"));
            boletaRepository.save(b);
        }
    }
}

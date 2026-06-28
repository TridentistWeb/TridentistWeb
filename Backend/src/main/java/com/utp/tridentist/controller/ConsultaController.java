package com.utp.tridentist.controller;

import com.utp.tridentist.dto.CitaDetalleDTO;
import com.utp.tridentist.model.*;
import com.utp.tridentist.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/consultas")
@CrossOrigin(origins = "*")
public class ConsultaController {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private TratamientoRepository tratamientoRepository;

    @Autowired
    private BoletaRepository boletaRepository;

    @GetMapping("/especialidades")
    public ResponseEntity<List<String>> getEspecialidades() {
        return ResponseEntity.ok(doctorRepository.findDistinctEspecialidades());
    }

    @GetMapping("/doctores")
    public ResponseEntity<List<Doctor>> getDoctoresByEspecialidad(@RequestParam String especialidad) {
        return ResponseEntity.ok(doctorRepository.findByEspecialidad(especialidad));
    }

    @GetMapping("/citas/doctor/{id}")
    public ResponseEntity<List<CitaDetalleDTO>> getCitasByDoctor(@PathVariable("id") Long id) {
        List<Cita> citas = citaRepository.findByDoctorId(id);
        List<CitaDetalleDTO> dtoList = buildCitaDTOList(citas);
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/citas")
    public ResponseEntity<List<CitaDetalleDTO>> getAllCitas() {
        List<Cita> citas = citaRepository.findAll();
        List<CitaDetalleDTO> dtoList = buildCitaDTOList(citas);
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/boletas")
    public ResponseEntity<List<Boleta>> getAllBoletas() {
        return ResponseEntity.ok(boletaRepository.findAll());
    }

    private List<CitaDetalleDTO> buildCitaDTOList(List<Cita> citas) {
        List<CitaDetalleDTO> dtoList = new ArrayList<>();
        for (Cita c : citas) {
            String pacienteNombre = "Paciente #" + c.getPacienteId();
            if (c.getPacienteId() != null) {
                Optional<Paciente> pOpt = pacienteRepository.findById(c.getPacienteId().intValue());
                if (pOpt.isPresent()) {
                    pacienteNombre = pOpt.get().getNombres() + " " + pOpt.get().getApellidos();
                }
            }

            String doctorNombre = "Doctor #" + c.getDoctorId();
            String especialidad = "General";
            if (c.getDoctorId() != null) {
                Optional<Doctor> dOpt = doctorRepository.findById(c.getDoctorId().intValue());
                if (dOpt.isPresent()) {
                    doctorNombre = "Dr. " + dOpt.get().getNombres() + " " + dOpt.get().getApellidos();
                    especialidad = dOpt.get().getEspecialidad();
                }
            }

            String tratamientoDesc = c.getMotivo() != null ? c.getMotivo() : "Consulta General";
            if (c.getIdTratamiento() != null) {
                Optional<Tratamiento> tOpt = tratamientoRepository.findById(c.getIdTratamiento());
                if (tOpt.isPresent()) {
                    tratamientoDesc = tOpt.get().getDescripcion();
                }
            }

            dtoList.add(new CitaDetalleDTO(
                c.getId() != null ? c.getId().intValue() : 0,
                c.getFechaHoraInicio() != null ? c.getFechaHoraInicio() : c.getFechaHora(),
                pacienteNombre,
                doctorNombre,
                especialidad,
                tratamientoDesc,
                c.getEstado()
            ));
        }
        return dtoList;
    }
}

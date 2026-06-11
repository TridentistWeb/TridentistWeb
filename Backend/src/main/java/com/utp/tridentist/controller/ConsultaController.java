package com.utp.tridentist.controller;

import com.utp.tridentist.dto.CitaDetalleDTO;
import com.utp.tridentist.model.Doctor;
import com.utp.tridentist.repository.CitaRepository;
import com.utp.tridentist.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping("/especialidades")
    public ResponseEntity<List<String>> getEspecialidades() {
        return ResponseEntity.ok(doctorRepository.findDistinctEspecialidades());
    }

    @GetMapping("/doctores")
    public ResponseEntity<List<Doctor>> getDoctoresByEspecialidad(@RequestParam String especialidad) {
        return ResponseEntity.ok(doctorRepository.findByEspecialidad(especialidad));
    }

    @GetMapping("/citas/doctor/{id}")
    public ResponseEntity<List<CitaDetalleDTO>> getCitasByDoctor(@PathVariable Integer id) {
        return ResponseEntity.ok(citaRepository.findDetallesByDoctorId(id));
    }
}

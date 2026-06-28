package com.utp.tridentist.controller;

import com.utp.tridentist.model.HistoriaClinica;
import com.utp.tridentist.repository.HistoriaClinicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/historias-clinicas")
@CrossOrigin(origins = "*")
public class HistoriaClinicaController {

    @Autowired
    private HistoriaClinicaRepository historiaClinicaRepository;

    @GetMapping
    public ResponseEntity<List<HistoriaClinica>> getAll() {
        return ResponseEntity.ok(historiaClinicaRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HistoriaClinica> getById(@PathVariable Long id) {
        Optional<HistoriaClinica> historiaOpt = historiaClinicaRepository.findById(id);
        return historiaOpt.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<HistoriaClinica> getByPacienteId(@PathVariable Long pacienteId) {
        Optional<HistoriaClinica> historiaOpt = historiaClinicaRepository.findByPacienteId(pacienteId);
        return historiaOpt.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<HistoriaClinica> guardarHistoriaClinica(@RequestBody HistoriaClinica hc) {
        if (hc.getTratamientosDiente() != null) {
            hc.getTratamientosDiente().forEach(diente -> diente.setHistoriaClinica(hc));
        }
        HistoriaClinica guardada = historiaClinicaRepository.save(hc);
        return ResponseEntity.ok(guardada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HistoriaClinica> actualizarHistoriaClinica(@PathVariable Long id, @RequestBody HistoriaClinica hcDetails) {
        Optional<HistoriaClinica> historiaOpt = historiaClinicaRepository.findById(id);
        if (historiaOpt.isPresent()) {
            hcDetails.setId(id);
            if (hcDetails.getTratamientosDiente() != null) {
                hcDetails.getTratamientosDiente().forEach(diente -> diente.setHistoriaClinica(hcDetails));
            }
            HistoriaClinica actualizada = historiaClinicaRepository.save(hcDetails);
            return ResponseEntity.ok(actualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarHistoriaClinica(@PathVariable Long id) {
        if (historiaClinicaRepository.existsById(id)) {
            historiaClinicaRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

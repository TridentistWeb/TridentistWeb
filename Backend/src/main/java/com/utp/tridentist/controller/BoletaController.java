package com.utp.tridentist.controller;

import com.utp.tridentist.model.Boleta;
import com.utp.tridentist.model.Paciente;
import com.utp.tridentist.repository.PacienteRepository;
import com.utp.tridentist.service.BoletaService;
import com.utp.tridentist.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/boletas")
@CrossOrigin(origins = "*")
public class BoletaController {

    @Autowired
    private BoletaService service;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private PacienteRepository pacienteRepository;

    @GetMapping
    public List<Boleta> getAll() {
        List<Boleta> boletas = service.findAll();
        for (Boleta b : boletas) {
            if (b.getPaciente() != null) {
                b.setPacienteId(b.getPaciente().getCodigo());
            }
        }
        return boletas;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Boleta> getById(@PathVariable Integer id) {
        Optional<Boleta> entity = service.findById(id);
        if (entity.isPresent()) {
            Boleta b = entity.get();
            if (b.getPaciente() != null) {
                b.setPacienteId(b.getPaciente().getCodigo());
            }
            return ResponseEntity.ok(b);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> getBoletaPdf(@PathVariable Integer id) {
        try {
            byte[] pdfBytes = pdfService.generarBoletaPdf(id);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "boleta_" + id + ".pdf");
            return ResponseEntity.ok().headers(headers).body(pdfBytes);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Boleta> create(@RequestBody Boleta entity) {
        if (entity.getFechaEmision() == null) {
            entity.setFechaEmision(LocalDateTime.now());
        }
        if (entity.getPacienteId() != null) {
            Optional<Paciente> pOpt = pacienteRepository.findById(entity.getPacienteId());
            pOpt.ifPresent(entity::setPaciente);
        }
        if (entity.getPaciente() == null) {
            List<Paciente> pacientes = pacienteRepository.findAll();
            if (!pacientes.isEmpty()) {
                entity.setPaciente(pacientes.get(0));
            }
        }
        Boleta saved = service.save(entity);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boleta> update(@PathVariable Integer id, @RequestBody Boleta entityDetails) {
        Optional<Boleta> existingOpt = service.findById(id);
        if (existingOpt.isPresent()) {
            Boleta existing = existingOpt.get();
            existing.setNumeroBoleta(id);
            if (entityDetails.getFechaEmision() != null) {
                existing.setFechaEmision(entityDetails.getFechaEmision());
            }
            if (entityDetails.getTotal() != null) {
                existing.setTotal(entityDetails.getTotal());
            }
            if (entityDetails.getPacienteId() != null) {
                Optional<Paciente> pOpt = pacienteRepository.findById(entityDetails.getPacienteId());
                pOpt.ifPresent(existing::setPaciente);
            }
            Boleta updated = service.save(existing);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
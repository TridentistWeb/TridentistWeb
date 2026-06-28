package com.utp.tridentist.controller;

import com.utp.tridentist.model.OrdenLaboratorio;
import com.utp.tridentist.repository.OrdenLaboratorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/laboratorio/ordenes")
@CrossOrigin(origins = "*")
public class OrdenLaboratorioController {

    @Autowired
    private OrdenLaboratorioRepository ordenLaboratorioRepository;

    @GetMapping
    public ResponseEntity<List<OrdenLaboratorio>> getOrdenes() {
        return ResponseEntity.ok(ordenLaboratorioRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<OrdenLaboratorio> crearOrden(@RequestBody OrdenLaboratorio orden) {
        OrdenLaboratorio guardada = ordenLaboratorioRepository.save(orden);
        return ResponseEntity.ok(guardada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdenLaboratorio> actualizarOrden(@PathVariable Long id, @RequestBody OrdenLaboratorio ordenDetails) {
        Optional<OrdenLaboratorio> oOpt = ordenLaboratorioRepository.findById(id);
        if (oOpt.isPresent()) {
            ordenDetails.setId(id);
            return ResponseEntity.ok(ordenLaboratorioRepository.save(ordenDetails));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOrden(@PathVariable Long id) {
        if (ordenLaboratorioRepository.existsById(id)) {
            ordenLaboratorioRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

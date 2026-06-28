package com.utp.tridentist.controller;

import com.utp.tridentist.model.Presupuesto;
import com.utp.tridentist.repository.PresupuestoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/presupuestos")
@CrossOrigin(origins = "*")
public class PresupuestoController {

    @Autowired
    private PresupuestoRepository presupuestoRepository;

    @GetMapping
    public ResponseEntity<List<Presupuesto>> getAll() {
        return ResponseEntity.ok(presupuestoRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Presupuesto> getById(@PathVariable Long id) {
        Optional<Presupuesto> presOpt = presupuestoRepository.findById(id);
        return presOpt.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Presupuesto> guardarPresupuesto(@RequestBody Presupuesto presupuesto) {
        if (presupuesto.getItems() != null) {
            presupuesto.getItems().forEach(item -> item.setPresupuesto(presupuesto));
        }
        Presupuesto guardado = presupuestoRepository.save(presupuesto);
        return ResponseEntity.ok(guardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Presupuesto> actualizarPresupuesto(@PathVariable Long id, @RequestBody Presupuesto presDetails) {
        Optional<Presupuesto> presOpt = presupuestoRepository.findById(id);
        if (presOpt.isPresent()) {
            presDetails.setId(id);
            if (presDetails.getItems() != null) {
                presDetails.getItems().forEach(item -> item.setPresupuesto(presDetails));
            }
            Presupuesto actualizado = presupuestoRepository.save(presDetails);
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPresupuesto(@PathVariable Long id) {
        if (presupuestoRepository.existsById(id)) {
            presupuestoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

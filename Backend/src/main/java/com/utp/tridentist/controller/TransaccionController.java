package com.utp.tridentist.controller;

import com.utp.tridentist.model.Transaccion;
import com.utp.tridentist.repository.TransaccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/caja/transacciones")
@CrossOrigin(origins = "*")
public class TransaccionController {

    @Autowired
    private TransaccionRepository transaccionRepository;

    @PostMapping
    public ResponseEntity<Transaccion> registrarTransaccion(@RequestBody Transaccion transaccion) {
        Transaccion guardada = transaccionRepository.save(transaccion);
        return ResponseEntity.ok(guardada);
    }

    @GetMapping
    public ResponseEntity<List<Transaccion>> getTransacciones(@RequestParam(value = "cajaId", required = false) Long cajaId) {
        if (cajaId != null) {
            return ResponseEntity.ok(transaccionRepository.findByCajaId(cajaId));
        }
        return ResponseEntity.ok(transaccionRepository.findAll());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaccion> actualizarTransaccion(@PathVariable Long id, @RequestBody Transaccion tDetails) {
        Optional<Transaccion> tOpt = transaccionRepository.findById(id);
        if (tOpt.isPresent()) {
            tDetails.setId(id);
            Transaccion actualizada = transaccionRepository.save(tDetails);
            return ResponseEntity.ok(actualizada);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTransaccion(@PathVariable Long id) {
        if (transaccionRepository.existsById(id)) {
            transaccionRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

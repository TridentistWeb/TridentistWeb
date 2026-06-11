package com.utp.tridentist.controller;

import com.utp.tridentist.model.Boleta;
import com.utp.tridentist.service.BoletaService;
import com.utp.tridentist.service.PdfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/boletas")
public class BoletaController {

    @Autowired
    private BoletaService service;

    @Autowired
    private PdfService pdfService;

    // 1. Obtener todas las boletas
    @GetMapping
    public List<Boleta> getAll() {
        return service.findAll();
    }

    // 2. Obtener boleta por ID
    @GetMapping("/{id}")
    public ResponseEntity<Boleta> getById(@PathVariable Integer id) {
        Optional<Boleta> entity = service.findById(id);
        return entity.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 3. Generar y descargar PDF de la boleta
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

    // 4. Crear una nueva boleta
    @PostMapping
    public Boleta create(@RequestBody Boleta entity) {
        return service.save(entity);
    }

    // 5. Actualizar una boleta existente
    @PutMapping("/{id}")
    public ResponseEntity<Boleta> update(@PathVariable Integer id, @RequestBody Boleta entityDetails) {
        return service.findById(id).map(existingEntity -> {
            // Se asume que el ID se maneja correctamente o viene en el payload
            return ResponseEntity.ok(service.save(entityDetails));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 6. Eliminar una boleta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
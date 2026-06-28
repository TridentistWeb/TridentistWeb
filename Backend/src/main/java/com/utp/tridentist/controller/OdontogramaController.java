package com.utp.tridentist.controller;

import com.utp.tridentist.dto.OdontogramaDTO;
import com.utp.tridentist.model.OdontogramaRegistro;
import com.utp.tridentist.service.OdontogramaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/odontograma")
@CrossOrigin(origins = "*")
public class OdontogramaController {

    @Autowired
    private OdontogramaService odontogramaService;

    @GetMapping("/{pacienteId}")
    public ResponseEntity<List<OdontogramaRegistro>> getOdontograma(@PathVariable Long pacienteId) {
        List<OdontogramaRegistro> registros = odontogramaService.getOdontogramaByPaciente(pacienteId);
        return ResponseEntity.ok(registros);
    }

    @PostMapping("/{pacienteId}")
    public ResponseEntity<List<OdontogramaRegistro>> guardarOdontograma(@PathVariable Long pacienteId, @RequestBody OdontogramaDTO dto) {
        List<OdontogramaRegistro> registros = dto.getRegistros() != null ? dto.getRegistros() : List.of();
        List<OdontogramaRegistro> guardados = odontogramaService.guardarOdontograma(pacienteId, registros, 1L);
        return ResponseEntity.ok(guardados);
    }

    @GetMapping("/{pacienteId}/historial")
    public ResponseEntity<List<OdontogramaRegistro>> getHistorial(@PathVariable Long pacienteId) {
        List<OdontogramaRegistro> registros = odontogramaService.getOdontogramaByPaciente(pacienteId);
        return ResponseEntity.ok(registros);
    }

    @DeleteMapping("/{pacienteId}")
    public ResponseEntity<Void> limpiarOdontograma(@PathVariable Long pacienteId) {
        odontogramaService.limpiarOdontograma(pacienteId);
        return ResponseEntity.ok().build();
    }
}

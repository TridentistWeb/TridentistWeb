package com.utp.tridentist.controller;

import com.utp.tridentist.dto.ReservaCitaDTO;
import com.utp.tridentist.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/citas")
public class PublicCitaController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/enviar-correo")
    public ResponseEntity<String> enviarReserva(@RequestBody ReservaCitaDTO reserva) {
        try {
            emailService.enviarCorreoReserva(reserva);
            return ResponseEntity.ok("{\"message\": \"Reserva enviada y correo notificado exitosamente\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("{\"error\": \"Hubo un problema al enviar la reserva por correo\"}");
        }
    }
}

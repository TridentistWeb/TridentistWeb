package com.utp.tridentist.service;

import com.utp.tridentist.dto.ReservaCitaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.admin.email:info@tridentist.com}")
    private String adminEmail;

    public void enviarCorreoReserva(ReservaCitaDTO reserva) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(adminEmail);
        message.setSubject("NUEVA SOLICITUD DE CITA: " + reserva.nombres());
        
        String comentario = (reserva.comentario() != null && !reserva.comentario().isBlank()) 
                            ? reserva.comentario() 
                            : "Ninguno";

        String texto = String.format("""
            Has recibido una nueva solicitud de reserva de cita desde la página web.
            
            DATOS DEL PACIENTE:
            --------------------------------------------------
            Nombres: %s
            Correo: %s
            Teléfono: %s
            ¿Cómo se enteró?: %s
            
            DETALLES DE LA RESERVA:
            --------------------------------------------------
            Especialidad requerida: %s
            Fecha sugerida: %s
            Hora sugerida: %s
            
            COMENTARIO ADICIONAL:
            --------------------------------------------------
            %s
            """,
            reserva.nombres(),
            reserva.email(),
            reserva.telefono(),
            reserva.comoSeEntero(),
            reserva.especialidad(),
            reserva.fecha(),
            reserva.hora(),
            comentario
        );
        
        message.setText(texto);
        mailSender.send(message);
    }
}

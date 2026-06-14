package com.utp.tridentist.dto;

public record ReservaCitaDTO(
    String nombres,
    String email,
    String telefono,
    String comoSeEntero,
    String especialidad,
    String fecha,
    String hora,
    String comentario
) {}

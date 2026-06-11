package com.utp.tridentist.dto;

import java.time.LocalDateTime;

public class CitaDetalleDTO {
    private Integer idCita;
    private LocalDateTime fechaHora;
    private String pacienteNombre;
    private String doctorNombre;
    private String especialidad;
    private String tratamientoDescripcion;
    private String estado;

    public CitaDetalleDTO(Integer idCita, LocalDateTime fechaHora, String pacienteNombre, String doctorNombre, String especialidad, String tratamientoDescripcion, String estado) {
        this.idCita = idCita;
        this.fechaHora = fechaHora;
        this.pacienteNombre = pacienteNombre;
        this.doctorNombre = doctorNombre;
        this.especialidad = especialidad;
        this.tratamientoDescripcion = tratamientoDescripcion;
        this.estado = estado;
    }

    // Getters and Setters
    public Integer getIdCita() { return idCita; }
    public void setIdCita(Integer idCita) { this.idCita = idCita; }
    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }
    public String getPacienteNombre() { return pacienteNombre; }
    public void setPacienteNombre(String pacienteNombre) { this.pacienteNombre = pacienteNombre; }
    public String getDoctorNombre() { return doctorNombre; }
    public void setDoctorNombre(String doctorNombre) { this.doctorNombre = doctorNombre; }
    public String getEspecialidad() { return especialidad; }
    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }
    public String getTratamientoDescripcion() { return tratamientoDescripcion; }
    public void setTratamientoDescripcion(String tratamientoDescripcion) { this.tratamientoDescripcion = tratamientoDescripcion; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}

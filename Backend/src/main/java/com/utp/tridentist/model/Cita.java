package com.utp.tridentist.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Citas")
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cita")
    private Integer idCita;

    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;

    @ManyToOne
    @JoinColumn(name = "codigo_paciente", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "codigo_doctor", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "id_tratamiento", nullable = false)
    private Tratamiento tratamiento;

    @Column(name = "estado", length = 20)
    private String estado = "Pendiente";

    // Getters and Setters
    public Integer getIdCita() { return idCita; }
    public void setIdCita(Integer idCita) { this.idCita = idCita; }

    public LocalDateTime getFechaHora() { return fechaHora; }
    public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }

    public Paciente getPaciente() { return paciente; }
    public void setPaciente(Paciente paciente) { this.paciente = paciente; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public Tratamiento getTratamiento() { return tratamiento; }
    public void setTratamiento(Tratamiento tratamiento) { this.tratamiento = tratamiento; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}

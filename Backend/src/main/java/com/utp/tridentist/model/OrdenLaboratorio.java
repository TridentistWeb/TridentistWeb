package com.utp.tridentist.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "ordenes_laboratorio")
public class OrdenLaboratorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trabajo", nullable = false)
    private String trabajo;

    @Column(name = "paciente_id")
    private Long pacienteId;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "laboratorio")
    private String laboratorio;

    @Column(name = "fecha_envio")
    private LocalDate fechaEnvio;

    @Column(name = "fecha_entrega")
    private LocalDate fechaEntrega;

    @Column(name = "estado")
    private String estado = "ENVIADO";

    @Column(name = "costo", precision = 10, scale = 2)
    private BigDecimal costo;

    public OrdenLaboratorio() {
    }

    public OrdenLaboratorio(Long id, String trabajo, Long pacienteId, Long doctorId, String laboratorio, LocalDate fechaEnvio, LocalDate fechaEntrega, String estado, BigDecimal costo) {
        this.id = id;
        this.trabajo = trabajo;
        this.pacienteId = pacienteId;
        this.doctorId = doctorId;
        this.laboratorio = laboratorio;
        this.fechaEnvio = fechaEnvio;
        this.fechaEntrega = fechaEntrega;
        if (estado != null) {
            this.estado = estado;
        }
        this.costo = costo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrabajo() {
        return trabajo;
    }

    public void setTrabajo(String trabajo) {
        this.trabajo = trabajo;
    }

    public Long getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getLaboratorio() {
        return laboratorio;
    }

    public void setLaboratorio(String laboratorio) {
        this.laboratorio = laboratorio;
    }

    public LocalDate getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(LocalDate fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public BigDecimal getCosto() {
        return costo;
    }

    public void setCosto(BigDecimal costo) {
        this.costo = costo;
    }
}

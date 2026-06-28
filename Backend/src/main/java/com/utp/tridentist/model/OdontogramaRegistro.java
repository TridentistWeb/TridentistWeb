package com.utp.tridentist.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "odontograma_registros")
public class OdontogramaRegistro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "paciente_id", nullable = false)
    private Long pacienteId;

    @Column(name = "numero_diente", nullable = false)
    private Integer numeroDiente;

    @Column(name = "cara", nullable = false)
    private String cara; // mesial, distal, oclusal, vestibular, lingual, completo

    @Column(name = "condicion")
    private String condicion; // caries, obturacion, corona, extraccion_indicada, ausente, fractura, endodoncia, implante

    @Column(name = "notas", columnDefinition = "TEXT")
    private String notas;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;

    @Column(name = "doctor_id")
    private Long doctorId;

    @Column(name = "creado_en")
    private LocalDateTime creadoEn;

    @Column(name = "actualizado_en")
    private LocalDateTime actualizadoEn;

    public OdontogramaRegistro() {
    }

    public OdontogramaRegistro(Long id, Long pacienteId, Integer numeroDiente, String cara, String condicion, String notas, LocalDate fechaRegistro, Long doctorId) {
        this.id = id;
        this.pacienteId = pacienteId;
        this.numeroDiente = numeroDiente;
        this.cara = cara;
        this.condicion = condicion;
        this.notas = notas;
        this.fechaRegistro = fechaRegistro;
        this.doctorId = doctorId;
    }

    @PrePersist
    protected void onCreate() {
        this.creadoEn = LocalDateTime.now();
        this.actualizadoEn = LocalDateTime.now();
        if (this.fechaRegistro == null) {
            this.fechaRegistro = LocalDate.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.actualizadoEn = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPacienteId() {
        return pacienteId;
    }

    public void setPacienteId(Long pacienteId) {
        this.pacienteId = pacienteId;
    }

    public Integer getNumeroDiente() {
        return numeroDiente;
    }

    public void setNumeroDiente(Integer numeroDiente) {
        this.numeroDiente = numeroDiente;
    }

    public String getCara() {
        return cara;
    }

    public void setCara(String cara) {
        this.cara = cara;
    }

    public String getCondicion() {
        return condicion;
    }

    public void setCondicion(String condicion) {
        this.condicion = condicion;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public LocalDate getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDate fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDateTime getCreadoEn() {
        return creadoEn;
    }

    public void setCreadoEn(LocalDateTime creadoEn) {
        this.creadoEn = creadoEn;
    }

    public LocalDateTime getActualizadoEn() {
        return actualizadoEn;
    }

    public void setActualizadoEn(LocalDateTime actualizadoEn) {
        this.actualizadoEn = actualizadoEn;
    }
}

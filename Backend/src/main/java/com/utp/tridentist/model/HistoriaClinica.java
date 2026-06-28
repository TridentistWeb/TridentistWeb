package com.utp.tridentist.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "historias_clinicas")
public class HistoriaClinica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "paciente_id", unique = true, nullable = false)
    private Long pacienteId;

    @Column(name = "anamnesis", columnDefinition = "TEXT")
    private String anamnesis;

    @Column(name = "notas_evolucion", columnDefinition = "TEXT")
    private String notasEvolucion;

    @Column(name = "creado_en")
    private LocalDateTime creadoEn;

    @Column(name = "actualizado_en")
    private LocalDateTime actualizadoEn;

    @OneToMany(mappedBy = "historiaClinica", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TratamientoDiente> tratamientosDiente = new ArrayList<>();

    public HistoriaClinica() {
    }

    public HistoriaClinica(Long id, Long pacienteId, String anamnesis, String notasEvolucion, LocalDateTime creadoEn, LocalDateTime actualizadoEn) {
        this.id = id;
        this.pacienteId = pacienteId;
        this.anamnesis = anamnesis;
        this.notasEvolucion = notasEvolucion;
        this.creadoEn = creadoEn;
        this.actualizadoEn = actualizadoEn;
    }

    @PrePersist
    protected void onCreate() {
        this.creadoEn = LocalDateTime.now();
        this.actualizadoEn = LocalDateTime.now();
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

    public String getAnamnesis() {
        return anamnesis;
    }

    public void setAnamnesis(String anamnesis) {
        this.anamnesis = anamnesis;
    }

    public String getNotasEvolucion() {
        return notasEvolucion;
    }

    public void setNotasEvolucion(String notasEvolucion) {
        this.notasEvolucion = notasEvolucion;
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

    public List<TratamientoDiente> getTratamientosDiente() {
        return tratamientosDiente;
    }

    public void setTratamientosDiente(List<TratamientoDiente> tratamientosDiente) {
        this.tratamientosDiente = tratamientosDiente;
    }
}

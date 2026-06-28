package com.utp.tridentist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "tratamientos_diente")
public class TratamientoDiente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_diente", nullable = false)
    private Integer numeroDiente;

    @Column(name = "cara_diente")
    private String caraDiente;

    @Column(name = "estado_diente")
    private String estadoDiente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "historia_clinica_id")
    @JsonIgnore
    private HistoriaClinica historiaClinica;

    public TratamientoDiente() {
    }

    public TratamientoDiente(Long id, Integer numeroDiente, String caraDiente, String estadoDiente, HistoriaClinica historiaClinica) {
        this.id = id;
        this.numeroDiente = numeroDiente;
        this.caraDiente = caraDiente;
        this.estadoDiente = estadoDiente;
        this.historiaClinica = historiaClinica;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumeroDiente() {
        return numeroDiente;
    }

    public void setNumeroDiente(Integer numeroDiente) {
        this.numeroDiente = numeroDiente;
    }

    public String getCaraDiente() {
        return caraDiente;
    }

    public void setCaraDiente(String caraDiente) {
        this.caraDiente = caraDiente;
    }

    public String getEstadoDiente() {
        return estadoDiente;
    }

    public void setEstadoDiente(String estadoDiente) {
        this.estadoDiente = estadoDiente;
    }

    public HistoriaClinica getHistoriaClinica() {
        return historiaClinica;
    }

    public void setHistoriaClinica(HistoriaClinica historiaClinica) {
        this.historiaClinica = historiaClinica;
    }
}

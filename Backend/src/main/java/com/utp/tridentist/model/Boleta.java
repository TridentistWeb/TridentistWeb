package com.utp.tridentist.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Boleta")
public class Boleta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "numero_boleta")
    private Integer numeroBoleta;

    @Column(name = "fecha_emision", nullable = false)
    private LocalDateTime fechaEmision;

    @ManyToOne
    @JoinColumn(name = "codigo_paciente", nullable = false)
    private Paciente paciente;

    @Transient
    private Integer pacienteId;

    @Column(name = "total", nullable = false, precision = 10, scale = 2)
    private BigDecimal total = BigDecimal.ZERO;

    public Boleta() {
    }

    public Integer getId() {
        return numeroBoleta;
    }

    public void setId(Integer id) {
        this.numeroBoleta = id;
    }

    public Integer getNumeroBoleta() { 
        return numeroBoleta; 
    }
    
    public void setNumeroBoleta(Integer numeroBoleta) { 
        this.numeroBoleta = numeroBoleta; 
    }

    public LocalDateTime getFechaEmision() { 
        return fechaEmision; 
    }
    
    public void setFechaEmision(LocalDateTime fechaEmision) { 
        this.fechaEmision = fechaEmision; 
    }

    public Paciente getPaciente() { 
        return paciente; 
    }
    
    public void setPaciente(Paciente paciente) { 
        this.paciente = paciente; 
        if (paciente != null) {
            this.pacienteId = paciente.getCodigo();
        }
    }

    public Integer getPacienteId() {
        if (pacienteId != null) return pacienteId;
        if (paciente != null) return paciente.getCodigo();
        return null;
    }

    public void setPacienteId(Integer pacienteId) {
        this.pacienteId = pacienteId;
    }

    public BigDecimal getTotal() { 
        return total; 
    }
    
    public void setTotal(BigDecimal total) { 
        this.total = total; 
    }
}

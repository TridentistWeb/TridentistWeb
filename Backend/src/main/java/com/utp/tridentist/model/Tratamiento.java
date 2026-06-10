package com.utp.tridentist.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Tratamientos")
public class Tratamiento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tratamiento")
    private Integer idTratamiento;

    @Column(name = "descripcion", nullable = false, length = 255)
    private String descripcion;

    @Column(name = "precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    // Getters and Setters
    public Integer getIdTratamiento() { return idTratamiento; }
    public void setIdTratamiento(Integer idTratamiento) { this.idTratamiento = idTratamiento; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }
}

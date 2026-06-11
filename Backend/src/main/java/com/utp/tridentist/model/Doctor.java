package com.utp.tridentist.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Doctores")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codigo;

    @Column(name = "DNI", unique = true, nullable = false, length = 8)
    private String dni;

    @Column(name = "Nombres", nullable = false, length = 100)
    private String nombres;

    @Column(name = "Apellidos", nullable = false, length = 100)
    private String apellidos;

    @Column(name = "Especialidad", nullable = false, length = 50)
    private String especialidad;

    @Column(name = "Celular", length = 15)
    private String celular;

    @Column(name = "Email", length = 100)
    private String email;

    @Column(name = "video_url")
    private String videoUrl;

    // Getters and Setters
    public Integer getCodigo() { return codigo; }
    public void setCodigo(Integer codigo) { this.codigo = codigo; }

    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }

    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getEspecialidad() { return especialidad; }
    public void setEspecialidad(String especialidad) { this.especialidad = especialidad; }

    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
}

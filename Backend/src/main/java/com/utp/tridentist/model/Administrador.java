package com.utp.tridentist.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "Administrador")
public class Administrador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codigo;

    @Column(name = "DNI")
    private String dni;
    
    @Column(name = "Nombres")
    private String nombres;
    
    @Column(name = "Apellidos")
    private String apellidos;
    
    @Column(name = "Celular")
    private String celular;
    
    @Column(name = "Email")
    private String email;
    
    // We'll need a password field, but it wasn't in schema.sql
    // For now, let's use DNI as password for demonstration, or add a field if possible.
    // Adding a password field to the entity, if the DB allows it, we can alter the table.
    @Column(name = "password")
    private String password;

    public Administrador() {
    }

    public Integer getCodigo() { return codigo; }
    public void setCodigo(Integer codigo) { this.codigo = codigo; }

    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }

    public String getNombres() { return nombres; }
    public void setNombres(String nombres) { this.nombres = nombres; }

    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }

    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

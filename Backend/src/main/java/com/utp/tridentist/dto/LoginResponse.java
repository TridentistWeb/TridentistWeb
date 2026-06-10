package com.utp.tridentist.dto;

public class LoginResponse {
    private String token;
    private String email;
    private String nombres;
    private String apellidos;

    public LoginResponse(String token, String email, String nombres, String apellidos) {
        this.token = token;
        this.email = email;
        this.nombres = nombres;
        this.apellidos = apellidos;
    }

    public String getToken() { return token; }
    public String getEmail() { return email; }
    public String getNombres() { return nombres; }
    public String getApellidos() { return apellidos; }
}

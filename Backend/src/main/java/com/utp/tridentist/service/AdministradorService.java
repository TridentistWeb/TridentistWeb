package com.utp.tridentist.service;

import com.utp.tridentist.model.Administrador;
import com.utp.tridentist.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Administrador> listarAdministradores() {
        return administradorRepository.findAll();
    }

    public Optional<Administrador> obtenerAdministradorPorId(Integer id) {
        return administradorRepository.findById(id);
    }

    public Administrador guardarAdministrador(Administrador admin) {
        if (admin.getPassword() != null && !admin.getPassword().isEmpty()) {
            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        }
        return administradorRepository.save(admin);
    }

    public void eliminarAdministrador(Integer id) {
        administradorRepository.deleteById(id);
    }
}

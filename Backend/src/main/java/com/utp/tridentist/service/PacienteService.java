package com.utp.tridentist.service;

import com.utp.tridentist.model.Paciente;
import com.utp.tridentist.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository repository;

    public List<Paciente> findAll() {
        return repository.findAll();
    }

    public Optional<Paciente> findById(Integer id) {
        return repository.findById(id);
    }

    public Paciente save(Paciente entity) {
        return repository.save(entity);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}

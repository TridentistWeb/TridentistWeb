package com.utp.tridentist.service;

import com.utp.tridentist.model.Cita;
import com.utp.tridentist.repository.CitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CitaService {

    @Autowired
    private CitaRepository repository;

    public List<Cita> findAll() {
        return repository.findAll();
    }

    public Optional<Cita> findById(Long id) {
        return repository.findById(id);
    }

    public Cita save(Cita entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}

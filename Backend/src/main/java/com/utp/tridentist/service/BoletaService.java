package com.utp.tridentist.service;

import com.utp.tridentist.model.Boleta;
import com.utp.tridentist.repository.BoletaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoletaService {

    @Autowired
    private BoletaRepository repository;

    public List<Boleta> findAll() {
        return repository.findAll();
    }

    public Optional<Boleta> findById(Integer id) {
        return repository.findById(id);
    }

    public Boleta save(Boleta entity) {
        return repository.save(entity);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}

package com.utp.tridentist.service;

import com.utp.tridentist.model.Tratamiento;
import com.utp.tridentist.repository.TratamientoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TratamientoService {

    @Autowired
    private TratamientoRepository repository;

    public List<Tratamiento> findAll() {
        return repository.findAll();
    }

    public Optional<Tratamiento> findById(Integer id) {
        return repository.findById(id);
    }

    public Tratamiento save(Tratamiento entity) {
        return repository.save(entity);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}

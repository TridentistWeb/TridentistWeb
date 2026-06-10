package com.utp.tridentist.service;

import com.utp.tridentist.model.DetalleBoleta;
import com.utp.tridentist.repository.DetalleBoletaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetalleBoletaService {

    @Autowired
    private DetalleBoletaRepository repository;

    public List<DetalleBoleta> findAll() {
        return repository.findAll();
    }

    public Optional<DetalleBoleta> findById(Integer id) {
        return repository.findById(id);
    }

    public DetalleBoleta save(DetalleBoleta entity) {
        return repository.save(entity);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}

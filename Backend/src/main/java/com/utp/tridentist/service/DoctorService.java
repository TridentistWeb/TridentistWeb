package com.utp.tridentist.service;

import com.utp.tridentist.model.Doctor;
import com.utp.tridentist.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository repository;

    public List<Doctor> findAll() {
        return repository.findAll();
    }

    public Optional<Doctor> findById(Integer id) {
        return repository.findById(id);
    }

    public Doctor save(Doctor entity) {
        return repository.save(entity);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}

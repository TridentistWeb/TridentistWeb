package com.utp.tridentist.repository;

import com.utp.tridentist.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    @Query("SELECT DISTINCT d.especialidad FROM Doctor d")
    List<String> findDistinctEspecialidades();

    List<Doctor> findByEspecialidad(String especialidad);
}

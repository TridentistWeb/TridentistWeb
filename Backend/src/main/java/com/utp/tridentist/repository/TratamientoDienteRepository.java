package com.utp.tridentist.repository;

import com.utp.tridentist.model.TratamientoDiente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TratamientoDienteRepository extends JpaRepository<TratamientoDiente, Long> {
}

package com.utp.tridentist.repository;

import com.utp.tridentist.model.OdontogramaRegistro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OdontogramaRepository extends JpaRepository<OdontogramaRegistro, Long> {
    List<OdontogramaRegistro> findByPacienteIdOrderByActualizadoEnDesc(Long pacienteId);
    Optional<OdontogramaRegistro> findByPacienteIdAndNumeroDienteAndCara(Long pacienteId, Integer numeroDiente, String cara);
    void deleteByPacienteId(Long pacienteId);
}

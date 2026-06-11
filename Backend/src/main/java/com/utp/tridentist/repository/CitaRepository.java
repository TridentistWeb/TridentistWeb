package com.utp.tridentist.repository;

import com.utp.tridentist.model.Cita;
import com.utp.tridentist.dto.CitaDetalleDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Integer> {
    
    @Query("SELECT new com.utp.tridentist.dto.CitaDetalleDTO(c.idCita, c.fechaHora, " +
           "CONCAT(p.nombres, ' ', p.apellidos), CONCAT(d.nombres, ' ', d.apellidos), " +
           "d.especialidad, t.descripcion, c.estado) " +
           "FROM Cita c " +
           "JOIN c.paciente p " +
           "JOIN c.doctor d " +
           "JOIN c.tratamiento t " +
           "WHERE d.codigo = :codigoDoctor")
    List<CitaDetalleDTO> findDetallesByDoctorId(@Param("codigoDoctor") Integer codigoDoctor);
}

package com.utp.tridentist.repository;

import com.utp.tridentist.model.DetalleBoleta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DetalleBoletaRepository extends JpaRepository<DetalleBoleta, Integer> {
    
    // Al pasarle el objeto Boleta, Spring JPA mapeará automáticamente el campo 'numero_boleta' en la consulta SQL
    List<DetalleBoleta> findByBoletaNumeroBoleta(Integer numeroBoleta);
}
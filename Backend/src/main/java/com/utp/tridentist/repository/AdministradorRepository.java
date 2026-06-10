package com.utp.tridentist.repository;

import com.utp.tridentist.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AdministradorRepository extends JpaRepository<Administrador, Integer> {
    Optional<Administrador> findByDni(String dni);
    Optional<Administrador> findByEmail(String email);
}

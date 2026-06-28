package com.utp.tridentist.repository;

import com.utp.tridentist.model.PresupuestoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PresupuestoItemRepository extends JpaRepository<PresupuestoItem, Long> {
}

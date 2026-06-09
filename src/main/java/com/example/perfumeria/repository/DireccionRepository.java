package com.example.perfumeria.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.perfumeria.models.Direccion;

public interface DireccionRepository extends JpaRepository<Direccion,Long> {

    List<Direccion> findByUsuarioId(Long usuarioId);

}

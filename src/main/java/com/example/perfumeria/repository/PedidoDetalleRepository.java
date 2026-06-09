package com.example.perfumeria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.perfumeria.models.PedidoDetalle;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {

}

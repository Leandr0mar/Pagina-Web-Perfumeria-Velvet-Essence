package com.example.perfumeria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.perfumeria.models.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

}

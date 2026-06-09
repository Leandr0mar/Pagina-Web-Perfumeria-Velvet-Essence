package com.example.perfumeria.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.perfumeria.models.PedidoDetalle;
import com.example.perfumeria.repository.PedidoDetalleRepository;

@Service
public class PedidoDetalleService {

    private final PedidoDetalleRepository repository;

    // Inyección por constructor
    public PedidoDetalleService(PedidoDetalleRepository repository) {
        this.repository = repository;
    }

    // 1. Listar todos los detalles de pedidos
    public List<PedidoDetalle> listarTodos() {
        return repository.findAll();
    }

    // 2. Buscar un detalle por su ID
    public PedidoDetalle buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle de pedido no encontrado con el ID: " + id));
    }

    // 3. Registrar un nuevo detalle
    public PedidoDetalle crear(PedidoDetalle pedidoDetalle) {
        return repository.save(pedidoDetalle);
    }

    // 4. Actualizar un detalle existente
    public PedidoDetalle actualizar(Long id, PedidoDetalle detalleActualizado) {
        PedidoDetalle detalle = buscarPorId(id);

        detalle.setPedido(detalleActualizado.getPedido());
        detalle.setPerfume(detalleActualizado.getPerfume());
        detalle.setCantidad(detalleActualizado.getCantidad());

        return repository.save(detalle);
    }

    // 5. Eliminar un detalle por ID
    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Detalle de pedido no encontrado con el ID: " + id);
        }
        repository.deleteById(id);
    }
}
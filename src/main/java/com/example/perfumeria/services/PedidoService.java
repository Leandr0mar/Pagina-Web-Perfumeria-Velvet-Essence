package com.example.perfumeria.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.perfumeria.models.Pedido;
import com.example.perfumeria.repository.PedidoRepository;

@Service
public class PedidoService {

    private final PedidoRepository repository;

    // Inyección por constructor
    public PedidoService(PedidoRepository repository) {
        this.repository = repository;
    }

    // 1. Listar todos los pedidos
    public List<Pedido> listarTodos() {
        return repository.findAll();
    }

    // 2. Buscar un pedido por su ID
    public Pedido buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado con el ID: " + id));
    }

    // 3. Registrar un nuevo pedido
    public Pedido crear(Pedido pedido) {
        // Enlazar cada detalle con este pedido antes de guardarlo en la BD
        if (pedido.getPedidoDetalles() != null) {
            pedido.getPedidoDetalles().forEach(detalle -> detalle.setPedido(pedido));
        }
        return repository.save(pedido);
    }

    // 4. Actualizar un pedido existente
    public Pedido actualizar(Long id, Pedido pedidoActualizado) {
        Pedido pedido = buscarPorId(id);

        pedido.setUsuario(pedidoActualizado.getUsuario());
        pedido.setFechaPedido(pedidoActualizado.getFechaPedido());
        pedido.setTotalPagado(pedidoActualizado.getTotalPagado());
        
        // Al actualizar los detalles en cascada, JPA limpia los anteriores y añade los nuevos
        pedido.setPedidoDetalles(pedidoActualizado.getPedidoDetalles());
        pedido.setDireccion(pedidoActualizado.getDireccion());

        return repository.save(pedido);
    }

    // 5. Eliminar un pedido por ID
    public void eliminar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Pedido no encontrado con el ID: " + id);
        }
        repository.deleteById(id);
    }
}
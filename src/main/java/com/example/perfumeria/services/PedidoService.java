package com.example.perfumeria.services;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import com.example.perfumeria.models.Pedido;
import com.example.perfumeria.repository.DireccionRepository;
import com.example.perfumeria.repository.PedidoRepository;
import com.example.perfumeria.repository.PerfumeRepository;

@Service
public class PedidoService {

    private final PedidoRepository repository;
    private final DireccionRepository direccionRepository;
    private final PerfumeRepository perfumeRepository;
    

    public PedidoService(PedidoRepository repository, 
                         DireccionRepository direccionRepository, 
                         PerfumeRepository perfumeRepository) {
        this.repository = repository;
        this.direccionRepository = direccionRepository;
        this.perfumeRepository = perfumeRepository;
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
        // 1. Establecer la fecha actual en el servidor
        pedido.setFechaPedido(LocalDateTime.now());
        
        // 2. Validar que la dirección exista
        var direccion = direccionRepository.findById(pedido.getDireccion().getId())
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));
        pedido.setDireccion(direccion);

        // 3. Validar perfumes y enlazar el pedido a los detalles
        if (pedido.getPedidoDetalles() != null) {
            pedido.getPedidoDetalles().forEach(detalle -> {
                var perfume = perfumeRepository.findById(detalle.getPerfume().getId())
                        .orElseThrow(() -> new RuntimeException("Perfume no encontrado: " + detalle.getPerfume().getId()));
                
                detalle.setPerfume(perfume);
                detalle.setPedido(pedido); // Enlaza el detalle al pedido actual
            });
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
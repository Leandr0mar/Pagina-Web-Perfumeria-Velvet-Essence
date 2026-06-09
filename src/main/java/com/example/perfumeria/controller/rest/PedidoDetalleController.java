package com.example.perfumeria.controller.rest;

import com.example.perfumeria.models.PedidoDetalle;
import com.example.perfumeria.services.PedidoDetalleService;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/pedido-detalles")
public class PedidoDetalleController {

    private final PedidoDetalleService service;

    // Inyección por constructor
    public PedidoDetalleController(PedidoDetalleService service) {
        this.service = service;
    }

    // 1. Listar todos los detalles de pedidos
    @GetMapping
    public ResponseEntity<List<PedidoDetalle>> listarTodos() {
        List<PedidoDetalle> detalles = service.listarTodos();
        return ResponseEntity.ok(detalles);
    }

    // 2. Buscar un detalle por su ID
    @GetMapping("/{id}")
    public ResponseEntity<PedidoDetalle> buscarPorId(@PathVariable Long id) {
        try {
            PedidoDetalle detalle = service.buscarPorId(id);
            return ResponseEntity.ok(detalle);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 3. Crear una línea de detalle individual
    @PostMapping
    public ResponseEntity<PedidoDetalle> crear(@Valid @RequestBody PedidoDetalle pedidoDetalle) {
        PedidoDetalle nuevoDetalle = service.crear(pedidoDetalle);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoDetalle);
    }

    // 4. Actualizar un detalle específico
    @PutMapping("/{id}")
    public ResponseEntity<PedidoDetalle> actualizar(@PathVariable Long id, @Valid @RequestBody PedidoDetalle detalleActualizado) {
        try {
            PedidoDetalle detalleEditado = service.actualizar(id, detalleActualizado);
            return ResponseEntity.ok(detalleEditado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. Eliminar una línea de detalle por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        try {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
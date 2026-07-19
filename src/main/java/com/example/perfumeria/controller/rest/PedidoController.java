package com.example.perfumeria.controller.rest;

import com.example.perfumeria.models.Pedido;
import com.example.perfumeria.models.Usuario;
import com.example.perfumeria.repository.UsuarioRepository;
import com.example.perfumeria.services.PedidoService;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    private final PedidoService service;
    private final UsuarioRepository usuarios;

    // Inyección por constructor
    public PedidoController(PedidoService service, UsuarioRepository usuarios) {
        this.service = service;
        this.usuarios = usuarios;
    }

    // 1. Listar todos los pedidos
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Pedido>> listarTodos() {
        List<Pedido> pedidos = service.listarTodos();
        return ResponseEntity.ok(pedidos);
    }

    // 2. Buscar pedido por ID
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Pedido> buscarPorId(@PathVariable Long id) {
        try {
            Pedido pedido = service.buscarPorId(id);
            return ResponseEntity.ok(pedido);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 3. Crear / Procesar un pedido
@PostMapping
    public ResponseEntity<Pedido> crear(@Valid @RequestBody Pedido pedido, Authentication authentication) {
        // 1. Obtenemos el usuario autenticado a través del JWT
        Usuario usuarioActual = usuarios.findByCorreo(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuario no autenticado"));
        
        // 2. Asignamos el usuario real al pedido (ignorando el que venga del frontend)
        pedido.setUsuario(usuarioActual);
        
        Pedido nuevoPedido = service.crear(pedido);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPedido);
    }

    // 4. Actualizar pedido
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Pedido> actualizar(@PathVariable Long id, @Valid @RequestBody Pedido pedidoActualizado) {
        try {
            Pedido pedidoEditado = service.actualizar(id, pedidoActualizado);
            return ResponseEntity.ok(pedidoEditado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. Eliminar pedido (Se elimina en cascada junto con sus detalles)
    @PreAuthorize("hasRole('ADMIN')")
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

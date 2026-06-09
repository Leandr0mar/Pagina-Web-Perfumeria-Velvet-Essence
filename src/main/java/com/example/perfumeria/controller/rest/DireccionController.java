package com.example.perfumeria.controller.rest;

import com.example.perfumeria.dto.DireccionRequest;
import com.example.perfumeria.models.Direccion;
import com.example.perfumeria.services.DireccionService;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/direcciones")
public class DireccionController {

    private final DireccionService service;

    // Inyección por constructor
    public DireccionController(DireccionService service) {
        this.service = service;
    }

    // 1. Listar todas las direcciones
    @GetMapping
    public ResponseEntity<List<Direccion>> listarTodas() {
        List<Direccion> direcciones = service.listarTodas();
        return ResponseEntity.ok(direcciones);
    }

    // 1b. Listar direcciones de un usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Direccion>> listarPorUsuario(@PathVariable Long usuarioId) {
        List<Direccion> direcciones = service.listarPorUsuarioId(usuarioId);
        return ResponseEntity.ok(direcciones);
    }

    // 2. Buscar dirección por ID
    @GetMapping("/{id}")
    public ResponseEntity<Direccion> buscarPorId(@PathVariable Long id) {
        try {
            Direccion direccion = service.buscarPorId(id);
            return ResponseEntity.ok(direccion);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 3. Crear dirección
    @PostMapping
    public ResponseEntity<Direccion> crear(@Valid @RequestBody DireccionRequest request) {
        Direccion direccion = new Direccion();
        direccion.setPais(request.getPais());
        direccion.setDepartamento(request.getDepartamento());
        direccion.setDistrito(request.getDistrito());
        direccion.setDireccion(request.getDireccion());
        direccion.setCodigoPostal(request.getCodigoPostal());

        Direccion nuevaDireccion = service.crear(direccion, request.getUsuarioId());
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaDireccion);
    }

    // 4. Actualizar dirección
    @PutMapping("/{id}")
    public ResponseEntity<Direccion> actualizar(@PathVariable Long id, @Valid @RequestBody DireccionRequest request) {
        try {
            Direccion direccionActualizada = new Direccion();
            direccionActualizada.setPais(request.getPais());
            direccionActualizada.setDepartamento(request.getDepartamento());
            direccionActualizada.setDistrito(request.getDistrito());
            direccionActualizada.setDireccion(request.getDireccion());
            direccionActualizada.setCodigoPostal(request.getCodigoPostal());

            Direccion direccionEditada = service.actualizar(id, direccionActualizada, request.getUsuarioId());
            return ResponseEntity.ok(direccionEditada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // 5. Eliminar dirección
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id, @RequestParam Long usuarioId) {
        try {
            service.eliminar(id, usuarioId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
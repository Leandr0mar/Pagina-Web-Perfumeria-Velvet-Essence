package com.example.perfumeria.controller.rest;

import com.example.perfumeria.dto.DireccionRequest;
import com.example.perfumeria.models.Direccion;
import com.example.perfumeria.models.Usuario;
import com.example.perfumeria.repository.UsuarioRepository;
import com.example.perfumeria.services.DireccionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/direcciones")
public class DireccionController {
    private final DireccionService service;
    private final UsuarioRepository usuarios;

    public DireccionController(DireccionService service, UsuarioRepository usuarios) {
        this.service = service;
        this.usuarios = usuarios;
    }

    @GetMapping
    public List<Direccion> misDirecciones(Authentication authentication) {
        return service.listarPorUsuarioId(usuarioActual(authentication).getId());
    }

    @PostMapping
    public ResponseEntity<Direccion> crear(@Valid @RequestBody DireccionRequest request,
                                           Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.crear(toEntity(request), usuarioActual(authentication).getId()));
    }

    @PutMapping("/{id}")
    public Direccion actualizar(@PathVariable Long id, @Valid @RequestBody DireccionRequest request,
                                Authentication authentication) {
        return service.actualizar(id, toEntity(request), usuarioActual(authentication).getId());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id, Authentication authentication) {
        service.eliminar(id, usuarioActual(authentication).getId());
    }

    private Usuario usuarioActual(Authentication authentication) {
        return usuarios.findByCorreo(authentication.getName())
                .orElseThrow(() -> new IllegalStateException("Usuario autenticado no encontrado"));
    }

    private Direccion toEntity(DireccionRequest request) {
        Direccion d = new Direccion();
        d.setPais(request.getPais());
        d.setDepartamento(request.getDepartamento());
        d.setDistrito(request.getDistrito());
        d.setDireccion(request.getDireccion());
        d.setCodigoPostal(request.getCodigoPostal());
        return d;
    }
}

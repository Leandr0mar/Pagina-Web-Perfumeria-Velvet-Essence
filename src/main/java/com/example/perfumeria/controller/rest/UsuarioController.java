package com.example.perfumeria.controller.rest;

import com.example.perfumeria.models.Usuario;
import com.example.perfumeria.services.UsuarioService;

import jakarta.validation.Valid;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    
    private final UsuarioService service;

    public UsuarioController(UsuarioService service){
        this.service = service;
    }

    // 1. Listar todos: Retorna 200 OK con la lista
    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos(){
        List<Usuario> usuarios = service.listarTodos();
        return ResponseEntity.ok(usuarios); 
    }

    // 2. Buscar por ID: Maneja el error si el ID no existe (Retorna 404 en vez de romper la app)
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        try {
            Usuario usuario = service.buscarPorId(id);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Retorna Código 404 Not Found
        }
    }
    
    // 3. Crear: Las buenas prácticas dictan retornar 201 Created cuando se guarda algo nuevo
    @PostMapping
    public ResponseEntity<Usuario> crear(@Valid @RequestBody Usuario usuario){
        Usuario nuevoUsuario = service.crear(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario); // Retorna Código 201 Created
    }
    
    // 4. Eliminar: Retorna 204 No Content porque el recurso ya no existe y no hay cuerpo que devolver
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id){
        try {
            service.eliminar(id);
            return ResponseEntity.noContent().build(); // Retorna Código 204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Retorna Código 404 si intentan borrar algo inexistente
        }
    }

    // 5. Actualizar: Retorna 200 OK con el usuario modificado, o 404 si falló la búsqueda
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizar(@PathVariable Long id, @RequestBody Usuario usuarioActualizado){
        try {
            Usuario usuarioEditado = service.actualizar(id, usuarioActualizado);
            return ResponseEntity.ok(usuarioEditado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
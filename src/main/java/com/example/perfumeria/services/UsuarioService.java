package com.example.perfumeria.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.perfumeria.models.Usuario;
import com.example.perfumeria.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    // Inyección por constructor
    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> listarTodos() {
        return repository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con el ID: " + id));
    }

    public Usuario crear(Usuario usuario) {
        // Aquí podrías agregar lógica de negocio antes de guardar, 
        // por ejemplo: encriptar la contraseña.
        return repository.save(usuario);
    }

    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        // Reutilizamos el método buscarPorId que ya maneja la excepción
        Usuario usuario = buscarPorId(id);

        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellido(usuarioActualizado.getApellido());
        usuario.setTelefono(usuarioActualizado.getTelefono());
        usuario.setCorreo(usuarioActualizado.getCorreo());
        usuario.setContrasenia(usuarioActualizado.getContrasenia());
        usuario.setEstado(usuarioActualizado.isEstado());

        return repository.save(usuario);
    }

    public void eliminar(Long id) {
        // Opcional: Podrías verificar si existe antes de borrar para lanzar un error controlado
        if (!repository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar. Usuario no encontrado con el ID: " + id);
        }
        repository.deleteById(id);
    }
}

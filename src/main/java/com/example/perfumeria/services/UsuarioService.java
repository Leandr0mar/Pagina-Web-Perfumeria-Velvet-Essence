package com.example.perfumeria.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.perfumeria.models.Usuario;
import com.example.perfumeria.repository.UsuarioRepository;
import com.example.perfumeria.models.Rol;
import com.example.perfumeria.repository.RolRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    // Inyección por constructor
    public UsuarioService(UsuarioRepository repository, RolRepository rolRepository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
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
        usuario.setContrasenia(passwordEncoder.encode(usuario.getContrasenia()));
        Rol cliente = rolRepository.findByName("ROLE_CLIENTE")
                .orElseGet(() -> rolRepository.save(new Rol(null, "ROLE_CLIENTE")));
        usuario.setRoles(java.util.Set.of(cliente));
        usuario.setEstado(true);
        return repository.save(usuario);
    }

    public Usuario actualizar(Long id, Usuario usuarioActualizado) {
        // Reutilizamos el método buscarPorId que ya maneja la excepción
        Usuario usuario = buscarPorId(id);

        usuario.setNombre(usuarioActualizado.getNombre());
        usuario.setApellido(usuarioActualizado.getApellido());
        usuario.setTelefono(usuarioActualizado.getTelefono());
        usuario.setCorreo(usuarioActualizado.getCorreo());
        if (usuarioActualizado.getContrasenia() != null && !usuarioActualizado.getContrasenia().isBlank()
                && !usuarioActualizado.getContrasenia().startsWith("$2")) {
            usuario.setContrasenia(passwordEncoder.encode(usuarioActualizado.getContrasenia()));
        }
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

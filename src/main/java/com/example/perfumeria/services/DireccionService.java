package com.example.perfumeria.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.perfumeria.models.Direccion;
import com.example.perfumeria.models.Usuario;
import com.example.perfumeria.repository.DireccionRepository;
import com.example.perfumeria.repository.UsuarioRepository;

@Service
public class DireccionService {

    private final DireccionRepository repository;
    private final UsuarioRepository usuarioRepository;

    // Inyección por constructor
    public DireccionService(DireccionRepository repository, UsuarioRepository usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    // 1. Listar todas las direcciones
    public List<Direccion> listarTodas() {
        return repository.findAll();
    }

    // 1b. Listar direcciones de un usuario
    public List<Direccion> listarPorUsuarioId(Long usuarioId) {
        return repository.findByUsuarioId(usuarioId);
    }

    // 2. Buscar una dirección por su ID
    public Direccion buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada con el ID: " + id));
    }

    // 3. Registrar una nueva dirección
    public Direccion crear(Direccion direccion, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con el ID: " + usuarioId));
        direccion.setUsuario(usuario);
        return repository.save(direccion);
    }

    // 4. Actualizar una dirección existente
    public Direccion actualizar(Long id, Direccion direccionActualizada, Long usuarioId) {
        Direccion direccion = buscarPorId(id);

        if (!direccion.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para actualizar esta dirección.");
        }

        direccion.setPais(direccionActualizada.getPais());
        direccion.setDepartamento(direccionActualizada.getDepartamento());
        direccion.setDistrito(direccionActualizada.getDistrito());
        direccion.setDireccion(direccionActualizada.getDireccion());
        direccion.setCodigoPostal(direccionActualizada.getCodigoPostal());
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con el ID: " + usuarioId));
        direccion.setUsuario(usuario);

        return repository.save(direccion);
    }

    // 5. Eliminar una dirección por ID
    public void eliminar(Long id, Long usuarioId) {
        Direccion direccion = buscarPorId(id);
        if (!direccion.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permiso para eliminar esta dirección.");
        }
        repository.deleteById(id);
    }
}
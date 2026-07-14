package com.example.perfumeria.repository;

import com.example.perfumeria.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Buscamos por correo en lugar de username genérico
    Optional<Usuario> findByCorreo(String correo);
}
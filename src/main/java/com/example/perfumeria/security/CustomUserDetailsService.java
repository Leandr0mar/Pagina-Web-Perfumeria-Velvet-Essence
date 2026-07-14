package com.example.perfumeria.security;

import com.example.perfumeria.models.Usuario;
import com.example.perfumeria.repository.UsuarioRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    CustomUserDetailsService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        // Usamos el correo ingresado en el login para buscar al usuario
        Usuario user = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con correo: " + correo));

        List<SimpleGrantedAuthority> authorities = (user.getRoles() == null ? java.util.Set.<com.example.perfumeria.models.Rol>of() : user.getRoles()).stream()
                .map(rol -> new SimpleGrantedAuthority(rol.getName())) // Ej: ROLE_ADMIN
                .collect(Collectors.toList());

        // Retornamos el UserDetails nativo de Spring usando el correo y la contraseña cifrada
        return new org.springframework.security.core.userdetails.User(
                user.getCorreo(), user.getContrasenia(), authorities);
    }
}

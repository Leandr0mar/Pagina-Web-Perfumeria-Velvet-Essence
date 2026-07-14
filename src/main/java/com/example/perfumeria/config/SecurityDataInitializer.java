package com.example.perfumeria.config;

import com.example.perfumeria.models.Rol;
import com.example.perfumeria.models.Usuario;
import com.example.perfumeria.repository.RolRepository;
import com.example.perfumeria.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class SecurityDataInitializer {
    @Bean
    CommandLineRunner seedSecurityData(RolRepository roles, UsuarioRepository usuarios,
                                        PasswordEncoder encoder,
                                        @Value("${app.security.seed-admin:true}") boolean seedAdmin,
                                        @Value("${app.security.admin-email:admin@velvet.com}") String email,
                                        @Value("${app.security.admin-password:Admin123!}") String password) {
        return args -> {
            roles.findByName("ROLE_CLIENTE").orElseGet(() -> roles.save(new Rol(null, "ROLE_CLIENTE")));
            Rol admin = roles.findByName("ROLE_ADMIN")
                    .orElseGet(() -> roles.save(new Rol(null, "ROLE_ADMIN")));
            if (seedAdmin && usuarios.findByCorreo(email).isEmpty()) {
                Usuario usuario = new Usuario();
                usuario.setNombre("Administrador");
                usuario.setApellido("Velvet Essence");
                usuario.setTelefono("999999999");
                usuario.setCorreo(email);
                usuario.setContrasenia(encoder.encode(password));
                usuario.setEstado(true);
                usuario.setRoles(Set.of(admin));
                usuarios.save(usuario);
            }
        };
    }
}

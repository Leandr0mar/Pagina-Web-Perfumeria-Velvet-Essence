package com.example.perfumeria.controller.rest;

import com.example.perfumeria.security.JwtService;
import com.example.perfumeria.models.Usuario;
import com.example.perfumeria.repository.UsuarioRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService,
                          UsuarioRepository usuarioRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }

    public static class LoginRequest {
        @NotBlank @Email private String correo;
        @NotBlank private String contrasenia;
        public String getCorreo() { return correo; }
        public void setCorreo(String correo) { this.correo = correo; }
        public String getContrasenia() { return contrasenia; }
        public void setContrasenia(String contrasenia) { this.contrasenia = contrasenia; }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getCorreo(), request.getContrasenia()));
        UserDetails user = (UserDetails) auth.getPrincipal();
        Usuario usuario = usuarioRepository.findByCorreo(user.getUsername())
                .orElseThrow(() -> new IllegalStateException("Usuario autenticado no encontrado"));
        String token = jwtService.generateToken(user);

        Cookie cookie = new Cookie("jwtToken", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 10);
        response.addCookie(cookie);

        // Extraemos los roles como una lista de Strings
        List<String> roles = user.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .toList();

        boolean admin = roles.contains("ROLE_ADMIN");
        
        return ResponseEntity.ok(Map.of(
                "message", "Autenticacion exitosa",
                "redirectUrl", admin ? "/admin/dashboard" : "/inicio",
                "user", Map.of(
                        "id", usuario.getId(),
                        "nombre", usuario.getNombre(),
                        "apellido", usuario.getApellido(),
                        "correo", usuario.getCorreo(),
                        "roles", roles // <-- ¡Ahora sí enviamos los roles!
                )
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok(Map.of("message", "Sesion cerrada"));
    }
}

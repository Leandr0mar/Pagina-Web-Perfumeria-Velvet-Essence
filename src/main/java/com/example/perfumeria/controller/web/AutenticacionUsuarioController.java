package com.example.perfumeria.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.perfumeria.services.DireccionService;
import com.example.perfumeria.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;

@Controller
public class AutenticacionUsuarioController {

    private final DireccionService direccionService;
    private final UsuarioRepository usuarioRepository;

    public AutenticacionUsuarioController(DireccionService direccionService, UsuarioRepository usuarioRepository) {
        this.direccionService = direccionService;
        this.usuarioRepository = usuarioRepository;
    }

    @GetMapping("/iniciar-sesion")
    public String login() {
        return "usuario/login";
    }
    

    @GetMapping("/registrarse")
    public String registro() {
        return "usuario/registro";
    }

    @GetMapping("/direccion/nueva")
    public String nuevaDireccion(Model model, Authentication authentication) {
        Long usuarioId = usuarioRepository.findByCorreo(authentication.getName()).orElseThrow().getId();
        model.addAttribute("direcciones", direccionService.listarPorUsuarioId(usuarioId));
        return "usuario/direccion";
    }

    @GetMapping("/direccion/eliminar/{id}")
    public String eliminarDireccion(@PathVariable Long id, @RequestParam Long usuarioId, RedirectAttributes redirectAttributes) {
        direccionService.eliminar(id, usuarioId);
        redirectAttributes.addFlashAttribute("mensaje", "Dirección eliminada correctamente");
        return "redirect:/direccion/nueva";
    }

}

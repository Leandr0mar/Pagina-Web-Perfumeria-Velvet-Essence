package com.example.perfumeria.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.perfumeria.services.DireccionService;

@Controller
public class AutenticacionUsuarioController {

    private final DireccionService direccionService;

    public AutenticacionUsuarioController(DireccionService direccionService) {
        this.direccionService = direccionService;
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
    public String nuevaDireccion(Model model) {
        model.addAttribute("direcciones", direccionService.listarTodas());
        return "usuario/direccion";
    }

    @GetMapping("/direccion/eliminar/{id}")
    public String eliminarDireccion(@PathVariable Long id, @RequestParam Long usuarioId, RedirectAttributes redirectAttributes) {
        direccionService.eliminar(id, usuarioId);
        redirectAttributes.addFlashAttribute("mensaje", "Dirección eliminada correctamente");
        return "redirect:/direccion/nueva";
    }

}

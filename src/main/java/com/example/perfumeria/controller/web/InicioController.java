package com.example.perfumeria.controller.web;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

// Importamos el servicio en lugar del controlador REST
import com.example.perfumeria.services.PerfumeService;
import com.example.perfumeria.models.Perfume;

@Controller
public class InicioController {

    // Cambiamos PerfumeController por PerfumeService
    private final PerfumeService perfumeService;

    // Inyección de dependencias por constructor (Buena práctica)
    public InicioController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @GetMapping("/")
    public String inicio() {
        return "redirect:/inicio";
    }
    
    @GetMapping("/inicio")
    public String inicio(Model model) {

        // Obtenemos la lista usando el método listarTodos() del servicio
        List<Perfume> todos = perfumeService.listarTodos();

        // Filtramos los perfumes por su id
        model.addAttribute("perfumesHombre", todos.stream().filter(p -> p.getId() <= 4).toList());
        model.addAttribute("perfumesMujer", todos.stream().filter(p -> p.getId() > 4 && p.getId() <= 8).toList());

        return "index";
    }
}
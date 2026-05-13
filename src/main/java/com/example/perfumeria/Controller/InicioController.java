package com.example.perfumeria.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.example.perfumeria.Models.Perfurme;
import com.example.perfumeria.Services.productoService;

//Clase controlador para mostrar los perfumes en la pagina de inicio, se crea una lista de perfumes y se le asigna 
//a un atributo del modelo para mostrarlo en la vista index.html

//usamos controller para indicar que es un controlador web
@Controller
public class InicioController {

    //autowired para inyectar el servicio de productos sin necesidad de instanciarlo manualmente(new productoService())
    @Autowired
    private productoService productoService;

    @GetMapping("/")
    public String inicioo() {
        return "redirect:/inicio";
    }
    
    //mapeamos la ruta para mostrar el inicio, con el modelo para pasar datos a la vista
    @GetMapping("/inicio")
    public String inicio(Model model) {

        // Obtenemos la lista completa de perfumes desde productoService
        List<Perfurme> todos = productoService.obtenerTodos();   
        
        // Filtramos los perfumes por su id para asignarlos a dos atributos diferentes del modelo, uno para hombres y otro para mujeres
        model.addAttribute("perfumesHombre", todos.stream().filter(p -> p.getId() <= 4).toList());
        model.addAttribute("perfumesMujer", todos.stream().filter(p -> p.getId() > 4 && p.getId() <= 8).toList());

        return "index";
    }
}

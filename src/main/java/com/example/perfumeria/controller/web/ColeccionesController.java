package com.example.perfumeria.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;



@Controller
public class ColeccionesController {

    @GetMapping("/colecciones")
    public String colecciones() {
        return "/productos/colecciones.html";
    }
    
    @GetMapping("/colecciones/detalle")
    public String detalleColeccion() {
        return "/productos/detalle-coleccion.html";
    }
    
}

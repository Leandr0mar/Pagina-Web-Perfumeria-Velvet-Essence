package com.example.perfumeria.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.ui.Model;

import com.example.perfumeria.models.Perfume;
import com.example.perfumeria.services.PerfumeService;

//Usamos controller para indicar que es un controlador web
@Controller
public class DetalleController {

    private PerfumeService perfumeService;

    public DetalleController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    //mapeamos la ruta para mostrar el detalle del producto, con el id como variable de ruta
    @GetMapping("/producto/detalle/{id}")

    //usamos @PathVariable para extraer el id de la URL y Model para pasar datos a la vista
    public String detalle(@PathVariable Long id, Model model) {

        //buscamos el perfume por su id usando el metodo de productoService
        Perfume perfume = perfumeService.buscarPorId(id);

        model.addAttribute("perfume", perfume);

        return "productos/productoDetalle";
    }



}

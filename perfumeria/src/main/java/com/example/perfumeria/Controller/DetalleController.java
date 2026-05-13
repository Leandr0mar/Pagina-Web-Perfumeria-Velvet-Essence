package com.example.perfumeria.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.ui.Model;
import com.example.perfumeria.Models.Perfurme;
import com.example.perfumeria.Services.productoService;

//usamos controller para indicar que es un controlador web
@Controller
public class DetalleController {

    //autowired para inyectar el servicio de productos sin necesidad de instanciarlo manualmente(new productoService())
    @Autowired
    private productoService productoService;

    //mapeamos la ruta para mostrar el detalle del producto, con el id como variable de ruta
    @GetMapping("/inicio/producto/detalle/{id}")

    //usamos @PathVariable para extraer el id de la URL y Model para pasar datos a la vista
    public String detalle(@PathVariable int id, Model model) {

        //buscamos el perfume por su id usando el metodo de productoService
        Perfurme perfume = productoService.buscarPorId(id);


        
        model.addAttribute("perfume", perfume);

        return "productos/productoDetalle";
    }
}

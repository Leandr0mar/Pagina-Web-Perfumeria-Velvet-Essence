package com.example.perfumeria.controller.web;

import com.example.perfumeria.models.Perfume;
import com.example.perfumeria.services.PerfumeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class ProductosWebController {
    private final PerfumeService perfumeService;

    public ProductosWebController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @GetMapping("/productos")
    public String listarProductos(Model model) {
        List<Perfume> perfumes = perfumeService.listarTodos();
        model.addAttribute("perfumes", perfumes);
        model.addAttribute("productosData", perfumes.stream()
                .map(this::toViewData)
                .collect(Collectors.toList()));
        return "productos/productos";
    }

    private Map<String, Object> toViewData(Perfume perfume) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", perfume.getId());
        data.put("nombre", perfume.getNombre());
        data.put("marca", perfume.getMarca());
        data.put("tipo", perfume.getCategoria());
        data.put("precio", perfume.getPrecio());
        data.put("genero", perfume.getGenero());
        data.put("contenido", perfume.getVolumen());
        data.put("imagen", perfume.getImagen());
        data.put("descripcion", perfume.getDescripcion());
        data.put("salida", String.join(", ", perfume.getNotaSalida()));
        data.put("corazon", String.join(", ", perfume.getNotaCorazon()));
        data.put("fondo", String.join(", ", perfume.getNotaFondo()));
        data.put("stock", perfume.getStock());
        data.put("disponibilidad", perfume.getStock() > 0);
        data.put("aroma", perfume.getFamiliaOlfativa());
        data.put("pais", perfume.getPaisOrigen());
        data.put("duracion", "Larga duración");
        data.put("intensidad", "Alta");
        data.put("crueltyFree", true);
        data.put("contieneAlcohol", true);
        return data;
    }
}

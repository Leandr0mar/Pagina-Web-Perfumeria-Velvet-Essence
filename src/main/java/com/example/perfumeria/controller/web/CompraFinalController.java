package com.example.perfumeria.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CompraFinalController {
    @GetMapping("/compra-final")
    public String compraFinal() {
        return "productos/compraFinal";
    }
    
}

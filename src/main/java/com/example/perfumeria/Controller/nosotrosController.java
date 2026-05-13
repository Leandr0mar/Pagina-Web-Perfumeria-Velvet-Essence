package com.example.perfumeria.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class nosotrosController {
    @GetMapping("/inicio/nosotros")
    public String nosotros() {
        return "nosotros";
    }
    
}

package com.example.perfumeria.controller.web;

import com.example.perfumeria.services.PerfumeService;
import com.example.perfumeria.services.PedidoService;
import com.example.perfumeria.services.UsuarioService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    private final PerfumeService perfumes;
    private final UsuarioService usuarios;
    private final PedidoService pedidos;

    public AdminController(PerfumeService perfumes, UsuarioService usuarios, PedidoService pedidos) {
        this.perfumes = perfumes;
        this.usuarios = usuarios;
        this.pedidos = pedidos;
    }

    @GetMapping({"", "/dashboard"})
    public String dashboard(Model model) {
        model.addAttribute("perfumes", perfumes.listarTodos());
        model.addAttribute("usuarios", usuarios.listarTodos());
        model.addAttribute("pedidos", pedidos.listarTodos());
        return "admin/dashboard";
    }
}

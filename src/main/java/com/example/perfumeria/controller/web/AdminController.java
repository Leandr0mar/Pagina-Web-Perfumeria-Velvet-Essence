package com.example.perfumeria.controller.web;

import com.example.perfumeria.services.PedidoService;
import com.example.perfumeria.services.PerfumeService;
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

    private final PerfumeService perfumeService;
    private final UsuarioService usuarioService;
    private final PedidoService pedidoService;

    public AdminController(PerfumeService perfumeService, UsuarioService usuarioService, PedidoService pedidoService) {
        this.perfumeService = perfumeService;
        this.usuarioService = usuarioService;
        this.pedidoService = pedidoService;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        // Solo cargamos la cantidad para no saturar la memoria
        model.addAttribute("totalPerfumes", perfumeService.listarTodos().size());
        model.addAttribute("totalUsuarios", usuarioService.listarTodos().size());
        model.addAttribute("totalPedidos", pedidoService.listarTodos().size());
        return "admin/dashboard"; // Apunta al nuevo HTML
    }

    @GetMapping("/perfumes")
    public String perfumes(Model model) {
        model.addAttribute("perfumes", perfumeService.listarTodos());
        return "admin/vista-perfumes";
    }

    @GetMapping("/usuarios")
    public String usuarios(Model model) {
        model.addAttribute("usuarios", usuarioService.listarTodos());
        return "admin/vista-usuarios";
    }

    @GetMapping("/pedidos")
    public String pedidos(Model model) {
        model.addAttribute("pedidos", pedidoService.listarTodos());
        return "admin/vista-pedidos";
    }
}
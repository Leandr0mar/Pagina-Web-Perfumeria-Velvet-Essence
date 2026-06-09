package com.example.perfumeria.controller.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.perfumeria.models.Perfume;
import com.example.perfumeria.services.PerfumeService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/perfumes")
public class PerfumeController {

    private final PerfumeService service;

    // Inyección por constructor del servicio
    public PerfumeController(PerfumeService service) {
        this.service = service;
    }

    // 1. Obtener TODOS los perfumes de la base de datos
    @GetMapping
    public ResponseEntity<List<Perfume>> obtenerTodos() {
        List<Perfume> perfumes = service.listarTodos();
        return ResponseEntity.ok(perfumes);
    }

    // 2. Obtener UN SOLO perfume por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Perfume> obtenerPorId(@PathVariable Long id) {
        try {
            Perfume perfume = service.buscarPorId(id);
            return ResponseEntity.ok(perfume);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Devuelve un error 404 si no existe
        }
    }
}

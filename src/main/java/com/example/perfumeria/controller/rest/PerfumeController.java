package com.example.perfumeria.controller.rest;

import com.example.perfumeria.models.Perfume;
import com.example.perfumeria.services.PerfumeService;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/perfumes")
public class PerfumeController {

    private final PerfumeService service;
    public PerfumeController(PerfumeService service) { this.service = service; }

    @GetMapping
    public List<Perfume> obtenerTodos() { return service.listarTodos(); }

    @GetMapping("/{id}")
    public ResponseEntity<Perfume> obtenerPorId(@PathVariable Long id) {
        try { return ResponseEntity.ok(service.buscarPorId(id)); }
        catch (RuntimeException ex) { return ResponseEntity.notFound().build(); }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Perfume> crear(@Valid @RequestBody Perfume perfume) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.crear(perfume));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Perfume actualizar(@PathVariable Long id, @Valid @RequestBody Perfume perfume) {
        return service.actualizar(id, perfume);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminar(@PathVariable Long id) { service.eliminar(id); }
}

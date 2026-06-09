package com.example.perfumeria.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.perfumeria.models.Perfume;
import com.example.perfumeria.repository.PerfumeRepository;

@Service
public class PerfumeService {
    
private final PerfumeRepository repository;

    // Inyección por constructor (La mejor práctica, sin necesidad de @Autowired)
    public PerfumeService(PerfumeRepository repository) {
        this.repository = repository;
    }

    // 1. Listar todos los perfumes
    public List<Perfume> listarTodos() {
        return repository.findAll();
    }

    // 2. Buscar un perfume por su ID (Maneja la excepción si no existe)
    public Perfume buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Perfume no encontrado con el ID: " + id));
    }

}

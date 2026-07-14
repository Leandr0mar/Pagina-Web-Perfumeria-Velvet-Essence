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

    public Perfume crear(Perfume perfume) { return repository.save(perfume); }

    public Perfume actualizar(Long id, Perfume cambios) {
        Perfume actual = buscarPorId(id);
        actual.setNombre(cambios.getNombre());
        actual.setMarca(cambios.getMarca());
        actual.setCategoria(cambios.getCategoria());
        actual.setPresentacion(cambios.getPresentacion());
        actual.setDescripcion(cambios.getDescripcion());
        actual.setPrecio(cambios.getPrecio());
        actual.setStock(cambios.getStock());
        actual.setFamiliaOlfativa(cambios.getFamiliaOlfativa());
        actual.setModoDeUso(cambios.getModoDeUso());
        actual.setVolumen(cambios.getVolumen());
        actual.setPaisOrigen(cambios.getPaisOrigen());
        actual.setNotaSalida(cambios.getNotaSalida());
        actual.setNotaCorazon(cambios.getNotaCorazon());
        actual.setNotaFondo(cambios.getNotaFondo());
        actual.setImagen(cambios.getImagen());
        actual.setGenero(cambios.getGenero());
        return repository.save(actual);
    }

    public void eliminar(Long id) { repository.deleteById(id); }

}

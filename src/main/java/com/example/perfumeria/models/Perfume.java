package com.example.perfumeria.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "perfumes")
public class Perfume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre del perfume es obligatorio")
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @NotBlank(message = "La marca es obligatoria")
    @Size(max = 50, message = "La marca no puede superar los 50 caracteres")
    @Column(name = "marca", nullable = false, length = 50)
    private String marca;

    @NotBlank(message = "La categoría es obligatoria (ej. Eau de Parfum)")
    @Size(max = 50, message = "La categoría no puede superar los 50 caracteres")
    @Column(name = "categoria", nullable = false, length = 50)
    private String categoria;

    @Size(max = 100, message = "La descripción de la presentación no puede superar los 100 caracteres")
    @Column(name = "presentacion", length = 100)
    private String presentacion;

    @NotBlank(message = "La descripción del perfume es obligatoria")
    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Positive(message = "El precio debe ser un número mayor a cero")
    @Column(name = "precio", nullable = false)
    private Double precio;

    @Min(value = 0, message = "El stock no puede ser un número negativo")
    @Column(name = "stock", nullable = false)
    private Integer stock;

    @Size(max = 50, message = "La familia olfativa no puede superar los 50 caracteres")
    @Column(name = "familia_olfativa", length = 50)
    private String familiaOlfativa;

    @Column(name = "modo_de_uso", columnDefinition = "TEXT")
    private String modoDeUso;

    @NotBlank(message = "El volumen del frasco es obligatorio (ej. 100 ml)")
    @Size(max = 20, message = "El texto de volumen es demasiado largo")
    @Column(name = "volumen", length = 20)
    private String volumen;

    @Size(max = 50, message = "El país de origen no puede superar los 50 caracteres")
    @Column(name = "pais_origen", length = 50)
    private String paisOrigen;

    @NotEmpty(message = "El perfume debe tener al menos una nota de salida")
    @ElementCollection
    @CollectionTable(name = "perfume_notas_salida", joinColumns = @JoinColumn(name = "perfume_id"))
    @Column(name = "nota")
    private List<String> notaSalida = new ArrayList<>();

    @NotEmpty(message = "El perfume debe tener al menos una nota de corazón")
    @ElementCollection
    @CollectionTable(name = "perfume_notas_corazon", joinColumns = @JoinColumn(name = "perfume_id"))
    @Column(name = "nota")
    private List<String> notaCorazon = new ArrayList<>();

    @NotEmpty(message = "El perfume debe tener al menos una nota de fondo")
    @ElementCollection
    @CollectionTable(name = "perfume_notas_fondo", joinColumns = @JoinColumn(name = "perfume_id"))
    @Column(name = "nota")
    private List<String> notaFondo = new ArrayList<>();

    @NotBlank(message = "La URL o ruta de la imagen es obligatoria")
    @Column(name = "imagen")
    private String imagen;

    @NotBlank(message = "El género es obligatorio")
    @Size(max = 20, message = "El género no puede superar los 20 caracteres")
    @Column(name = "genero", length = 20)
    private String genero;


    public Perfume() {
    }

    // Constructor completo
    public Perfume(Long id, String nombre, String marca, String categoria, String presentacion, String descripcion,
                   Double precio, Integer stock, String familiaOlfativa, String modoDeUso, String volumen, String paisOrigen,
                   List<String> notaSalida, List<String> notaCorazon, List<String> notaFondo, String imagen, String genero) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.categoria = categoria;
        this.presentacion = presentacion;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.familiaOlfativa = familiaOlfativa;
        this.modoDeUso = modoDeUso;
        this.volumen = volumen;
        this.paisOrigen = paisOrigen;
        this.notaSalida = notaSalida;
        this.notaCorazon = notaCorazon;
        this.notaFondo = notaFondo;
        this.imagen = imagen;
        this.genero = genero;
    }

    // Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getPresentacion() {
        return presentacion;
    }

    public void setPresentacion(String presentacion) {
        this.presentacion = presentacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getFamiliaOlfativa() {
        return familiaOlfativa;
    }

    public void setFamiliaOlfativa(String familiaOlfativa) {
        this.familiaOlfativa = familiaOlfativa;
    }

    public String getModoDeUso() {
        return modoDeUso;
    }

    public void setModoDeUso(String modoDeUso) {
        this.modoDeUso = modoDeUso;
    }

    public String getVolumen() {
        return volumen;
    }

    public void setVolumen(String volumen) {
        this.volumen = volumen;
    }

    public String getPaisOrigen() {
        return paisOrigen;
    }

    public void setPaisOrigen(String paisOrigen) {
        this.paisOrigen = paisOrigen;
    }

    public List<String> getNotaSalida() {
        return notaSalida;
    }

    public void setNotaSalida(List<String> notaSalida) {
        this.notaSalida = notaSalida;
    }

    public List<String> getNotaCorazon() {
        return notaCorazon;
    }

    public void setNotaCorazon(List<String> notaCorazon) {
        this.notaCorazon = notaCorazon;
    }

    public List<String> getNotaFondo() {
        return notaFondo;
    }

    public void setNotaFondo(List<String> notaFondo) {
        this.notaFondo = notaFondo;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }
}
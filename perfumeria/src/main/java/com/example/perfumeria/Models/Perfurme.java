package com.example.perfumeria.Models;

import java.util.ArrayList;

//Clase perfume para instanciar sus atributos, crear sus constructores y sus getters y setters

public class Perfurme {
    private int id;
    private String nombre;
    private String marca;
    private String categoria;
    private String presentacion;
    private String descripcion;
    private double precio;
    private int stock;
    private String familiaOlfativa;
    private String modoDeUso;
    private String volumen;
    private String Paisorigen;
    private ArrayList<String> NotaSalida;
    private ArrayList<String> NotaCorazon;
    private ArrayList<String> NotaFondo;
    private String imagen;

    public Perfurme() {
    }

    public Perfurme(int id, String nombre, String marca, String categoria, String presentacion, String descripcion,
            double precio, int stock, String familiaOlfativa, String modoDeUso, String volumen, String paisorigen,
            ArrayList<String> notaSalida, ArrayList<String> notaCorazon, ArrayList<String> notaFondo, String imagen) {
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
        Paisorigen = paisorigen;
        NotaSalida = notaSalida;
        NotaCorazon = notaCorazon;
        NotaFondo = notaFondo;
        this.imagen = imagen;
    }


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
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

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
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

    public String getPaisorigen() {
        return Paisorigen;
    }

    public void setPaisorigen(String paisorigen) {
        Paisorigen = paisorigen;
    }

    public ArrayList<String> getNotaSalida() {
        return NotaSalida;
    }

    public void setNotaSalida(ArrayList<String> notaSalida) {
        NotaSalida = notaSalida;
    }

    public ArrayList<String> getNotaCorazon() {
        return NotaCorazon;
    }

    public void setNotaCorazon(ArrayList<String> notaCorazon) {
        NotaCorazon = notaCorazon;
    }

    public ArrayList<String> getNotaFondo() {
        return NotaFondo;
    }

    public void setNotaFondo(ArrayList<String> notaFondo) {
        NotaFondo = notaFondo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

}

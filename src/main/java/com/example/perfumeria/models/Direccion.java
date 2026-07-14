package com.example.perfumeria.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "direcciones")
public class Direccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El país es obligatorio")
    @Size(max = 50, message = "El país no puede superar los 50 caracteres")
    @Column(name = "pais", nullable = false, length = 50)
    private String pais;

    @NotBlank(message = "El departamento es obligatorio")
    @Size(max = 50, message = "El departamento no puede superar los 50 caracteres")
    @Column(name = "departamento", nullable = false, length = 50)
    private String departamento;

    @NotBlank(message = "El distrito es obligatorio")
    @Size(max = 50, message = "El distrito no puede superar los 50 caracteres")
    @Column(name = "distrito", nullable = false, length = 50)
    private String distrito;

    @NotBlank(message = "La dirección es obligatoria")
    @Size(max = 200, message = "La dirección no puede superar los 200 caracteres")
    @Column(name = "direccion", nullable = false, length = 200)
    private String direccion;

    @NotBlank(message = "El código postal es obligatorio")
    @Size(max = 10, message = "El código postal no puede superar los 10 caracteres")
    @Column(name = "codigo_postal", nullable = false, length = 10)
    private String codigoPostal;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;


    
    public Direccion() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Direccion(Long id, String pais, String departamento, String distrito, String direccion, String codigoPostal, Usuario usuario) {
        this.id = id;
        this.pais = pais;
        this.departamento = departamento;
        this.distrito = distrito;
        this.direccion = direccion;
        this.codigoPostal = codigoPostal;
        this.usuario = usuario;
    }


}

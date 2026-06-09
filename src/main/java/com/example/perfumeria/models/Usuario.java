package com.example.perfumeria.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;


@Entity
@Table(name ="usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message= "El nombre es obligatorio")
    @Size(min=2 , max=20, message= "El nombre debe tener entre 2 y 20 letras") 
    @Column(name= "nombre",nullable = false, length = 20)
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    @Size(min=2, max=30, message = "El apellido debe tener entre 2 y 30 letras")
    @Column(name = "apellido", nullable = false, length = 30)
    private String apellido;

    @NotBlank(message = "El numero telefonico es obligatorio")
    @Pattern(regexp = "^\\d{9}$" ,message="El numero debe tener 9 digitos y ser solo numeros")
    @Column(name= "telefono",nullable = false, length = 9)
    private String telefono;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El formato del correo electrónico no es válido")
    @Size(max = 100, message = "El correo no puede superar los 100 caracteres")
    @Column(name = "correo", nullable = false, unique = true, length = 100)
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, max = 60, message = "La contraseña debe tener entre 6 y 60 caracteres")
    @Column(name = "contrasenia", nullable = false, length = 60)
    private String contrasenia;

    @NotNull(message = "El estado es obligatorio") // Al ser booleano primitivo no usa @NotBlank
    @Column(name= "estado", nullable = false)
    private boolean estado = true;

    public Usuario() {
    }

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

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }

}

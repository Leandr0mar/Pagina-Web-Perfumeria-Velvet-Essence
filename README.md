# ✨ Velvet Essence | Perfumería de Autor (Version 1.8)

> **Sitio Web + Backend Spring Boot / Thymeleaf**

Integrantes:
  - Candia Falcón Leandro Omar
  - Evaristo Ramos Hilder
  - Tirado Pauccar Pamela Mayra

---

## 📌 Descripción del Proyecto

**Velvet Essence** es un proyecto híbrido que combina un landing page responsivo mediante Bootstrap con una aplicación Java Spring Boot.

La versión actual incluye:
- Landing page principal con Bootstrap 5 y diseño responsivo.
- Vista dinámica de detalle de producto con Thymeleaf en `perfumeria/src/main/resources/templates/productos/productoDetalle.html`.
- Servicio `productoService` que entrega datos desde una lista en memoria.
- Controlador `DetalleController` para la ruta `/inicio/producto/detalle/{id}`.
- Mensaje estilizado de producto no encontrado.
- Footer fijo al final de la página y carrito que respeta el encabezado.

---

## �️ Configuración de Spring Data JPA y MySQL

Esta aplicación usa Spring Data JPA para mapear entidades Java a tablas MySQL y gestionar persistencia sin SQL manual.

La configuración principal está en `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/velvet_essence
spring.datasource.username=root
spring.datasource.password=74418228
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

- `spring.jpa.hibernate.ddl-auto=update` mantiene sincronizada la estructura de la base de datos con las entidades Java sin borrar datos existentes.
- La conexión se realiza exitosamente con MySQL mediante el driver `com.mysql.cj.jdbc.Driver`.

## 🧩 Uso correcto de anotaciones JPA

Las entidades Java se definen con anotaciones JPA para mapearlas a tablas MySQL:

- `@Entity` marca la clase como entidad persistente.
- `@Table(name = "nombre_tabla")` define el nombre de la tabla en la base de datos.
- `@Id` identifica la clave primaria.
- `@GeneratedValue(strategy = GenerationType.IDENTITY)` genera automáticamente el valor de la clave primaria.

Ejemplo básico:

```java
@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private BigDecimal precio;
    // getters y setters
}
```

## 📚 Repositorios JpaRepository

Se utilizan interfaces que extienden `JpaRepository` para manejar la persistencia y evitar SQL manual:

```java
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
```

Con esto se obtiene automáticamente soporte para operaciones CRUD, paginación, ordenación y consultas simples.

## ✅ Operaciones CRUD en un entorno web/RESTful

El proyecto soporta la implementación de Crear, Leer, Actualizar y Eliminar (`CRUD`) a través de controladores web o RESTful.

- Crear: guardar nuevas entidades usando `save()`.
- Leer: obtener entidades por ID o listas completas con `findById()` y `findAll()`.
- Actualizar: modificar una entidad existente y persistir los cambios con `save()`.
- Eliminar: borrar entidades con `deleteById()`.

Esto asegura integridad de datos en MySQL siempre que se mantengan las validaciones y relaciones entre entidades.

## 🔐 Validación y relaciones entre tablas

Se recomienda aplicar `Spring Validator` para restricciones de datos y mantener la coherencia del modelo de negocio.

- `@Valid` en los controladores para validar objetos entrantes.
- `@NotNull`, `@Size`, `@Email` y otras anotaciones de validación en los campos.

También se implementan relaciones JPA según las necesidades del dominio:

- `@ManyToOne` para relaciones de muchos a uno.
- `@OneToMany` para relaciones de uno a muchos.
- `@JoinColumn` para especificar la columna de unión.

Ejemplo de relación:

```java
@Entity
public class Pedido {
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<PedidoDetalle> detalles;
}
```

---

## �🚀 Cómo Ejecutar el Proyecto

### ⚡ Opción 1: Abrir Directamente en Navegador

1. Descargar/descomprimir el proyecto
2. Hacer doble click en `index.html`

### 🔧 Opción 2: Ejecutar la aplicación Spring Boot localmente

1. Abrir terminal en la carpeta `perfumeria`
2. Ejecutar `./mvnw.cmd spring-boot:run`
3. Abrir en el navegador `http://localhost:8081/inicio`
4. Ver el detalle de un producto en `http://localhost:8081/inicio/producto/detalle/1`

> Nota: el backend se encuentra en `perfumeria/src/main/java/com/example/perfumeria`, y las plantillas Thymeleaf en `perfumeria/src/main/resources/templates`. 

---

## 🔗 CDN Utilizados

```html
<!-- Bootstrap CSS 5.3.0 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Bootstrap JS Bundle 5.3.0 (con Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- Google Fonts: Montserrat y Playfair Display -->
<link href="https://googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

<!-- Bootstrap Icons 1.13.1 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
``` 

---

## ✅ Checklist de Componentes

### 🏗️ Estructura Base

- [x] Sitio estático de 1 landing page completa
- [x] HTML5 semántico y bien estructurado
- [x] Responsive design (mobile-first)
- [x] Aplicación Spring Boot integrada en `perfumeria`

### 🎯 Componentes Bootstrap Obligatorios

#### Navegación
- [x] **Navbar responsive** con collapse toggle (hamburguesa en móviles)
- [x] Logo personalizado con imagen
- [x] Menú colapsable en dispositivos pequeños
- [x] Iconos de búsqueda y carrito

#### Layout y Grid
- [x] **Grid Layout** con `container` + `row` + `col-*`
  - Grid de productos: `col-sm-6 col-lg-3`

#### Componentes Visuales
- [x] **Cards** - 8 tarjetas de productos (4 hombres, 4 mujeres)
  - Imágenes responsivas
  - Información del producto
  - Botones de acción
- [x] **Página de detalle** con contenido dinámico de producto y notificación de no encontrado

#### Contenido Multimedia
- [x] **Imágenes responsive** con `img-fluid`

#### Formularios
- [x] **Formulario de contacto** con validación JavaScript
- [x] **Formulario de suscripción** en el footer con validación de email

---

## 🧠 Back-end y MVC

- `perfumeria/src/main/java/com/example/perfumeria/Controller/DetalleController.java`
- `perfumeria/src/main/java/com/example/perfumeria/Services/productoService.java`
- `perfumeria/src/main/resources/templates/productos/productoDetalle.html`

---

## 📁 Estructura del Proyecto

```
Pagina-Web-Perfumeria-Velvet-Essence/
├── README.md
├── index.html
├── css/
├── js/
├── assets/
└── perfumeria/
    ├── pom.xml
    ├── mvnw
    ├── mvnw.cmd
    ├── src/
        ├── main/
            ├── java/com/example/perfumeria/
            ├── resources/
                ├── static/
                └── templates/
```

---

## 🎨 Características de Estilo

- **Playfair Display** para títulos
- **Montserrat** para contenido
- Paleta minimalista con acentos dorados
- Animaciones suaves y botones estilizados
- Mensajes y formularios con feedback visual claro

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Propósito |
|-----------|----------|
| Bootstrap 5.3.0 | Framework responsive |
| Spring Boot | Backend Java |
| Thymeleaf | Plantillas dinámicas |
| Java | Lógica del servidor |
| HTML5/CSS3 | Estructura y estilos |
| JavaScript | Interactividad |
| Google Fonts | Tipografía |
| Bootstrap Icons | Iconos vectoriales |
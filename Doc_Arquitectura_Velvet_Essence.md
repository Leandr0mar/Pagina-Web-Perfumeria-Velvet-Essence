**ARQUITECTURA DEL SISTEMA**

Tienda Web de Perfumería "Velvet Essence"

Proyecto Académico · Manual Técnico v1.0

Servidor: Local (Windows) · Stack: Spring Boot 4 + Thymeleaf + JWT + PostgreSQL

Equipo de Desarrollo · 2026

# 1\. Visión General de la Arquitectura

La arquitectura implementada sigue el patrón **Monolito Modular con Renderizado del Lado del Servidor (SSR)** usando Spring Boot y Thymeleaf. No hay un frontend desacoplado (SPA) ni framework JavaScript pesado: el servidor genera el HTML y la autenticación se mantiene vía cookie HttpOnly JWT, eliminando la exposición del token en el almacenamiento del navegador.

**Regla operativa fundamental:**

La versión oficial del sistema corre en el entorno local (Windows) vía `./mvnw spring-boot:run`.

Para la demostración se levanta la aplicación y se accede desde el navegador en `http://localhost:8080`.

Cualquier cambio de lógica se refleja en archivos del proyecto

y luego se ejecuta con: `./mvnw spring-boot:run`

# 2\. Componentes del Sistema - Capas de la Aplicación

| **Componente** | **Tecnología** | **Puerto** | **Rol** |
| --------------- | --------------- | --------- | ------- |
| perfumeria (app) | Spring Boot 4.0.6 (JAR) | 8080 HTTP | Servidor web + API REST + vistas Thymeleaf |
| postgres | PostgreSQL local | 5432 TCP | Base de datos relacional (JPA/Hibernate) |
| jwt-auth | Filtro JwtAuthFilter (en app) | - | Validación de token y carga de autoridades |
| static-assets | /css, /js, /assets (en app) | - | Recursos estáticos (Bootstrap, JS, imágenes) |
| admin-views | /admin/** (en app) | - | Panel de administración (protegido por rol) |

La aplicación corre como proceso Java local (JVM) sobre Windows, levantada con Maven. Se comunica con PostgreSQL local vía JDBC (`localhost:5432`). Todos los componentes residen en la misma máquina; no hay contenedores ni orquestación en la demo.

## 2.1 Variables de Entorno Clave

| **Variable** | **Servicio** | **Descripción** |
| ------------- | ------------ | --------------- |
| (fijo) | app | Puerto local `8080` (configurado en `application.properties`) |
| JWT_SECRET | app | Clave secreta HMAC (`app.security.jwt-secret` en `application.properties`) |
| SEED_ADMIN | app | Habilita la creación del admin por defecto (default: true) |
| ADMIN_EMAIL | app | Correo del usuario administrador semilla |
| ADMIN_PASSWORD | app | Contraseña del usuario administrador semilla |
| SPRING_DATASOURCE_URL | app | URL JDBC de PostgreSQL local (`jdbc:postgresql://localhost:5432/...`) |
| SPRING_DATASOURCE_USERNAME | app | Usuario de la base de datos (ej. `postgres`) |
| SPRING_DATASOURCE_PASSWORD | app | Contraseña de la base de datos local |

# 3\. Flujo de Datos Completo

1\. Cliente abre el navegador y solicita una vista pública (ej. `/inicio`, `/productos`)

2\. InicioController resuelve la ruta y Thymeleaf renderiza el HTML con datos del modelo

3\. Usuario envía credenciales desde `login.html` → `POST /auth/login` (fetch JSON)

4\. AuthController autentica vía `AuthenticationManager` + `DaoAuthenticationProvider`

5\. `JwtService.generateToken()` crea el JWT firmado con la clave secreta

6\. El JWT se entrega como **cookie HttpOnly** `jwtToken` en la respuesta HTTP

7\. `login.js` lee el JSON, detecta `roles.includes('ROLE_ADMIN')` y redirige

8\. Si es ADMIN → `window.location.href = '/admin/dashboard'`

9\. El navegador reenvía la cookie `jwtToken` automáticamente en la nueva petición

10\. `JwtAuthFilter` extrae la cookie, valida el JWT y carga `UserDetails` desde BD

11\. Spring Security evalúa `.requestMatchers("/admin/**").hasRole("ADMIN")`

12\. `AdminController` (con `@PreAuthorize("hasRole('ADMIN')")`) renderiza `dashboard.html`

13\. Thymeleaf inyecta el fragmento `fragments/admin-sidebar :: sidebar(...)`

14\. El sidebar muestra el botón "Cerrar sesión" → `POST /auth/logout` + limpieza de localStorage

15\. Operador administrador gestiona perfumes/usuarios/pedidos vía API REST `/api/*` (cookie enviada en cada fetch)

# 4\. Stack Tecnológico

| **Capa** | **Tecnología** | **Versión / Licencia** | **Decisión vs. alternativa** |
| -------- | --------------- | ------------------------ | ----------------------------- |
| Lenguaje | Java | 17 · GPLv2/Classpath | LTS estable, compatible con Spring Boot 4 |
| Framework | Spring Boot | 4.0.6 · Apache 2.0 | Arranque rápido, auto-configuración JPA/Security |
| Renderizado | Thymeleaf + Spring Security Extras | 3.x / 6.x · Apache 2.0 | SSR nativo, sin SPA ni build de frontend |
| Seguridad | Spring Security | 6.x · Apache 2.0 | Filtros JWT stateless, autorización por rol |
| Tokens | JJWT (io.jsonwebtoken) | 0.11.5 · Apache 2.0 | Creación/validación JWT ligera |
| Persistencia | Spring Data JPA + Hibernate | 6.x · LGPL/GPL | Mapeo ORM automático a entidades |
| Base de datos | PostgreSQL (local) | 15+ · PostgreSQL License | Instalado en la máquina de demostración |
| Driver DB | mysql-connector-j / postgresql | Runtime · GPL/PostgreSQL | Driver según destino (ambos en classpath) |
| Frontend CSS | Bootstrap 5.3 + Bootstrap Icons | 5.3.3 · MIT | Estilos responsive sin compilación |
| Frontend JS | JS Vanilla | - | Sin framework; carga directa de `/js/*.js` |
| Validación | Spring Boot Starter Validation | 3.x · Apache 2.0 | Bean Validation en DTOs y entidades |
| Ejecución | Maven (`spring-boot:run`) | 3.9 · Apache 2.0 | Levantado directo en JVM local |
| Build | Maven + Spring Boot Plugin | 3.9 / 4.0.6 · Apache 2.0 | Empaquetado en JAR ejecutable |

# 5\. Módulo de Seguridad - JWT Cookie Auth

## 5.1 Especificaciones del Token

| **Atributo** | **Valor** |
| ------------- | --------- |
| Almacenamiento | Cookie `jwtToken` (HttpOnly, enviada automáticamente) |
| Subject | `userDetails.getUsername()` (correo del usuario) |
| Claims embebidos | Solo subject + issuedAt + expiration |
| Autoridades | Se reconstruyen desde BD vía `loadUserByUsername()` |
| Algoritmo firma | HMAC-SHA (secretKey desde `app.security.jwt-secret`) |
| Expiración | 10 horas (1000 * 60 * 60 * 10 ms) |
| Roles | `ROLE_ADMIN`, `ROLE_CLIENTE` (prefijo `ROLE_` en `SimpleGrantedAuthority`) |

## 5.2 Pipeline de Autenticación (JwtAuthFilter)

Para cada petición HTTP entrante:

1\. Extracción del JWT:

Recorre `request.getCookies()` buscando `cookie.getName().equals("jwtToken")`

Si no hay cookie, intenta `Authorization: Bearer <token>` (API REST)

2\. Extracción del username:

`jwtService.extractUsername(jwt)` (captura `JwtException` → token nulo)

3\. Validación e inyección al contexto:

Si `username != null` y no hay autenticación previa:

`userDetails = userDetailsService.loadUserByUsername(username)`

`jwtService.isTokenValid(jwt, userDetails)` → `UsernamePasswordAuthenticationToken`

`setDetails(...)` + `SecurityContextHolder.getContext().setAuthentication(authToken)`

4\. Continúa la cadena de filtros (`filterChain.doFilter`)

Nota: El filtro se registra con `addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)`.

## 5.3 Configuración Central - SecurityConfig

| **Regla** | **Alcance** | **Acción** |
| --------- | ----------- | ---------- |
| `/`, `/inicio`, `/iniciar-sesion`, `/registrarse` | Público | `permitAll()` |
| `/auth/**`, `/api/usuarios`, `/api/perfumes` | Público | `permitAll()` |
| `/css/**`, `/js/**`, `/assets/**` | Recursos | `permitAll()` |
| `/productos`, `/producto/**`, `/colecciones`, `/nosotros` | Público | `permitAll()` |
| `/admin/**` | Solo ADMIN | `hasRole("ADMIN")` |
| `/compraFinal` | Logueados | `authenticated()` |
| Cualquier otra | Logueados | `anyRequest().authenticated()` |

Session: `SessionCreationPolicy.STATELESS`. CSRF deshabilitado (JWT).

Manejo de no-autenticado: API → 401; vistas → redirección a `/iniciar-sesion`.

# 6\. Frontend - Vistas y Panel Administrativo

## 6.1 Vistas Públicas (templates/)

| **Vista** | **Ruta** | **Controlador** | **Detalle** |
| --------- | -------- | --------------- | ----------- |
| Inicio | `/` , `/inicio` | InicioController | Catálogo destacado, navbar dinámico |
| Nosotros | `/nosotros` | NosotrosController | Página institucional |
| Productos | `/productos` | ProductosWebController | Grid de perfumes (filtros por género) |
| Detalle producto | `/producto/detalle/{id}` | DetalleController | Ficha del perfume + carrito |
| Colecciones | `/colecciones` | ColeccionesController | Catálogo por familia olfativa |
| Login | `/iniciar-sesion` | AutenticacionUsuarioController | Formulario `login.html` + `login.js` |
| Registro | `/registrarse` | AutenticacionUsuarioController | Formulario `registro.html` |
| Compra final | `/compra-final` | CompraFinalController | Checkout del carrito |

## 6.2 Panel de Administración (templates/admin/)

Protegido por rol `ROLE_ADMIN`. Todas las vistas inyectan el fragmento de sidebar:

`th:replace="~{fragments/admin-sidebar :: sidebar('dashboard')}"`

| **Vista** | **Ruta** | **Descripción** |
| --------- | -------- | --------------- |
| Dashboard | `/admin/dashboard` | Métricas: total perfumes, usuarios, pedidos |
| Catálogo | `/admin/perfumes` | Alta/edición/borrado de perfumes (modal + fetch `/api/perfumes`) |
| Usuarios | `/admin/usuarios` | Listado y eliminación de usuarios (`/api/usuarios`) |
| Pedidos | `/admin/pedidos` | Historial de pedidos (`/api/pedidos`) |

Sidebar (`fragments/admin-sidebar.html`):

- Navegación entre secciones admin con clase `active` dinámica
- Botón "Cerrar sesión" (`#logoutAdminBtn`) → `logoutAdmin()` en `admin.js`
- `logoutAdmin()` hace `POST /auth/logout`, limpia `velvetEssenceUser` de localStorage y redirige a `/inicio`

# 7\. API Endpoints

## 7.1 API REST (JSON, prefijo `/api`)

| **Endpoint** | **Método** | **Descripción** | **Auth** |
| ------------ | ---------- | --------------- | ------- |
| `/api/usuarios` | GET | Listar usuarios | Público* |
| `/api/usuarios/{id}` | GET | Obtener usuario | - |
| `/api/usuarios` | POST | Registrar usuario | Público |
| `/api/usuarios/{id}` | PUT | Actualizar usuario | - |
| `/api/usuarios/{id}` | DELETE | Eliminar usuario | Admin (cookie) |
| `/api/perfumes` | GET | Listar perfumes | Público |
| `/api/perfumes/{id}` | GET | Obtener perfume | - |
| `/api/perfumes` | POST | Crear perfume | Admin (cookie) |
| `/api/perfumes/{id}` | PUT | Editar perfume | Admin (cookie) |
| `/api/perfumes/{id}` | DELETE | Eliminar perfume | Admin (cookie) |
| `/api/pedidos` | GET | Listar pedidos | Admin (cookie) |
| `/api/pedidos/{id}` | GET | Obtener pedido | - |
| `/api/pedidos` | POST | Crear pedido | Logueado |
| `/api/pedidos/{id}` | PUT | Actualizar pedido | - |
| `/api/pedidos/{id}` | DELETE | Eliminar pedido | Admin (cookie) |
| `/api/pedido-detalles` | GET/POST/PUT/DELETE | Gestión de detalles | - |
| `/api/direcciones` | GET/POST/PUT/DELETE | Gestión de direcciones | Logueado |

\* `/api/usuarios` y `/api/perfumes` GET son `permitAll()` según SecurityConfig.

## 7.2 Autenticación y Vistas Web

| **Endpoint** | **Método** | **Descripción** |
| ------------ | ---------- | --------------- |
| `/auth/login` | POST | Autentica y emite cookie `jwtToken` + JSON `{user, roles, redirectUrl}` |
| `/auth/logout` | POST | Invalida sesión (limpia cookie en cliente) |
| `/admin/**` | GET | Panel admin (requiere `ROLE_ADMIN`) |
| `/iniciar-sesion`, `/registrarse` | GET | Formularios de acceso |
| `/inicio`, `/productos`, `/nosotros`, `/colecciones` | GET | Catálogo público |
| `/compra-final` | GET | Checkout (requiere login) |

# 8\. Estructura de Archivos del Proyecto

Pagina-Web-Perfumeria-Velvet-Essence/

├── Dockerfile # Multi-stage: maven build → jre runtime

├── .dockerignore # Excluye target/, .git/, capturas/

├── pom.xml # Dependencias Spring Boot 4 + JJWT + JPA

├── NOTAS.txt # SQL semilla de perfumes

├── src/main/java/com/example/perfumeria/

│ ├── PerfumeriaApplication.java # Clase principal @SpringBootApplication

│ ├── config/

│ │ └── SecurityDataInitializer.java # Crea admin/roles por defecto

│ ├── controller/

│ │ ├── rest/ # Auth, Usuario, Perfume, Pedido, PedidoDetalle, Direccion

│ │ └── web/ # Admin, Autenticacion, Inicio, Productos, Detalle,

│ │ # Colecciones, Nosotros, CompraFinal

│ ├── dto/ # DireccionRequest

│ ├── exceptions/ # GlobalExceptionHandler (@RestControllerAdvice)

│ ├── models/ # Usuario, Rol, Perfume, Pedido, PedidoDetalle, Direccion

│ ├── repository/ # UsuarioRepository, RolRepository, PerfumeRepository, ...

│ ├── security/ # SecurityConfig, JwtService, JwtAuthFilter,

│ │ # CustomUserDetailsService

│ └── services/ # UsuarioService, PerfumeService, PedidoService, ...

├── src/main/resources/

│ ├── application.properties # Datasource + jwt-secret + seed-admin

│ ├── static/

│ │ ├── assets/ # hombre/, mujer/, logo/, portada/ (imágenes)

│ │ ├── css/ # style, admin, login, productos, etc.

│ │ └── js/ # login, admin, script, Registro, productos, etc.

│ └── templates/

│ ├── index.html, nosotros.html

│ ├── admin/ # dashboard, vista-perfumes, vista-usuarios, vista-pedidos

│ ├── fragments/ # admin-sidebar.html

│ ├── productos/ # colecciones, compraFinal, detalle-coleccion, ...

│ └── usuario/ # login, registro, direccion

└── target/ # JAR construido (ignorado en Docker)

# 9\. Seguridad

| **Medida** | **Estado** |
| --------- | --------- |
| JWT en cookie HttpOnly (no accesible por JS) | ✅ Implementado |
| Secretos en variables de entorno (nunca en código) | ✅ Implementado |
| Autorización por rol (`ROLE_ADMIN`) en `/admin/**` | ✅ Implementado |
| `@PreAuthorize("hasRole('ADMIN')")` en AdminController | ✅ Implementado |
| Sesión STATELESS (sin estado en servidor) | ✅ Implementado |
| CSRF deshabilitado (justificado por uso de JWT) | ✅ Implementado |
| Seed de admin configurable vía env (`SEED_ADMIN`) | ✅ Implementado |
| HTTPS/TLS | ⚠️ No (demo en HTTP `localhost:8080`) |
| Logout invalida cookie en cliente | ✅ Implementado |
| Protección de rutas API por cookie (no header manual) | ✅ Implementado |

# 10\. Comandos de Operación Rápida

\# ── EJECUCIÓN LOCAL (DEMO) ──────────────────────────────

cd "C:\Proyectos SB\Pagina-Web-Perfumeria-Velvet-Essence"

./mvnw spring-boot:run # Levantar app en http://localhost:8080

./mvnw clean package -DskipTests # Generar JAR en /target

\# ── ACCESO DESDE EL NAVEGADOR ───────────────────────────

\# Tienda: http://localhost:8080/inicio

\# Login: http://localhost:8080/iniciar-sesion

\# Admin: http://localhost:8080/admin/dashboard

\# (admin@velvet.com / Admin123! por defecto vía SEED_ADMIN)

\# ── VERIFICACIÓN ──────────────────────────────────────────

curl -s http://localhost:8080/inicio # Verificar que la web responde

curl -s -X POST http://localhost:8080/auth/login \

-H "Content-Type: application/json" \

-d '{"correo":"admin@velvet.com","contrasenia":"Admin123!"}' -i

\# ── BASE DE DATOS ──────────────────────────────────────────

\# Requiere PostgreSQL local activo en localhost:5432

\# JPA con `spring.jpa.hibernate.ddl-auto=update` sincroniza esquema

\# (no borra datos existentes)

# 11\. Escalabilidad - Arquitectura para Crecimiento

| **Capa** | **Estrategia** | **Notas** |
| -------- | -------------- | -------- |
| 1 · App (Local) | Proceso JVM único (Spring Boot) | Stateless: cualquier request se atiende sin sesión previa |
| 2 · Sesión | JWT en cookie (sin estado) | Permite múltiples instancias sin sticky session |
| 3 · Base de datos | PostgreSQL local | Conexión por pool de Hibernate (localhost:5432) |
| 4 · Assets estáticos | Servidos por el propio JAR | Para mayor escala: mover a CDN o servidor estático |
| 5 · Build | Maven multi-stage (Dockerfile listo) | Imagen final ~ JRE 17 (ligera) para futuro despliegue |

| **Métrica de Escala** | **Cálculo** | **Resultado** |
| --------------------- | ----------- | ------------- |
| Réplicas sin sesión | Stateless por diseño | Horizontalmente escalable |
| Carga de DB | 1 conexión por instancia (pool) | PostgreSQL local maneja conexiones concurrentes |
| Tamaño imagen | JRE 17 + JAR (~50-80 MB) | Listo para despliegue en la nube (Render/Docker) |

Equipo de Desarrollo · Velvet Essence · 2026 · v1.0

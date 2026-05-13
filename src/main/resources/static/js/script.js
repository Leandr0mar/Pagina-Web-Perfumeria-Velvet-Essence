// ==========================================
// SCRIPT.JS - Lógica interactiva del sitio
// ==========================================

// ====== 1. ANIMACIÓN FADE-IN (Aparición suave) ======
// Al cargar la página, agrega la clase "show" que activa la animación
window.addEventListener("load", () => {
    // Selecciona el elemento con clase "fade-in" y añade "show"
    document.querySelector(".fade-in").classList.add("show");
});

// ====== 2. EFECTO DE NAVEGACIÓN AL HACER SCROLL ======
// Cuando el usuario baja en la página, la barra de navegación cambia de estilo
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".custom-navbar");
    
    // Si el usuario baja más de 50px, agrega la clase "scrolled"
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");  // Navbar con fondo sólido blanco
    } else {
        nav.classList.remove("scrolled");  // Navbar con degradado transparente
    }
});

// ====== 3. VALIDACIÓN DEL FORMULARIO DE CONTACTO ======
// Previene que se envíe el formulario si faltan campos obligatorios
document.getElementById("contactForm").addEventListener("submit", function(e) {
    // Evita el envío automático del formulario (submit por defecto)
    e.preventDefault();
    
    // ===== OBTENER VALORES DE LOS CAMPOS =====
    const nombre = document.getElementById("nombre").value.trim();       // Nombre del usuario
    const email = document.getElementById("email").value.trim();         // Email del usuario
    const asunto = document.getElementById("asunto").value;              // Asunto seleccionado
    const mensaje = document.getElementById("mensaje").value.trim();     // Mensaje escrito
    const terminos = document.getElementById("terminos").checked;        // ¿Checkbox activado?
    
    // Obtener el elemento donde mostrar el error
    const errorMessage = document.getElementById("errorMessage");
    
    // ===== VALIDACIÓN: Verificar que todos los campos estén completos =====
    if (!nombre || !email || !asunto || !mensaje || !terminos) {
        // Si falta algún campo...
        
        // 1. Mostrar el mensaje de error
        errorMessage.classList.remove("d-none");  // Quita la clase que lo ocultaba
        
        // 2. Marcar campos vacíos con borde rojo (clase "is-invalid")
        // Si nombre está vacío, marca el campo
        if (!nombre) 
            document.getElementById("nombre").classList.add("is-invalid");
        else 
            document.getElementById("nombre").classList.remove("is-invalid");
        
        // Si email está vacío, marca el campo
        if (!email) 
            document.getElementById("email").classList.add("is-invalid");
        else 
            document.getElementById("email").classList.remove("is-invalid");
        
        // Si asunto no fue seleccionado, marca el campo
        if (!asunto || asunto === "Selecciona un asunto") 
            document.getElementById("asunto").classList.add("is-invalid");
        else 
            document.getElementById("asunto").classList.remove("is-invalid");
        
        // Si mensaje está vacío, marca el campo
        if (!mensaje) 
            document.getElementById("mensaje").classList.add("is-invalid");
        else 
            document.getElementById("mensaje").classList.remove("is-invalid");
        
        // Si el checkbox no está activado, marca el campo
        if (!terminos) 
            document.getElementById("terminos").classList.add("is-invalid");
        else 
            document.getElementById("terminos").classList.remove("is-invalid");
        
        // 3. Detener la ejecución (no enviar el formulario)
        return false;
    } else {
        // Si TODOS los campos están completos...
        
        // 1. Ocultar el mensaje de error
        errorMessage.classList.add("d-none");
        
        // 2. Limpiar los estilos de error (quitar bordes rojos)
        document.getElementById("nombre").classList.remove("is-invalid");
        document.getElementById("email").classList.remove("is-invalid");
        document.getElementById("asunto").classList.remove("is-invalid");
        document.getElementById("mensaje").classList.remove("is-invalid");
        document.getElementById("terminos").classList.remove("is-invalid");
        
        // 3. Abrir el modal de confirmación
        // Crea una instancia del modal de Bootstrap
        const confirmModal = new bootstrap.Modal(document.getElementById("confirmModal"));
        confirmModal.show();  // Muestra el modal
        
        // 4. Limpiar el formulario después de 2 segundos (para que el usuario vea el modal)
        setTimeout(() => {
            document.getElementById("contactForm").reset();  // Vacía todos los campos
        }, 2000);
    }
});

// ====== 4. VALIDACIÓN DEL FORMULARIO DE SUSCRIPCIÓN (Footer) ======
// Previene que se envíe la suscripción sin email válido
document.getElementById("subscribeForm").addEventListener("submit", function(e) {
    // Evita el envío automático del formulario
    e.preventDefault();
    
    // ===== OBTENER Y VALIDAR EMAIL =====
    const emailSuscripcion = document.getElementById("emailSuscripcion").value.trim();  // Email ingresado
    const errorSubscribe = document.getElementById("errorSubscribe");  // Elemento de error
    
    // Expresión regular para validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const esEmailValido = emailRegex.test(emailSuscripcion);  // Verifica si es válido
    
    // ===== VALIDACIÓN: Verificar que el email no esté vacío y sea válido =====
    if (!emailSuscripcion || !esEmailValido) {
        // Si el email está vacío o no es válido...
        
        // 1. Mostrar mensaje de error
        errorSubscribe.classList.remove("d-none");  // Quita la clase que lo ocultaba
        
        // 2. Marcar el campo con borde rojo (clase "is-invalid")
        document.getElementById("emailSuscripcion").classList.add("is-invalid");
        
        // 3. Detener la ejecución (no enviar el formulario)
        return false;
    } else {
        // Si el email es válido...
        
        // 1. Ocultar el mensaje de error
        errorSubscribe.classList.add("d-none");
        
        // 2. Limpiar el estilo de error (quitar borde rojo)
        document.getElementById("emailSuscripcion").classList.remove("is-invalid");
        
        // 3. Abrir el modal de confirmación de suscripción
        const subscribeModal = new bootstrap.Modal(document.getElementById("subscribeModal"));
        subscribeModal.show();  // Muestra el modal
        
        // 4. Limpiar el formulario después de 2 segundos
        setTimeout(() => {
            document.getElementById("subscribeForm").reset();  // Vacía el campo de email
        }, 2000);
    }
});
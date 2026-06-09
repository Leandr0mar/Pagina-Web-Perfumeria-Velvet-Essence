// ===== REGISTRO DE USUARIOS - FRAGANCIAS ELITE =====

// Elementos del DOM
const registerForm = document.getElementById('registerForm');
const backButton = document.querySelector('.back-to-home');

// ===== BOTÓN VOLVER AL INICIO =====
if (backButton) {
    backButton.addEventListener('click', function(e) {
        // Animación de feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        console.log('Volviendo al inicio...');
    });
}

// ===== MOSTRAR/OCULTAR CONTRASEÑA =====
document.querySelectorAll('.btn-toggle-password').forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.closest('.input-group').querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        } else {
            input.type = 'password';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        }
    });
});

// ===== VALIDACIONES EN EL CLIENTE =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    if (phone === '') return true;
    const phoneRegex = /^[0-9\s\-\(\)]{9,15}$/;
    return phoneRegex.test(phone);
}

// ===== ENVÍO DEL FORMULARIO A SPRING BOOT =====
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Capturar los valores reales de los inputs usando sus IDs del HTML
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    const alerta = document.querySelector('.Alerta');

    // Funciones para manejo de alertas visuales (Bootstrap)
    function mostrarError(mensaje) {
        alerta.innerHTML = `
            <div class="alert alert-danger py-2 text-center" role="alert">
                ${mensaje}
            </div>
        `;
    }

    function limpiarError() {
        alerta.innerHTML = '';
    }

    // Validaciones de negocio en el Frontend
    if (!nombre) {
        mostrarError('Ingresa tu nombre');
        document.getElementById('nombre').focus();
        return;
    }

    if (!apellido) {
        mostrarError('Ingresa tu apellido');
        document.getElementById('apellido').focus();
        return;
    }

    if (!email) {
        mostrarError('Ingresa tu correo electrónico');
        document.getElementById('email').focus();
        return;
    }

    if (!isValidEmail(email)) {
        mostrarError('Correo electrónico no válido');
        document.getElementById('email').focus();
        return;
    }

    if (phone && !isValidPhone(phone)) {
        mostrarError('Teléfono no válido (mínimo 9 dígitos)');
        document.getElementById('phone').focus();
        return;
    }

    if (!password) {
        mostrarError('Ingresa una contraseña');
        document.getElementById('password').focus();
        return;
    }

    if (password.length < 6) {
        mostrarError('La contraseña debe tener al menos 6 caracteres');
        document.getElementById('password').focus();
        return;
    }

    if (password !== confirmPassword) {
        mostrarError('Las contraseñas no coinciden');
        document.getElementById('confirmPassword').focus();
        return;
    }

    if (!terms) {
        mostrarError('Debes aceptar los términos y condiciones');
        return;
    }

    // Si pasa todas las validaciones locales, limpiamos errores previos
    limpiarError();
    
    // Armar el objeto DTO que viaja hacia Java. 
    // Las propiedades mapean 1:1 con tu entidad 'Usuario' de Spring Boot.
    const usuarioDTO = {
        nombre: nombre,
        apellido: apellido,
        telefono: phone,
        correo: email,
        contrasenia: password,
        estado: true
    };
    
    // URL del API de tu backend corriendo en el puerto 8080
    const urlAPI = "http://localhost:8080/api/usuarios";

    // Petición HTTP POST mediante Fetch
    fetch(urlAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarioDTO)
    })
    .then(async response => {
        // Si el estado HTTP no está en el rango 200-299, procesamos el error del servidor
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }
        return response.json();
    })
    .then(data => {
        // Registro exitoso en la Base de Datos
        alert(`✅ ¡Bienvenido ${data.nombre}!\n\nTu cuenta ha sido creada exitosamente.`);
        registerForm.reset();
        
        // Redirección opcional a la pantalla de inicio de sesión
        window.location.href = "/iniciar-sesion";
    })
    .catch(error => {
        console.error("Error en la petición de registro:", error);
        
        // Captura el error específico de la restricción Unique de MySQL
        if (error.message.includes("Duplicate entry")) {
            mostrarError("El correo electrónico ya se encuentra registrado.");
        } else {
            mostrarError("Hubo un problema con el servidor. Inténtalo más tarde.");
        }
    });
});

// ===== CONSOLA DE INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Frontend conectado a la arquitectura de servicios de Velvet Essence');
});
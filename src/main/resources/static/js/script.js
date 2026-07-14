// ==========================================
// SCRIPT.JS - Lógica interactiva del sitio
// ==========================================

// ====== 1. ANIMACIÓN FADE-IN (Aparición suave) ======
// Al cargar la página, agrega la clase "show" que activa la animación
window.addEventListener("load", () => {
    const fadeInElement = document.querySelector(".fade-in");
    if (fadeInElement) {
        fadeInElement.classList.add("show");
    }
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

// ========== CARRITO FUNCIONAL ==========
/*
   Aquí se almacena toda la lógica
   principal del carrito de compras.
*/

let cart = [];
const CART_STORAGE_KEY = 'velvetEssenceCart';

function isCartEnabled() {
    return cartBtn && cartSidebar && cartItemsContainer && cartCountSpan && cartTotalPriceSpan;
}

function saveCart() {
    if (!isCartEnabled()) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    localStorage.setItem('carrito', JSON.stringify(cart));
}

function loadCart() {
    if (!isCartEnabled()) return;
    const savedCart = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem('carrito');
    if (savedCart) {
        try {
            const parsed = JSON.parse(savedCart);
            cart = Array.isArray(parsed) ? parsed.map(item => ({
                ...item,
                cantidad: item.cantidad || item.quantity || 1,
                precio: Number(item.precio || item.price || 0),
                nombre: item.nombre || item.name,
                imagen: item.imagen || item.image
            })) : [];
        } catch (error) {
            cart = [];
        }
    }
    if (typeof updateCartUI === 'function') {
        updateCartUI();
    }
}


// ===== VARIABLES DEL DOM =====
/*
   Variables que capturan elementos HTML
   para manipularlos desde JavaScript.
*/

const cartBtn = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCountSpan = document.getElementById('cartCount');
const cartTotalPriceSpan = document.getElementById('cartTotalPrice');

function updateCartUI() {
    if (!isCartEnabled()) return;
    cartCountSpan.textContent = cart.reduce((total, item) => total + (item.cantidad || 1), 0);
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart text-center mt-4">🛒 Aún no tienes productos</p>';
        cartTotalPriceSpan.textContent = 'S/ 0.00';
        return;
    }
    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const subtotal = item.precio * (item.cantidad || 1);
        total += subtotal;
        return `<div class="cart-item d-flex align-items-center justify-content-between mb-3"><div class="d-flex align-items-center"><img src="${item.imagen || '/assets/logo/logo-dorado.png'}" alt="${item.nombre || 'Producto'}" width="50" height="50" class="img-fluid me-2 rounded" style="object-fit:cover"><div><strong>${item.nombre || 'Producto'}</strong><small class="d-block text-muted">Cant: ${item.cantidad || 1} x S/ ${item.precio.toFixed(2)}</small></div></div><div class="d-flex align-items-center gap-2"><span class="fw-bold small">S/ ${subtotal.toFixed(2)}</span><button class="remove-item btn p-1" data-index="${index}" type="button"><i class="bi bi-trash text-danger fs-5"></i></button></div></div>`;
    }).join('');
    cartTotalPriceSpan.textContent = `S/ ${total.toFixed(2)}`;
    saveCart();
    cartItemsContainer.querySelectorAll('.remove-item').forEach(button => button.addEventListener('click', () => { cart.splice(Number(button.dataset.index), 1); updateCartUI(); }));
}


// ===== ABRIR Y CERRAR CARRITO =====
/*
   Permite mostrar y ocultar
   el sidebar del carrito.
*/

if (cartBtn && cartSidebar && closeCartBtn) {
    cartBtn.addEventListener('click', () => {
        // Alterna apertura/cierre
        cartSidebar.classList.toggle('open');
    });

    closeCartBtn.addEventListener('click', () => {
        // Cierra el carrito
        cartSidebar.classList.remove('open');
    });
}


// ====== 3. VALIDACIÓN DEL FORMULARIO DE CONTACTO ======
// Previene que se envíe el formulario si faltan campos obligatorios
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
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
}

// ====== 4. VALIDACIÓN DEL FORMULARIO DE SUSCRIPCIÓN (Footer) ======
// Previene que se envíe la suscripción sin email válido
const subscribeForm = document.getElementById("subscribeForm");
if (subscribeForm) {
    subscribeForm.addEventListener("submit", function(e) {
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
}
// ====== 5. AUTENTICACIÓN SIMPLE + SALUDO DINÁMICO EN EL NAVBAR ======
const AUTH_STORAGE_KEY = 'velvetEssenceUser';

function saveLoggedUser(user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

function getLoggedUser() {
    const userJson = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!userJson) return null;
    try {
        return JSON.parse(userJson);
    } catch (error) {
        return null;
    }
}

function clearLoggedUser() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

async function logoutUser() {
    try {
        await fetch('/auth/logout', { method: 'POST' });
    } catch (error) {
        console.warn('No se pudo notificar el cierre de sesion al servidor.', error);
    }
    clearLoggedUser();
    updateNavbarAuthState();
    location.href = '/inicio';
}

function updateNavbarAuthState() {
    const desktopAuthSection = document.getElementById('desktopAuthSection');
    const mobileAuthList = document.getElementById('mobileAuthList');

    if (!desktopAuthSection && !mobileAuthList) {
        return;
    }

    const user = getLoggedUser();

    if (user) {
        if (desktopAuthSection) {
            desktopAuthSection.innerHTML = `
                <div class="search-box d-flex align-items-center justify-content-center gap-4">
                    <i class="bi bi-search fs-5 icon-hover"></i>
                    <i class="bi bi-bag fs-5 icon-hover"></i>
                </div>
                <div class="d-flex align-items-center justify-content-center gap-3 py-3 py-lg-0 mfk-icons">
                    <span class="navbar-text navbar-user-greeting text-dark">Bienvenido, ${user.nombre}</span>
                    <button id="logoutBtn" class="btn btn-auth btn-auth-register">Cerrar sesión</button>
                </div>
            `;
        }
        if (mobileAuthList) {
            mobileAuthList.innerHTML = `
                <li class="nav-item"><span class="nav-link disabled">Bienvenido, ${user.nombre}</span></li>
                <li class="nav-item"><a class="nav-link" href="#" id="logoutMobile">Cerrar sesión</a></li>
            `;
        }

        const logoutBtn = document.getElementById('logoutBtn');
        const logoutMobile = document.getElementById('logoutMobile');

        if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);
        if (logoutMobile) logoutMobile.addEventListener('click', function (event) {
            event.preventDefault();
            logoutUser();
        });
    } else {
        if (desktopAuthSection) {
            desktopAuthSection.innerHTML = `
                <div class="search-box d-flex align-items-center justify-content-center gap-4">
                    <i class="bi bi-search fs-5 icon-hover"></i>
                    <i class="bi bi-bag fs-5 icon-hover"></i>
                </div>
                <div class="d-flex align-items-center justify-content-center gap-3 py-3 py-lg-0 mfk-icons">
                    <a href="/iniciar-sesion" class="btn btn-auth btn-auth-login">Iniciar sesión</a>
                    <a href="/registrarse" class="btn btn-auth btn-auth-register">Registrarse</a>
                </div>
            `;
        }
        if (mobileAuthList) {
            mobileAuthList.innerHTML = `
                <li class="nav-item"><a class="nav-link" href="/iniciar-sesion">Iniciar sesión</a></li>
                <li class="nav-item"><a class="nav-link" href="/registrarse">Registrarse</a></li>
            `;
        }
    }
}

document.addEventListener('DOMContentLoaded', updateNavbarAuthState);

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    document.querySelectorAll('.btn-agregar-carrito').forEach(button => button.addEventListener('click', event => {
        event.preventDefault();
        const id = String(button.dataset.id);
        const existing = cart.find(item => String(item.id) === id);
        if (existing) existing.cantidad = (existing.cantidad || 1) + 1;
        else cart.push({ id, nombre: button.dataset.nombre, precio: Number(button.dataset.precio), imagen: button.dataset.imagen, cantidad: 1 });
        saveCart();
        updateCartUI();
        cartSidebar?.classList.add('open');
    }));
});

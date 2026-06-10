// ========== ACORDEÓN CON CIERRE AUTOMÁTICO ==========
/*
   Esta sección controla el funcionamiento
   del acordeón interactivo del producto.

   Funciones:
   - Abrir contenido
   - Cerrar contenido
   - Permitir solo un acordeón abierto
*/

document.querySelectorAll('.accordion-header-custom').forEach(header => {

    // Evento click sobre el encabezado
    header.addEventListener('click', () => {

        const accordionItem = header.parentElement;

        // Verifica si el acordeón actual está activo
        const isActive = accordionItem.classList.contains('active');
        
        // Cierra todos los acordeones
        document.querySelectorAll('.accordion-item-custom').forEach(item => {
            item.classList.remove('active');
        });
        
        // Abre el acordeón seleccionado
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});


// ===== AGREGAR PRODUCTOS AL CARRITO =====
/*
   Obtiene la información del producto:
   - Nombre
   - Precio
   - SKU
   - Cantidad

   Luego agrega el producto al carrito.
*/

document.querySelectorAll('.add-to-cart-btn').forEach(btn => {

    btn.addEventListener('click', () => {

        //Obtener imagen del producto

        const image= btn.getAttribute('data-image');

        // Obtener nombre del producto
        const name = btn.getAttribute('data-name');

        // Obtener precio
        const price = parseFloat(btn.getAttribute('data-price'));

        // Obtener SKU
        const sku = btn.getAttribute('data-sku');

        // Obtener input de cantidad
        const quantityInput =
        btn.closest('.cart-actions').querySelector('.qty-input');

        let quantity = parseInt(quantityInput.value);
        
        // Validar cantidad mínima
        if (isNaN(quantity) || quantity < 1) quantity = 1;
        
        // Buscar si el producto ya existe
        const existingIndex =
        cart.findIndex(item => item.sku === sku);

        if (existingIndex !== -1) {

            // Si ya existe, aumenta cantidad
            cart[existingIndex].quantity += quantity;

        } else {

            // Si no existe, agregar producto
            cart.push({ image,name, price, sku, quantity });
        }
        
        // Actualizar interfaz del carrito
        updateCartUI();
        
        // Animación visual del botón
        btn.style.transform = 'scale(0.96)';

        setTimeout(() => btn.style.transform = '', 200);
        
        // Abrir carrito automáticamente
        cartSidebar.classList.add('open');
    });
});


// ========== ACTUALIZAR INTERFAZ DEL CARRITO ==========
/*
   Función encargada de:
   - Mostrar productos
   - Actualizar contador
   - Calcular total
   - Mostrar carrito vacío
*/

function updateCartUI() {

    // Calcular cantidad total de productos
    const totalItems =
    cart.reduce((acc, item) => acc + item.quantity, 0);

    // Actualizar contador visual
    cartCountSpan.innerText = totalItems;
    
    // Verificar si el carrito está vacío
    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
        '<p class="empty-cart text-center mt-4">🛒 Aún no tienes productos</p>';

        cartTotalPriceSpan.innerText = 'S/ 0.00';

        return;
    }
    
    let html = '';
    let total = 0;

    // Recorrer productos del carrito
    cart.forEach((item, idx) => {

        // Calcular subtotal
        const subtotal = item.price * item.quantity ;

        total += subtotal;

        // Crear HTML dinámico con el botón de eliminar incluido
        html += `
<div class="cart-item d-flex align-items-center justify-content-between mb-3">
    <div class="d-flex align-items-center">
        <img src="${item.image}" alt="${item.name}" width="50" height="50" class="img-fluid me-2 rounded" style="object-fit: cover;">
        <div>
            <strong style="display: block; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}</strong>
            <small class="text-muted">
                Cant: ${item.quantity} x S/ ${item.price.toFixed(2)}
            </small>
        </div>
    </div>
    <div class="d-flex align-items-center gap-2">
        <span class="fw-bold text-dark small">S/ ${subtotal.toFixed(2)}</span>
        <button class="remove-item btn p-1" data-index="${idx}" title="Eliminar producto">
            <i class="bi bi-trash text-danger fs-5"></i>
        </button>
    </div>
</div>
        `;
    });

    // Insertar productos generados dinámicamente
    cartItemsContainer.innerHTML = html;

    // Mostrar precio total del carrito
    cartTotalPriceSpan.innerText = `S/ ${total.toFixed(2)}`;

    if (typeof saveCart === 'function') {
        saveCart();
    }

    // ===== ASIGNAR EVENTOS DE ELIMINACIÓN (Dinámicos) =====
    /* Al estar dentro de updateCartUI, garantizamos que cada vez que 
       el carrito se actualice, los nuevos botones vuelvan a tener funcionalidad.
    */
    cartItemsContainer.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            // Obtener índice del producto
            const index = parseInt(btn.getAttribute('data-index'));

            // Eliminar producto del array
            cart.splice(index, 1);

            // Actualizar interfaz del carrito
            updateCartUI();

            // Cerrar carrito si queda vacío
            if (cart.length === 0) {
                cartSidebar.classList.remove('open');
            }
        });
    });
}


// ========== CONTROL DE CANTIDAD ==========
/*
   Permite aumentar o disminuir
   la cantidad seleccionada del producto.
*/

document.querySelectorAll('.qty-btn').forEach(btn => {

    btn.addEventListener('click', () => {

        // Obtener input relacionado
        const input =
        btn.closest('.quantity-selector').querySelector('.qty-input');

        let value = parseInt(input.value);

        // Botón sumar
        if (btn.classList.contains('plus')) {

            // Máximo permitido: 10
            value = Math.min(value + 1, 10);

        // Botón restar
        } else if (btn.classList.contains('minus')) {

            // Mínimo permitido: 1
            value = Math.max(value - 1, 1);
        }

        // Actualizar valor visual
        input.value = value;
    });
});


// ========== CERRAR CARRITO AL HACER CLICK AFUERA ==========
/*
   Si el usuario hace click fuera
   del sidebar, el carrito se cierra.
*/

document.addEventListener('click', (e) => {

    // Verificar si el clic fue en el botón de eliminar o dentro de él (el ícono de basura)
    const clickedRemove = e.target.closest('.remove-item');

    if (
        !cartSidebar.contains(e.target) &&
        !cartBtn.contains(e.target) &&
        !clickedRemove && // ← EXCEPCIÓN: Si es el botón de eliminar, NO cierres el carrito
        cartSidebar.classList.contains('open')
    ) {
        cartSidebar.classList.remove('open');
    }
});

if (typeof loadCart === 'function') {
    loadCart();
}


// ===== EFECTO STICKY CONTROLADO =====
/*
   Mantiene fija la imagen del producto
   mientras el usuario hace scroll.

   El tamaño original de la imagen
   se mantiene sin deformarse.
*/

// ===== EFECTO STICKY SOLO EN ESCRITORIO =====
function isMobile() {
    return window.innerWidth <= 768;
}

window.addEventListener('scroll', function() {
    // Si es móvil, no hacer nada
    if (isMobile()) return;
    
    var imagenWrapper = document.querySelector('.product-image-wrapper');
    var columnaOriginal = document.querySelector('.col-md-6:first-child');
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (!imagenWrapper || !columnaOriginal) return;
    
    var anchoOriginal = columnaOriginal.offsetWidth;
    var offsetLeft = columnaOriginal.getBoundingClientRect().left;
    
    if (scrollTop > 100) {
        imagenWrapper.style.position = 'fixed';
        imagenWrapper.style.top = '20px';
        imagenWrapper.style.left = offsetLeft + 'px';
        imagenWrapper.style.width = anchoOriginal + 'px';
        imagenWrapper.style.backgroundColor = 'transparent';
        imagenWrapper.style.padding = '0px';
        imagenWrapper.style.zIndex = '100';
    } else {
        imagenWrapper.style.position = 'relative';
        imagenWrapper.style.top = 'auto';
        imagenWrapper.style.left = 'auto';
        imagenWrapper.style.width = 'auto';
        imagenWrapper.style.backgroundColor = 'transparent';
        imagenWrapper.style.padding = '0px';
    }
});

// Cuando la ventana cambie de tamaño, recalcular
window.addEventListener('resize', function() {
    if (isMobile()) {
        var imagenWrapper = document.querySelector('.product-image-wrapper');
        if (imagenWrapper) {
            imagenWrapper.style.position = 'relative';
            imagenWrapper.style.top = 'auto';
            imagenWrapper.style.left = 'auto';
            imagenWrapper.style.width = 'auto';
        }
    }
});
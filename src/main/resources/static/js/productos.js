// ============================================================
//  DATOS DE PRODUCTOS - 22 PERFUMES ÚNICOS
// ============================================================
const productos = (window.productosDesdeThymeleaf && window.productosDesdeThymeleaf.length > 0) ? window.productosDesdeThymeleaf : [
    
];

// ============================================================
//  REFERENCIAS DOM
// ============================================================
// ============================================================
//  REFERENCIAS DOM
// ============================================================
const DOM = {
    grid: document.getElementById('productsGrid'),
    search: document.getElementById('searchInput'),
    filterMarca: document.getElementById('filterMarca'),
    filterGenero: document.getElementById('filterGenero'),
    filterTipo: document.getElementById('filterTipo'),
    filterPrecio: document.getElementById('filterPrecio'),
    filterContenido: document.getElementById('filterContenido'),
    filterOrden: document.getElementById('filterOrden'),
    count: document.getElementById('productsCount'),
    
    // Modal
    modal: document.getElementById('productModal'),
    modalClose: document.getElementById('modalClose'),
    modalImage: document.getElementById('modalProductImage'),
    modalBrand: document.getElementById('modalProductBrand'),
    modalName: document.getElementById('modalProductName'),
    modalType: document.getElementById('modalProductType'),
    modalContent: document.getElementById('modalProductContent'),
    modalDescription: document.getElementById('modalProductDescription'),
    modalAvailability: document.getElementById('modalProductAvailability'),
    modalStock: document.getElementById('modalProductStock'),
    modalPrice: document.getElementById('modalProductPrice'),
    modalFeatureAroma: document.getElementById('modalFeatureAroma'),
    modalFeatureCruelty: document.getElementById('modalFeatureCruelty'),
    modalFeatureAlcohol: document.getElementById('modalFeatureAlcohol'),
    modalAccordionDescripcion: document.getElementById('modalAccordionDescripcion'),
    modalInfoFamilia: document.getElementById('modalInfoFamilia'),
    modalInfoSalida: document.getElementById('modalInfoSalida'),
    modalInfoCorazon: document.getElementById('modalInfoCorazon'),
    modalInfoFondo: document.getElementById('modalInfoFondo'),
    modalInfoVolumen: document.getElementById('modalInfoVolumen'),
    modalInfoPais: document.getElementById('modalInfoPais'),
    modalQuantityInput: document.getElementById('modalQuantityInput'),
    modalQtyNumberMobile: document.getElementById('modalQtyNumberMobile'),
    modalDecrementBtn: document.getElementById('modalDecrementBtn'),
    modalIncrementBtn: document.getElementById('modalIncrementBtn'),
    modalDecrementBtnMobile: document.getElementById('modalDecrementBtnMobile'),
    modalIncrementBtnMobile: document.getElementById('modalIncrementBtnMobile'),
    modalAddToCartBtn: document.getElementById('modalAddToCartBtn'),
    modalAddToCartBtnMobile: document.getElementById('modalAddToCartBtnMobile'),
    
    // Carrito
    cartToggle: document.getElementById('cartToggle'),
    cartSidebar: document.getElementById('cartSidebar'),
    closeCart: document.getElementById('closeCart'),
    cartItems: document.getElementById('cartItems'),
    cartCount: document.getElementById('cartCount'),
    cartTotalPrice: document.getElementById('cartTotalPrice')
};

// ============================================================
//  ACORDEÓN DEL CATÁLOGO
// ============================================================
document.querySelectorAll('.accordion-header-custom').forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        document.querySelectorAll('.accordion-item-custom').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// ============================================================
//  ACORDEÓN DEL MODAL
// ============================================================
document.querySelectorAll('.modal-accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        const accordionItem = this.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        document.querySelectorAll('.modal-accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// ============================================================
//  RENDERIZAR PRODUCTOS
// ============================================================
function renderizarProductos(productos) {
    if (productos.length === 0) {
        DOM.grid.innerHTML = `
            <div class="col-12 text-center py-5" style="color:#999;">
                <i class="bi bi-search" style="font-size:48px; display:block; margin-bottom:16px;"></i>
                <p style="font-family:'Montserrat',sans-serif; font-size:24px; margin-bottom:8px;">No encontramos fragancias</p>
                <p style="font-size:14px;">Intenta ajustar los filtros de búsqueda</p>
            </div>
        `;
        DOM.count.textContent = 'Mostrando 0 productos';
        return;
    }

    let html = '';
    productos.forEach(p => {
        html += `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="product-card">
                    <div class="product-image-wrapper">
                        <img src="${p.imagen}" alt="${p.nombre}" class="product-image">
                    </div>
                    <div class="product-info">
                        <div class="product-brand">${p.marca}</div>
                        <h3 class="product-name">${p.nombre}</h3>
                        <div class="product-content">${p.contenido}</div>
                        <div class="product-type">${p.tipo}</div>
                        <p class="product-description">${p.descripcion}</p>
                        <div class="product-footer">
                            <span class="product-price">S/ ${p.precio.toFixed(2)}</span>
                            <button class="btn-details" data-id="${p.id}">
                                Ver detalles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    DOM.grid.innerHTML = html;
    DOM.count.textContent = `Mostrando ${productos.length} productos`;

document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const idProducto = e.currentTarget.dataset.id;
            // Redirigir a la URL del detalle del producto
            window.location.href = '/producto/detalle/' + idProducto;
        });
    });
}

// ============================================================
//  FILTRADO Y ORDENAMIENTO
// ============================================================
function filtrarYOrdenar() {
    const searchTerm = DOM.search.value.toLowerCase().trim();
    const marca = DOM.filterMarca.value;
    const genero = DOM.filterGenero.value;
    const tipo = DOM.filterTipo.value;
    const precio = DOM.filterPrecio.value;
    const contenido = DOM.filterContenido.value;
    const orden = DOM.filterOrden.value;

    let result = [...productos];

    if (searchTerm) {
        result = result.filter(p =>
            p.nombre.toLowerCase().includes(searchTerm) ||
            p.marca.toLowerCase().includes(searchTerm)
        );
    }

    if (marca !== 'all') {
        result = result.filter(p => p.marca === marca);
    }

    if (genero !== 'all') {
        result = result.filter(p => p.genero === genero);
    }

    if (tipo !== 'all') {
        result = result.filter(p => p.tipo === tipo);
    }

    if (precio !== 'all') {
        const [min, max] = precio.split('-').map(Number);
        result = result.filter(p => p.precio >= min && p.precio <= max);
    }

    if (contenido !== 'all') {
        result = result.filter(p => p.contenido === contenido);
    }

    switch (orden) {
        case 'precio-menor':
            result.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-mayor':
            result.sort((a, b) => b.precio - a.precio);
            break;
        case 'nombre-az':
            result.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        default:
            result.sort((a, b) => a.id - b.id);
            break;
    }

    renderizarProductos(result);
}

// ============================================================
//  MODAL - VERSIÓN MEJORADA CON CANTIDAD Y CARRITO
// ============================================================

let modalCantidad = 1;

function abrirModal(e) {
    const btn = e.currentTarget;
    const id = parseInt(btn.dataset.id);
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    DOM.modal.dataset.productId = producto.id;

    DOM.modalImage.src = producto.imagen;
    DOM.modalImage.alt = producto.nombre;
    DOM.modalBrand.textContent = producto.marca;
    DOM.modalName.textContent = producto.nombre;
    DOM.modalType.textContent = producto.tipo;
    DOM.modalContent.textContent = producto.contenido;
    DOM.modalDescription.textContent = producto.descripcion;
    DOM.modalPrice.textContent = `S/ ${producto.precio.toFixed(2)}`;
    DOM.modalStock.textContent = producto.stock || 20;
    DOM.modalFeatureAroma.textContent = producto.aroma || 'Floral';
    DOM.modalFeatureCruelty.textContent = producto.crueltyFree ? 'Cruelty Free' : '';
    DOM.modalFeatureAlcohol.textContent = producto.contieneAlcohol ? 'Contiene alcohol' : '';
    DOM.modalAccordionDescripcion.textContent = producto.descripcion;
    DOM.modalInfoFamilia.textContent = producto.aroma || 'Floral';
    DOM.modalInfoSalida.textContent = producto.salida || '—';
    DOM.modalInfoCorazon.textContent = producto.corazon || '—';
    DOM.modalInfoFondo.textContent = producto.fondo || '—';
    DOM.modalInfoVolumen.textContent = producto.contenido;
    DOM.modalInfoPais.textContent = producto.pais || 'Perú';

    if (producto.disponibilidad) {
        DOM.modalAvailability.innerHTML = `
            <i class="bi bi-check-circle-fill text-success me-1"></i>
            <strong>Disponible</strong> · stock: <span>${producto.stock || 20}</span>
        `;
    } else {
        DOM.modalAvailability.innerHTML = `
            <i class="bi bi-x-circle-fill text-danger me-1"></i>
            <strong>No disponible</strong>
        `;
    }

    modalCantidad = 1;
    if (DOM.modalQuantityInput) DOM.modalQuantityInput.value = 1;
    if (DOM.modalQtyNumberMobile) DOM.modalQtyNumberMobile.textContent = 1;

    DOM.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    DOM.modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================================
//  CONTROL DE CANTIDAD EN EL MODAL
// ============================================================

function actualizarModalCantidad(valor) {
    if (valor < 1) valor = 1;
    if (valor > 10) valor = 10;
    modalCantidad = valor;
    
    if (DOM.modalQuantityInput) DOM.modalQuantityInput.value = valor;
    if (DOM.modalQtyNumberMobile) DOM.modalQtyNumberMobile.textContent = valor;
}

DOM.modalDecrementBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    actualizarModalCantidad(modalCantidad - 1);
});

DOM.modalIncrementBtn?.addEventListener('click', function(e) {
    e.preventDefault();
    actualizarModalCantidad(modalCantidad + 1);
});

DOM.modalDecrementBtnMobile?.addEventListener('click', function(e) {
    e.preventDefault();
    actualizarModalCantidad(modalCantidad - 1);
});

DOM.modalIncrementBtnMobile?.addEventListener('click', function(e) {
    e.preventDefault();
    actualizarModalCantidad(modalCantidad + 1);
});

DOM.modalQuantityInput?.addEventListener('change', function() {
    let val = parseInt(this.value) || 1;
    actualizarModalCantidad(val);
});

// ============================================================
//  CARRITO - VARIABLES Y FUNCIONES
// ============================================================

const CART_KEY = 'velvetEssenceCart';
let cart = JSON.parse(localStorage.getItem(CART_KEY) || localStorage.getItem('carrito') || '[]');

function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + (item.cantidad || 0), 0);
    if (DOM.cartCount) DOM.cartCount.innerText = totalItems;
    
    if (cart.length === 0) {
        if (DOM.cartItems) {
            DOM.cartItems.innerHTML = '<p class="empty-cart text-center mt-4">🛒 Aún no tienes productos</p>';
        }
        if (DOM.cartTotalPrice) DOM.cartTotalPrice.innerText = 'S/ 0.00';
        return;
    }
    
    let html = '';
    let total = 0;

    cart.forEach((item, idx) => {
        const price = item.precio || 0;
        const quantity = item.cantidad || 1;
        const subtotal = price * quantity;
        total += subtotal;

        html += `
<div class="cart-item d-flex align-items-center justify-content-between mb-3">
    <div class="d-flex align-items-center">
        <img src="${item.imagen || ''}" alt="${item.nombre || 'Producto'}" width="50" height="50" class="img-fluid me-2 rounded" style="object-fit: cover;">
        <div>
            <strong style="display: block; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.nombre || 'Producto'}</strong>
            <small class="text-muted">
                Cant: ${quantity} x S/ ${price.toFixed(2)}
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

    if (DOM.cartItems) DOM.cartItems.innerHTML = html;
    if (DOM.cartTotalPrice) DOM.cartTotalPrice.innerText = `S/ ${total.toFixed(2)}`;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem('carrito', JSON.stringify(cart));

    if (DOM.cartItems) {
        DOM.cartItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCartUI();
                if (cart.length === 0 && DOM.cartSidebar) {
                    DOM.cartSidebar.classList.remove('open');
                }
            });
        });
    }
}

// ============================================================
//  AÑADIR AL CARRITO DESDE EL MODAL
// ============================================================

function addToCartFromModal() {
    const productId = parseInt(DOM.modal.dataset.productId);
    const producto = productos.find(p => p.id === productId);
    if (!producto) return;

    const cantidad = modalCantidad;

    if (!producto.disponibilidad) {
        return;
    }

    const existingIndex = cart.findIndex(item => item.id === producto.id);
    
    if (existingIndex !== -1) {
        cart[existingIndex].cantidad += cantidad;
    } else {
        cart.push({
            id: producto.id,
            nombre: producto.nombre,
            marca: producto.marca,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: cantidad,
            tipo: producto.tipo,
            contenido: producto.contenido
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem('carrito', JSON.stringify(cart));
    updateCartUI();
    
    if (DOM.modalAddToCartBtn) {
        DOM.modalAddToCartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => DOM.modalAddToCartBtn.style.transform = '', 200);
    }

    if (DOM.cartSidebar) DOM.cartSidebar.classList.add('open');
}

// Eventos de los botones "Añadir al carrito" del modal
DOM.modalAddToCartBtn?.addEventListener('click', addToCartFromModal);
DOM.modalAddToCartBtnMobile?.addEventListener('click', addToCartFromModal);

// ============================================================
//  EVENTOS DEL MODAL
// ============================================================

DOM.modalClose?.addEventListener('click', cerrarModal);
DOM.modal?.addEventListener('click', (e) => {
    if (e.target === DOM.modal) cerrarModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
});

// ============================================================
//  EVENTOS DE FILTROS
// ============================================================

let debounceTimer;
DOM.search?.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(filtrarYOrdenar, 200);
});

DOM.filterMarca?.addEventListener('change', filtrarYOrdenar);
DOM.filterGenero?.addEventListener('change', filtrarYOrdenar);
DOM.filterTipo?.addEventListener('change', filtrarYOrdenar);
DOM.filterPrecio?.addEventListener('change', filtrarYOrdenar);
DOM.filterContenido?.addEventListener('change', filtrarYOrdenar);
DOM.filterOrden?.addEventListener('change', filtrarYOrdenar);

// ============================================================
//  CARRITO FLOTANTE - ABRIR/CERRAR
// ============================================================

DOM.cartToggle?.addEventListener('click', function(e) {
    e.stopPropagation();
    if (DOM.cartSidebar) DOM.cartSidebar.classList.toggle('open');
});

DOM.closeCart?.addEventListener('click', function(e) {
    e.stopPropagation();
    if (DOM.cartSidebar) DOM.cartSidebar.classList.remove('open');
});

document.addEventListener('click', function(e) {
    const clickedRemove = e.target.closest('.remove-item');
    if (
        DOM.cartSidebar &&
        DOM.cartToggle &&
        !DOM.cartSidebar.contains(e.target) &&
        !DOM.cartToggle.contains(e.target) &&
        !clickedRemove &&
        DOM.cartSidebar.classList.contains('open')
    ) {
        DOM.cartSidebar.classList.remove('open');
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && DOM.cartSidebar) {
        DOM.cartSidebar.classList.remove('open');
    }
});

// ============================================================
//  INICIALIZAR
// ============================================================

renderizarProductos(productos);
updateCartUI();
console.log('✅ Catálogo y carrito inicializados');

document.addEventListener('DOMContentLoaded', () => {
    // 1. Variables Globales de la vista
    const cart = JSON.parse(localStorage.getItem('velvetEssenceCart') || localStorage.getItem('carrito') || '[]')
        .map(item => ({ ...item, cantidad: item.cantidad || item.quantity || 1, precio: Number(item.precio || item.price || 0), nombre: item.nombre || item.name }));
    const paymentKey = 'paymentMethods';
    let payments = JSON.parse(localStorage.getItem(paymentKey) || '[]');
    let addresses = [];
    let editingAddressId = null;
    const modal = document.getElementById('modalDireccion') ? new bootstrap.Modal(document.getElementById('modalDireccion')) : null;

    // 2. Funciones de Renderizado
    function renderCart() {
        const container = document.getElementById('cartProductsContainer');
        const subtotal = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        const discount = subtotal * 0.05;
        const total = subtotal - discount;
        
        if (container) {
            container.innerHTML = cart.length ? cart.map(item => `<div class="product-item d-flex align-items-center gap-3 mb-3"><img src="${item.imagen || item.image || '/assets/logo/logo-dorado.png'}" alt="${item.nombre}" width="70" height="70" style="object-fit:cover"><div class="flex-grow-1"><strong>${item.nombre}</strong><div class="small text-muted">Cantidad: ${item.cantidad}</div></div><strong>S/${(item.precio * item.cantidad).toFixed(2)}</strong></div>`).join('') : '<div class="text-center py-5 text-muted"><i class="bi bi-cart-x fs-1"></i><p>No hay productos en el carrito</p><a href="/productos" class="btn btn-dark">Ir a tienda</a></div>';
        }
        
        const subtotalEl = document.getElementById('subtotal'); 
        const discountEl = document.querySelector('.summary-row .saved'); 
        const totalEl = document.getElementById('total');
        
        if (subtotalEl) subtotalEl.textContent = `S/${subtotal.toFixed(2)}`;
        if (discountEl) discountEl.textContent = `-S/${discount.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `S/${total.toFixed(2)}`;
    }

    function renderAddresses() {
        const info = document.getElementById('addressInfo'); 
        if (!info) return;
        
        info.innerHTML = addresses.length ? addresses.map(address => `<div class="address-card p-3 mb-2"><p class="address-name mb-2"><strong><i class="bi bi-geo-alt"></i> ${address.distrito}</strong></p><p class="address-detail mb-2"><i class="bi bi-house-door"></i> ${address.direccion}</p><p class="address-city mb-2">${address.departamento}, ${address.pais} - ${address.codigoPostal}</p><button class="btn-link edit-address" data-id="${address.id}">Editar</button> <button class="btn-link delete-address text-danger" data-id="${address.id}">Eliminar</button></div>`).join('') : '<div class="text-center py-4"><i class="bi bi-geo-alt fs-1 text-muted"></i><p class="text-muted mt-2">No tienes una direccion guardada</p></div>';
        
        document.querySelectorAll('.edit-address').forEach(button => button.onclick = () => openAddress(addresses.find(a => String(a.id) === button.dataset.id)));
        document.querySelectorAll('.delete-address').forEach(button => button.onclick = async () => { if (confirm('Eliminar esta direccion?')) { await fetch('/api/direcciones/' + button.dataset.id, { method: 'DELETE' }); await loadAddresses(); } });
    }

    async function loadAddresses() {
        const response = await fetch('/api/direcciones');
        if (!response.ok) { window.location.href = '/iniciar-sesion'; return; }
        addresses = await response.json(); 
        renderAddresses();
    }

    function openAddress(address) {
        editingAddressId = address?.id || null;
        document.getElementById('dirTitulo').value = address ? 'Direccion guardada' : '';
        document.getElementById('dirCalle').value = address?.direccion || '';
        document.getElementById('dirDistrito').value = address?.distrito || '';
        document.getElementById('dirReferencia').value = '';
        document.getElementById('modalDireccionLabel').textContent = address ? 'Editar Direccion' : 'Agregar Direccion';
        modal?.show();
    }

    document.getElementById('editAddressBtn')?.addEventListener('click', () => openAddress(addresses[0]));
    document.getElementById('formNuevaDireccion')?.addEventListener('submit', async event => {
        event.preventDefault();
        const data = { pais: 'Peru', departamento: 'Lima', distrito: document.getElementById('dirDistrito').value.trim(), direccion: `${document.getElementById('dirCalle').value.trim()}${document.getElementById('dirReferencia').value.trim() ? ', ' + document.getElementById('dirReferencia').value.trim() : ''}`, codigoPostal: '00000' };
        const response = await fetch('/api/direcciones' + (editingAddressId ? '/' + editingAddressId : ''), { method: editingAddressId ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        if (response.ok) { modal?.hide(); await loadAddresses(); } else alert('No se pudo guardar la direccion.');
    });

    function renderPayments() {
        const list = document.getElementById('paymentMethodsList'); 
        const selected = document.getElementById('selectedPaymentDisplay'); 
        if (!list) return;
        
        list.innerHTML = payments.length ? payments.map((card, index) => `<div class="payment-option ${card.selected ? 'selected' : ''}" data-index="${index}"><div class="card-brand">${card.type}</div><div class="card-number">**** **** **** ${card.number.slice(-4)}</div><div class="small text-muted">Vence: ${card.expiry}</div></div>`).join('') : '<div class="text-muted py-3">No hay tarjetas guardadas. El pago de este proyecto es simulado.</div>';
        
        list.querySelectorAll('.payment-option').forEach(option => option.onclick = () => { payments.forEach(card => card.selected = false); payments[Number(option.dataset.index)].selected = true; localStorage.setItem(paymentKey, JSON.stringify(payments)); renderPayments(); });
        
        const card = payments.find(item => item.selected); 
        if (selected) selected.innerHTML = card ? `<strong>Metodo seleccionado:</strong> ${card.type} **** ${card.number.slice(-4)}` : '';
    }

    document.getElementById('addPaymentBtn')?.addEventListener('click', () => new bootstrap.Modal(document.getElementById('addCardModal')).show());
    document.getElementById('confirmAddCardBtn')?.addEventListener('click', () => { const number = document.getElementById('newCardNumber').value.replace(/\s/g, ''); if (number.length < 13) return alert('Ingresa un numero de tarjeta valido.'); payments.forEach(card => card.selected = false); payments.push({ type: document.getElementById('newCardType').value, number, name: document.getElementById('newCardName').value, expiry: document.getElementById('newCardExpiry').value, selected: true }); localStorage.setItem(paymentKey, JSON.stringify(payments)); bootstrap.Modal.getInstance(document.getElementById('addCardModal'))?.hide(); renderPayments(); });

// ============================================================
    // 3. LÓGICA UNIFICADA DEL BOTÓN "PAGAR AHORA"
    // ============================================================
    const btnPagarAhora = document.getElementById('payNowBtn');
    
    if (btnPagarAhora) {
        btnPagarAhora.addEventListener('click', async (e) => {
            e.preventDefault();

            // A. Validaciones iniciales
            if (!cart || cart.length === 0) return alert('No hay productos en el carrito.');
            if (!addresses || addresses.length === 0) return alert('Agrega una dirección de entrega antes de pagar.');
            
            const userJson = localStorage.getItem('velvetEssenceUser');
            if (!userJson) {
                alert('Debes iniciar sesión para finalizar la compra.');
                window.location.href = '/iniciar-sesion';
                return;
            }
            const user = JSON.parse(userJson);

            // B. Cálculos a prueba de fallos (Evitamos el error NaN y null)
            let subtotal = 0;
            cart.forEach(item => {
                // Forzamos a que el precio sea solo números (limpia textos como "S/")
                let precioStr = String(item.precio).replace(/[^0-9.-]+/g, ""); 
                let precio = parseFloat(precioStr);
                let cantidad = parseInt(item.cantidad);
                
                // Si la extracción falla, obligamos a que sean valores seguros
                if (isNaN(precio)) precio = 0.0;
                if (isNaN(cantidad)) cantidad = 1;
                
                subtotal += (precio * cantidad);
            });

            const discount = subtotal * 0.05;
            let totalPagado = subtotal - discount;

            // Garantizamos que totalPagado sea un decimal válido (Nunca NaN ni null)
            if (isNaN(totalPagado)) {
                totalPagado = 0.0;
            } else {
                totalPagado = parseFloat(totalPagado.toFixed(2));
            }

            // C. Armar detalles del pedido validando que no haya IDs nulos
            const pedidoDetalles = cart.map(item => {
                let idPerfume = parseInt(item.id || item.sku);
                let cantPerfume = parseInt(item.cantidad || item.quantity);
                
                return {
                    perfume: { id: isNaN(idPerfume) ? 1 : idPerfume },
                    cantidad: isNaN(cantPerfume) ? 1 : cantPerfume
                };
            });

            // D. Crear el objeto exacto que espera Spring Boot
            const nuevoPedido = {
                usuario: { id: parseInt(user.id) },
                direccion: { id: parseInt(addresses[0].id) },
                fechaPedido: new Date().toISOString(),
                totalPagado: totalPagado,
                pedidoDetalles: pedidoDetalles
            };

            // E. Enviar petición al servidor
            try {
                btnPagarAhora.innerHTML = '<i class="bi bi-hourglass-split"></i> Procesando...';
                btnPagarAhora.disabled = true;

                const response = await fetch('/api/pedidos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoPedido)
                });

                if (response.ok) {
                    alert('¡Pago procesado con éxito! Tu pedido ha sido registrado.');
                    
                    // Limpiar carrito local
                    localStorage.removeItem('velvetEssenceCart');
                    localStorage.removeItem('carrito');
                    window.location.href = '/inicio';
                } else {
                    const errorText = await response.text();
                    console.error("Error del servidor:", errorText);
                    alert('Hubo un problema al registrar el pedido (Código ' + response.status + '). Revisa la consola.');
                    
                    btnPagarAhora.innerHTML = '<i class="bi bi-lock-fill"></i> Pagar ahora';
                    btnPagarAhora.disabled = false;
                }
            } catch (error) {
                console.error('Error de red:', error);
                alert('No se pudo conectar con el servidor.');
                
                btnPagarAhora.innerHTML = '<i class="bi bi-lock-fill"></i> Pagar ahora';
                btnPagarAhora.disabled = false;
            }
        });
    }
    
    // 4. Inicialización al cargar la página
    renderCart(); 
    renderPayments(); 
    loadAddresses();
});
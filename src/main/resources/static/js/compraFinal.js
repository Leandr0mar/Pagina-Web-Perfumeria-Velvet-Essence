document.addEventListener('DOMContentLoaded', () => {
    // 1. Variables Globales de la vista
    const cart = JSON.parse(localStorage.getItem('velvetEssenceCart') || localStorage.getItem('carrito') || '[]')
        .map(item => ({ ...item, cantidad: item.cantidad || item.quantity || 1, precio: Number(item.precio || item.price || 0), nombre: item.nombre || item.name }));
    const paymentKey = 'paymentMethods';
    let payments = JSON.parse(localStorage.getItem(paymentKey) || '[]');
    let addresses = [];
    let editingAddressId = null;
    let selectedAddressId = null;
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
        
        // Si hay direcciones pero ninguna seleccionada, marcamos la primera por defecto
        if (addresses.length > 0 && !selectedAddressId) {
            selectedAddressId = addresses[0].id;
        } else if (addresses.length === 0) {
            selectedAddressId = null;
        }
        
        info.innerHTML = addresses.length ? addresses.map(address => `
            <div class="address-card p-3 mb-2 rounded ${selectedAddressId === address.id ? 'border border-2 border-dark shadow-sm bg-light' : 'border border-1'}" 
                 style="cursor: pointer; position: relative;" 
                 data-id="${address.id}">
                
                <!-- Selector visual -->
                <div class="form-check position-absolute top-0 end-0 mt-3 me-3">
                    <input class="form-check-input" type="radio" name="addressSelection" 
                           ${selectedAddressId === address.id ? 'checked' : ''} style="cursor: pointer;">
                </div>

                <p class="address-name mb-2"><strong><i class="bi bi-geo-alt"></i> ${address.distrito}</strong></p>
                <p class="address-detail mb-2"><i class="bi bi-house-door"></i> ${address.direccion}</p>
                <p class="address-city mb-2 text-muted">${address.departamento}, ${address.pais} - ${address.codigoPostal}</p>
                
                <div class="mt-2" style="position: relative; z-index: 2;">
                    <button class="btn btn-sm btn-outline-dark edit-address me-2" data-id="${address.id}">Editar</button> 
                    <button class="btn btn-sm btn-outline-danger delete-address" data-id="${address.id}">Eliminar</button>
                </div>
            </div>
        `).join('') : '<div class="text-center py-4"><i class="bi bi-geo-alt fs-1 text-muted"></i><p class="text-muted mt-2">No tienes una dirección guardada</p></div>';
        
        // Evento para seleccionar la dirección (al hacer clic en cualquier parte de la tarjeta)
        document.querySelectorAll('.address-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Evitamos que se seleccione si el usuario hace clic en los botones de editar/eliminar
                if(e.target.closest('.edit-address') || e.target.closest('.delete-address')) return;
                
                selectedAddressId = parseInt(this.dataset.id);
                renderAddresses(); // Re-renderizamos para que se actualicen los bordes y el radio button
            });
        });

        // Configurar los botones de Editar
        document.querySelectorAll('.edit-address').forEach(button => button.onclick = (e) => {
            e.stopPropagation(); // Evita que la tarjeta se seleccione al intentar editar
            openAddress(addresses.find(a => String(a.id) === button.dataset.id));
        });
        
        // Configurar los botones de Eliminar
        document.querySelectorAll('.delete-address').forEach(button => button.onclick = async (e) => { 
            e.stopPropagation(); // Evita que la tarjeta se seleccione al intentar eliminar
            if (confirm('¿Eliminar esta dirección?')) { 
                await fetch('/api/direcciones/' + button.dataset.id, { method: 'DELETE' }); 
                
                // Si borramos la dirección que estaba seleccionada, limpiamos la selección
                if (selectedAddressId === parseInt(button.dataset.id)) {
                    selectedAddressId = null; 
                }
                await loadAddresses(); 
            } 
        });
    }

    async function loadAddresses() {
        const response = await fetch('/api/direcciones');
        if (!response.ok) { window.location.href = '/iniciar-sesion'; return; }
        addresses = await response.json(); 
        renderAddresses();
    }

    document.getElementById('editAddressBtn')?.addEventListener('click', () => openAddress(null));

    function openAddress(address) {
        editingAddressId = address?.id || null;
        
        // Llenar los campos con los datos de la dirección o valores por defecto
        document.getElementById('dirPais').value = address?.pais || 'Perú';
        document.getElementById('dirDepartamento').value = address?.departamento || '';
        document.getElementById('dirDistrito').value = address?.distrito || '';
        document.getElementById('dirCodigoPostal').value = address?.codigoPostal || '';
        document.getElementById('dirDireccion').value = address?.direccion || '';
        document.getElementById('dirPais').value = address?.pais || 'Perú';
        document.getElementById('dirDepartamento').value = address?.departamento || '';
        
        document.getElementById('modalDireccionLabel').textContent = address ? 'Editar Dirección' : 'Agregar Dirección';
        modal?.show();
    }

    document.getElementById('formNuevaDireccion')?.addEventListener('submit', async event => {
        event.preventDefault();
        
        // Recoger los datos exactos que pide el modelo Direccion.java
        const data = { 
            pais: document.getElementById('dirPais').value.trim(), 
            departamento: document.getElementById('dirDepartamento').value.trim(), 
            distrito: document.getElementById('dirDistrito').value.trim(), 
            direccion: document.getElementById('dirDireccion').value.trim(), 
            codigoPostal: document.getElementById('dirCodigoPostal').value.trim() 
        };
        
        const token = localStorage.getItem('token'); // O ajusta si usas otra key para tu JWT
        const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

        try {
            const response = await fetch('/api/direcciones' + (editingAddressId ? '/' + editingAddressId : ''), { 
                method: editingAddressId ? 'PUT' : 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                    ...authHeaders
                }, 
                body: JSON.stringify(data) 
            });
            
            if (response.ok) { 
                modal?.hide(); 
                await loadAddresses(); 
            } else {
                const err = await response.text();
                alert('No se pudo guardar la dirección. Error: ' + err);
            }
        } catch (error) {
            console.error("Error al guardar la dirección:", error);
            alert("No se pudo conectar con el servidor.");
        }
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
            if (!selectedAddressId) return alert('Por favor, selecciona a qué dirección quieres enviar tu pedido.');

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
                direccion: { id: selectedAddressId },
                fechaPedido: new Date().toISOString(),
                // Forzamos la conversión a Number; si algo falla, por defecto envía 0.0, nunca null
                totalPagado: Number(totalPagado) || 0.0, 
                pedidoDetalles: pedidoDetalles
            };

            // E. Enviar petición al servidor
            try {
                btnPagarAhora.innerHTML = '<i class="bi bi-hourglass-split"></i> Procesando...';
                btnPagarAhora.disabled = true;

                // Como la autenticación viaja de forma segura por la Cookie 'jwtToken' (visible en tu captura),
                // eliminamos el header 'Authorization' que estaba enviando el string "null".
                const response = await fetch('/api/pedidos', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
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
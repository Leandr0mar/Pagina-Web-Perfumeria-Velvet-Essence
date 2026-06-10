// ==================== MÉTODOS DE PAGO ====================
let paymentMethods = JSON.parse(localStorage.getItem("paymentMethods")) || [];

const paymentList = document.getElementById("paymentMethodsList");
const selectedDisplay = document.getElementById("selectedPaymentDisplay");

function renderPayments() {
    if (paymentMethods.length === 0) {
        paymentList.innerHTML = `
            <div class="text-muted py-3">
                <i class="bi bi-credit-card"></i> No hay tarjetas guardadas
                <br>
                <small>Haz click en "Agregar tarjeta" para añadir una</small>
            </div>
        `;
        selectedDisplay.innerHTML = "";
        return;
    }

    paymentList.innerHTML = "";

    paymentMethods.forEach((card, index) => {
        const div = document.createElement("div");
        div.className = "payment-option " + (card.selected ? "selected" : "");
        div.innerHTML = `
            <div class="card-brand">${card.type}</div>
            <div class="card-number">**** **** **** ${card.number.slice(-4)}</div>
            <div class="card-expiry mt-1 small text-muted">Vence: ${card.expiry}</div>
        `;
        div.onclick = () => {
            paymentMethods.forEach(c => c.selected = false);
            paymentMethods[index].selected = true;
            savePayments();
        };
        paymentList.appendChild(div);
    });

    const selected = paymentMethods.find(c => c.selected);
    if (selected) {
        selectedDisplay.innerHTML = `
            <strong>✓ Método seleccionado:</strong><br>
            ${selected.type} •••• ${selected.number.slice(-4)} (Vence: ${selected.expiry})
        `;
    } else {
        selectedDisplay.innerHTML = `
            <div class="text-warning">
                <i class="bi bi-exclamation-triangle"></i> No hay tarjeta seleccionada
            </div>
        `;
    }
}

function savePayments() {
    localStorage.setItem("paymentMethods", JSON.stringify(paymentMethods));
    renderPayments();
}

// Formatear número de tarjeta con espacios cada 4 dígitos
const cardNumberInput = document.getElementById("newCardNumber");
if (cardNumberInput) {
    cardNumberInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
        if (value.length > 16) value = value.slice(0, 16);
        let formatted = "";
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += " ";
            formatted += value[i];
        }
        e.target.value = formatted;
    });
}

// Formatear fecha MM/AA
const expiryInput = document.getElementById("newCardExpiry");
if (expiryInput) {
    expiryInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length >= 3) {
            value = value.slice(0, 2) + "/" + value.slice(2);
        }
        e.target.value = value;
    });
}

// Limitar CVV a 3 dígitos
const cvvInput = document.getElementById("newCardCVV");
if (cvvInput) {
    cvvInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
    });
}

// Selector de tipo de tarjeta
document.querySelectorAll(".card-type-option").forEach(option => {
    option.addEventListener("click", () => {
        document.querySelectorAll(".card-type-option").forEach(o => o.classList.remove("active"));
        option.classList.add("active");
        document.getElementById("newCardType").value = option.dataset.type;
    });
});

// Agregar tarjeta
const confirmAddCardBtn = document.getElementById("confirmAddCardBtn");
if (confirmAddCardBtn) {
    confirmAddCardBtn.addEventListener("click", () => {
        const type = document.getElementById("newCardType").value;
        let number = document.getElementById("newCardNumber").value.replace(/\s/g, "");
        const name = document.getElementById("newCardName").value.trim();
        const expiry = document.getElementById("newCardExpiry").value;
        const cvv = document.getElementById("newCardCVV").value;
        const saveCard = document.getElementById("saveCardCheckbox").checked;

        if (!number || number.length < 13) {
            alert("Ingresa un número de tarjeta válido (mínimo 13 dígitos)");
            return;
        }
        if (!name) {
            alert("Ingresa el nombre del titular");
            return;
        }
        if (!expiry || expiry.length !== 5) {
            alert("Ingresa la fecha de vencimiento (MM/AA)");
            return;
        }
        if (!cvv || cvv.length < 3) {
            alert("Ingresa el CVV de 3 dígitos");
            return;
        }

        if (saveCard) {
            paymentMethods.forEach(c => c.selected = false);
            paymentMethods.push({
                type,
                number: number,
                name,
                expiry,
                selected: true
            });
            savePayments();
        } else {
            alert("Tarjeta usada para esta compra (no se guardó)");
        }

        document.getElementById("newCardNumber").value = "";
        document.getElementById("newCardName").value = "";
        document.getElementById("newCardExpiry").value = "";
        document.getElementById("newCardCVV").value = "";

        bootstrap.Modal.getInstance(document.getElementById("addCardModal")).hide();
    });
}

// Abrir modal agregar tarjeta
const addPaymentBtn = document.getElementById("addPaymentBtn");
if (addPaymentBtn) {
    addPaymentBtn.addEventListener("click", () => {
        new bootstrap.Modal(document.getElementById("addCardModal")).show();
    });
}

// ==================== GESTIONAR MÉTODOS DE PAGO (ELIMINAR) ====================
function renderManagePayments() {
    const manageList = document.getElementById("managePaymentsList");
    if (paymentMethods.length === 0) {
        manageList.innerHTML = '<div class="text-muted text-center py-4">No hay tarjetas guardadas</div>';
        return;
    }

    manageList.innerHTML = "";
    paymentMethods.forEach((card, index) => {
        const div = document.createElement("div");
        div.className = "payment-option mb-3";
        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="card-brand">${card.type}</div>
                    <div class="card-number">**** **** **** ${card.number.slice(-4)}</div>
                    <div class="small text-muted">Titular: ${card.name}</div>
                    <div class="small text-muted">Vence: ${card.expiry}</div>
                </div>
                <button class="btn btn-danger btn-sm delete-card-btn" data-index="${index}">
                    <i class="bi bi-trash3"></i> Eliminar
                </button>
            </div>
        `;
        manageList.appendChild(div);
    });

    document.querySelectorAll(".delete-card-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = parseInt(btn.dataset.index);
            if (confirm("¿Eliminar esta tarjeta?")) {
                paymentMethods.splice(index, 1);
                if (paymentMethods.length > 0 && !paymentMethods.some(c => c.selected)) {
                    paymentMethods[0].selected = true;
                }
                savePayments();
                renderManagePayments();
            }
            e.stopPropagation();
        });
    });
}

const editPaymentBtn = document.getElementById("editPaymentBtn");
if (editPaymentBtn) {
    editPaymentBtn.addEventListener("click", () => {
        renderManagePayments();
        new bootstrap.Modal(document.getElementById("managePaymentModal")).show();
    });
}

// ==================== DIRECCIÓN DE ENTREGA MEJORADA ====================
let savedAddress = JSON.parse(localStorage.getItem("shippingAddress"));
const editAddressBtn = document.getElementById("editAddressBtn");
const addressInfo = document.getElementById("addressInfo");

function renderAddress() {
    if (!addressInfo) return;
    
    if (!savedAddress || !savedAddress.name) {
        addressInfo.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-geo-alt fs-1 text-muted"></i>
                <p class="text-muted mt-2 mb-0">No tienes una dirección guardada</p>
            </div>
        `;
        if (editAddressBtn) {
            editAddressBtn.innerHTML = '<i class="bi bi-plus-circle"></i> Añadir nueva dirección';
            editAddressBtn.style.color = "#C8A96B";
        }
    } else {
        addressInfo.innerHTML = `
            <div class="address-card p-3">
                <p class="address-name mb-2"><strong><i class="bi bi-person"></i> ${savedAddress.name}</strong></p>
                <p class="address-phone mb-2"><i class="bi bi-telephone"></i> ${savedAddress.phone}</p>
                <p class="address-detail mb-2"><i class="bi bi-house-door"></i> ${savedAddress.address}</p>
                <p class="address-city mb-0"><i class="bi bi-geo-alt-fill"></i> ${savedAddress.city}</p>
            </div>
        `;
        if (editAddressBtn) {
            editAddressBtn.innerHTML = '<i class="bi bi-pencil-square"></i> Editar dirección';
            editAddressBtn.style.color = "";
        }
    }
}

function clearAddressModalFields() {
    const fields = ["editName", "editLastName", "editPhone", "editAddressLine1", "editAddressLine2", 
                    "editDepartment", "editProvince", "editDistrict", "editPostalCode", "editCity"];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
    const countrySelect = document.getElementById("editCountry");
    if (countrySelect) countrySelect.value = "Perú";
    const countryCodeSelect = document.getElementById("editCountryCode");
    if (countryCodeSelect) countryCodeSelect.value = "+51";
    const defaultCheck = document.getElementById("setDefaultAddress");
    if (defaultCheck) defaultCheck.checked = true;
}

function openAddAddressModal() {
    clearAddressModalFields();
    const modalTitle = document.querySelector("#addressModal .modal-title");
    if (modalTitle) modalTitle.innerHTML = '<i class="bi bi-plus-circle"></i> Añadir nueva dirección';
    new bootstrap.Modal(document.getElementById("addressModal")).show();
}

function openEditAddressModal() {
    if (savedAddress && savedAddress.fullData) {
        const data = savedAddress.fullData;
        const nameParts = savedAddress.name ? savedAddress.name.split(" ") : ["", ""];
        
        if (document.getElementById("editName")) document.getElementById("editName").value = nameParts[0] || "";
        if (document.getElementById("editLastName")) document.getElementById("editLastName").value = nameParts.slice(1).join(" ") || "";
        if (document.getElementById("editPhone")) document.getElementById("editPhone").value = savedAddress.phone.replace(/^\+\d+\s/, "") || "";
        if (document.getElementById("editAddressLine1")) document.getElementById("editAddressLine1").value = data.addressLine1 || "";
        if (document.getElementById("editAddressLine2")) document.getElementById("editAddressLine2").value = data.addressLine2 || "";
        if (document.getElementById("editDepartment")) document.getElementById("editDepartment").value = data.department || "";
        if (document.getElementById("editProvince")) document.getElementById("editProvince").value = data.province || "";
        if (document.getElementById("editDistrict")) document.getElementById("editDistrict").value = data.district || "";
        if (document.getElementById("editPostalCode")) document.getElementById("editPostalCode").value = data.postalCode || "";
        if (document.getElementById("editCity")) document.getElementById("editCity").value = data.city || "";
        if (document.getElementById("editCountry")) document.getElementById("editCountry").value = data.country || "Perú";
        if (document.getElementById("editCountryCode")) {
            const code = savedAddress.phone.match(/^\+\d+/);
            if (code) document.getElementById("editCountryCode").value = code[0];
        }
    }
    const modalTitle = document.querySelector("#addressModal .modal-title");
    if (modalTitle) modalTitle.innerHTML = '<i class="bi bi-pencil-square"></i> Editar dirección';
    new bootstrap.Modal(document.getElementById("addressModal")).show();
}

if (editAddressBtn) {
    editAddressBtn.addEventListener("click", () => {
        if (!savedAddress || !savedAddress.name) {
            openAddAddressModal();
        } else {
            openEditAddressModal();
        }
    });
}

const saveAddressBtn = document.getElementById("saveAddressBtn");
if (saveAddressBtn) {
    saveAddressBtn.addEventListener("click", () => {
        const nombre = document.getElementById("editName")?.value.trim() || "";
        const apellido = document.getElementById("editLastName")?.value.trim() || "";
        const countryCode = document.getElementById("editCountryCode")?.value || "+51";
        const phone = document.getElementById("editPhone")?.value.trim() || "";
        const addressLine1 = document.getElementById("editAddressLine1")?.value.trim() || "";
        const addressLine2 = document.getElementById("editAddressLine2")?.value.trim() || "";
        const department = document.getElementById("editDepartment")?.value.trim() || "";
        const province = document.getElementById("editProvince")?.value.trim() || "";
        const district = document.getElementById("editDistrict")?.value.trim() || "";
        const postalCode = document.getElementById("editPostalCode")?.value.trim() || "";
        const city = document.getElementById("editCity")?.value.trim() || "";
        const country = document.getElementById("editCountry")?.value || "Perú";

        if (!nombre) {
            alert("❌ Por favor ingresa tu nombre");
            return;
        }
        if (!phone) {
            alert("❌ Por favor ingresa tu número de teléfono");
            return;
        }
        if (!addressLine1) {
            alert("❌ Por favor ingresa tu dirección");
            return;
        }

        const fullName = `${nombre} ${apellido}`.trim();
        const fullPhone = `${countryCode} ${phone}`;
        const fullAddress = `${addressLine1}${addressLine2 ? ', ' + addressLine2 : ''}, ${district}, ${province}, ${department}`;
        const fullCity = `${city}, ${country}, ${postalCode}`;

        const newAddress = {
            name: fullName,
            phone: fullPhone,
            address: fullAddress,
            city: fullCity,
            fullData: {
                name: nombre,
                lastName: apellido,
                countryCode: countryCode,
                phone: phone,
                addressLine1: addressLine1,
                addressLine2: addressLine2,
                department: department,
                province: province,
                district: district,
                postalCode: postalCode,
                city: city,
                country: country
            }
        };

        savedAddress = newAddress;
        localStorage.setItem("shippingAddress", JSON.stringify(savedAddress));
        renderAddress();

        bootstrap.Modal.getInstance(document.getElementById("addressModal")).hide();

        const toastMsg = document.createElement("div");
        toastMsg.className = "alert alert-success position-fixed bottom-0 end-0 m-3";
        toastMsg.style.zIndex = "9999";
        toastMsg.style.background = "#C8A96B";
        toastMsg.style.color = "#111";
        toastMsg.style.border = "none";
        toastMsg.style.borderRadius = "12px";
        toastMsg.style.padding = "12px 20px";
        toastMsg.innerHTML = '<i class="bi bi-check-circle"></i> Dirección guardada correctamente';
        document.body.appendChild(toastMsg);
        setTimeout(() => toastMsg.remove(), 2000);
    });
}

// ==================== CARGAR PRODUCTOS DEL CARRITO ====================
function loadCartProducts() {
    const cart = JSON.parse(localStorage.getItem("carrito")) || [];
    const container = document.getElementById("cartProductsContainer");

    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="bi bi-cart-x fs-1"></i>
                <p class="mt-3 mb-0">No hay productos en el carrito</p>
                <a href="index.html" class="btn btn-dark mt-3" style="border-radius: 0px !important;">Ir a tienda</a>
            </div>
        `;
        const subtotalEl = document.getElementById("subtotal");
        const totalEl = document.getElementById("total");
        if (subtotalEl) subtotalEl.innerText = "S/0.00";
        if (totalEl) totalEl.innerText = "S/0.00";
        return;
    }

    let subtotal = 0;
    container.innerHTML = "";

    cart.forEach((item) => {
        const precio = item.precio || item.price || 0;
        const cantidad = item.cantidad || 1;
        const itemTotal = precio * cantidad;
        subtotal += itemTotal;

        const productDiv = document.createElement("div");
        productDiv.className = "product-item";
        productDiv.innerHTML = `
            <img src="${item.imagen || 'https://via.placeholder.com/90'}" alt="${item.nombre}" onerror="this.src='https://via.placeholder.com/90'">
            <div class="flex-grow-1">
                <div class="product-name">${item.nombre}</div>
                <div class="product-quantity text-muted small">Cantidad: ${cantidad}</div>
            </div>
            <div class="product-price">S/${itemTotal.toFixed(2)}</div>
        `;
        container.appendChild(productDiv);
    });

    const descuento = subtotal * 0.05;
    const total = subtotal - descuento;

    const subtotalEl = document.getElementById("subtotal");
    const savedEl = document.querySelector(".summary-row .saved");
    const totalEl = document.getElementById("total");
    
    if (subtotalEl) subtotalEl.innerText = `S/${subtotal.toFixed(2)}`;
    if (savedEl) savedEl.innerText = `-S/${descuento.toFixed(2)}`;
    if (totalEl) totalEl.innerText = `S/${total.toFixed(2)}`;
}

// ==================== PAGAR AHORA ====================
const payNowBtn = document.getElementById("payNowBtn");
if (payNowBtn) {
    payNowBtn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("carrito")) || [];
        
        if (cart.length === 0) {
            alert("❌ No hay productos en el carrito");
            return;
        }

        if (!savedAddress || !savedAddress.name) {
            alert("❌ Por favor completa tu dirección de envío");
            return;
        }

        const selectedCard = paymentMethods.find(c => c.selected);
        if (paymentMethods.length > 0 && !selectedCard) {
            alert("❌ Por favor selecciona un método de pago");
            return;
        }
        if (paymentMethods.length === 0) {
            alert("❌ Por favor agrega una tarjeta de crédito/débito");
            return;
        }

        const total = document.getElementById("total")?.innerText || "S/0.00";
        if (confirm(`✅ Confirmar compra por ${total}\n\n¿Deseas finalizar tu pedido?`)) {
            alert(`🎉 ¡Compra realizada con éxito!\n\nTotal: ${total}\nMétodo: ${selectedCard.type} •••• ${selectedCard.number.slice(-4)}\nEnvío a: ${savedAddress.name}, ${savedAddress.address}`);
            
            localStorage.removeItem("carrito");
            loadCartProducts();
        }
    });
}

// Inicializar
renderAddress();
loadCartProducts();
renderPayments();


const apiBase = '/api/direcciones';
const LOGIN_STORAGE_KEY = 'velvetEssenceUser';

const direccionForm = document.getElementById('formulario-direccion');
const direccionIdInput = document.getElementById('direccionId');
const paisInput = document.getElementById('pais');
const departamentoInput = document.getElementById('departamento');
const distritoInput = document.getElementById('distrito');
const codigoPostalInput = document.getElementById('codigoPostal');
const direccionInput = document.getElementById('direccion');
const tituloFormulario = document.getElementById('titulo-formulario');
const btnCancelarEdicion = document.getElementById('btn-cancelar-edicion');
const contenedorDirecciones = document.getElementById('contenedor-direcciones');
const contadorDirecciones = document.getElementById('contador-direcciones');
const sinDirecciones = document.getElementById('sin-direcciones');

let direcciones = [];
let editando = false;
let usuarioLogueado = null;

async function initDireccionPage() {
    usuarioLogueado = obtenerUsuarioLogueado();
    if (!usuarioLogueado) {
        alert('Debes iniciar sesión para gestionar tus direcciones.');
        window.location.href = '/iniciar-sesion';
        return;
    }

    direccionForm.addEventListener('submit', onSubmitDireccion);
    contenedorDirecciones.addEventListener('click', onDireccionCardClick);
    btnCancelarEdicion.addEventListener('click', cancelarEdicion);
    await cargarDirecciones();
}

function obtenerUsuarioLogueado() {
    const json = localStorage.getItem(LOGIN_STORAGE_KEY);
    if (!json) return null;
    try {
        return JSON.parse(json);
    } catch (error) {
        return null;
    }
}

async function cargarDirecciones() {
    try {
        const response = await fetch(`${apiBase}/usuario/${usuarioLogueado.id}`);
        if (!response.ok) {
            throw new Error('No se pudo cargar las direcciones');
        }

        direcciones = await response.json();
        renderizarDirecciones();
    } catch (error) {
        console.error(error);
        contenedorDirecciones.innerHTML = '<div class="col-12"><div class="alert alert-danger rounded-0">Error al cargar direcciones.</div></div>';
    }
}

function renderizarDirecciones() {
    contenedorDirecciones.innerHTML = '';

    if (!direcciones || direcciones.length === 0) {
        sinDirecciones.classList.remove('d-none');
        contadorDirecciones.textContent = '0 direcciones guardadas';
        return;
    }

    sinDirecciones.classList.add('d-none');
    contadorDirecciones.textContent = `${direcciones.length} direcciones guardadas`;

    direcciones.forEach(direccion => {
        const card = document.createElement('div');
        card.className = 'col-12';
        card.innerHTML = `
            <div class="card address-card shadow-sm rounded-0" data-id="${direccion.id}">
                <button type="button" class="btn-close delete-btn" data-id="${direccion.id}" aria-label="Eliminar dirección"></button>
                <div class="card-body">
                    <h5 class="card-title mb-2 fw-bold">${escapeHtml(direccion.distrito || 'Sin distrito')} - ${escapeHtml(direccion.departamento || 'Sin departamento')}</h5>
                    <p class="mb-1"><strong>País:</strong> ${escapeHtml(direccion.pais || '-')}</p>
                    <p class="mb-1"><strong>Departamento:</strong> ${escapeHtml(direccion.departamento || '-')}</p>
                    <p class="mb-1"><strong>Distrito:</strong> ${escapeHtml(direccion.distrito || '-')}</p>
                    <p class="mb-1"><strong>Dirección:</strong> ${escapeHtml(direccion.direccion || '-')}</p>
                    <p class="mb-2"><strong>Código postal:</strong> ${escapeHtml(direccion.codigoPostal || '-')}</p>
                    <button type="button" class="btn btn-sm btn-outline-dark rounded-0 btn-editar" data-id="${direccion.id}">
                        <i class="bi bi-pencil-square me-1"></i> Editar dirección
                    </button>
                </div>
            </div>
        `;
        contenedorDirecciones.appendChild(card);
    });
}

async function onSubmitDireccion(event) {
    event.preventDefault();

    const direccionFormData = {
        pais: paisInput.value.trim(),
        departamento: departamentoInput.value.trim(),
        distrito: distritoInput.value.trim(),
        direccion: direccionInput.value.trim(),
        codigoPostal: codigoPostalInput.value.trim(),
        usuarioId: usuarioLogueado.id
    };

    if (!direccionFormData.pais || !direccionFormData.departamento || !direccionFormData.distrito || !direccionFormData.direccion || !direccionFormData.codigoPostal) {
        alert('Completa todos los campos antes de guardar la dirección.');
        return;
    }

    try {
        if (editando && direccionIdInput.value) {
            await actualizarDireccion(Number(direccionIdInput.value), direccionFormData);
        } else {
            await crearDireccion(direccionFormData);
        }

        resetFormulario();
        await cargarDirecciones();
    } catch (error) {
        console.error(error);
        alert('Ocurrió un error al guardar la dirección. Revisa la consola para más detalles.');
    }
}

async function crearDireccion(direccionData) {
    const response = await fetch(apiBase, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(direccionData)
    });

    if (!response.ok) {
        throw new Error('Error al crear la dirección');
    }

    return response.json();
}

async function actualizarDireccion(id, direccionData) {
    const response = await fetch(`${apiBase}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(direccionData)
    });

    if (!response.ok) {
        throw new Error('Error al actualizar la dirección');
    }

    return response.json();
}

async function eliminarDireccion(id) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta dirección?');
    if (!confirmacion) {
        return;
    }

    const response = await fetch(`${apiBase}/${id}?usuarioId=${usuarioLogueado.id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        alert('No fue posible eliminar la dirección.');
        return;
    }

    direcciones = direcciones.filter(d => d.id !== id);
    renderizarDirecciones();
}

function onDireccionCardClick(event) {
    const deleteButton = event.target.closest('.delete-btn');
    if (deleteButton) {
        const id = Number(deleteButton.dataset.id);
        if (id) {
            eliminarDireccion(id);
        }
        return;
    }

    const editButton = event.target.closest('.btn-editar');
    if (editButton) {
        const id = Number(editButton.dataset.id);
        if (id) {
            const direccion = direcciones.find(d => d.id === id);
            if (direccion) {
                cargarFormularioParaEditar(direccion);
            }
        }
    }
}

function cargarFormularioParaEditar(direccion) {
    direccionIdInput.value = direccion.id;
    paisInput.value = direccion.pais || '';
    departamentoInput.value = direccion.departamento || '';
    distritoInput.value = direccion.distrito || '';
    codigoPostalInput.value = direccion.codigoPostal || '';
    direccionInput.value = direccion.direccion || '';
    editando = true;
    tituloFormulario.textContent = 'Actualizar dirección';
    btnCancelarEdicion.classList.remove('d-none');
    btnCancelarEdicion.focus();
}

function cancelarEdicion() {
    resetFormulario();
}

function resetFormulario() {
    direccionIdInput.value = '';
    paisInput.value = '';
    departamentoInput.value = '';
    distritoInput.value = '';
    codigoPostalInput.value = '';
    direccionInput.value = '';
    editando = false;
    tituloFormulario.textContent = 'Nueva dirección';
    btnCancelarEdicion.classList.add('d-none');
}

function escapeHtml(value) {
    if (!value) {
        return '';
    }

    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

initDireccionPage();

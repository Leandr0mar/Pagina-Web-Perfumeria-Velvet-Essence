function clearLoggedUser() {
    localStorage.removeItem('velvetEssenceUser');
}

async function logoutAdmin() {
    try {
        await fetch('/auth/logout', { method: 'POST' });
    } catch (error) {
        console.warn('No se pudo notificar el cierre de sesion al servidor.', error);
    }
    clearLoggedUser();
    location.href = '/inicio';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('logoutAdminBtn')?.addEventListener('click', logoutAdmin);
    
    // Configuración Base Fetch
    const token = localStorage.getItem('token');
    const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

    const request = async (url, options = {}) => { 
        // El navegador enviará la cookie automáticamente
        const response = await fetch(url, options); 
        if (!response.ok) throw new Error('Operación no permitida o error en el servidor'); 
        return response; 
    };

    // Lógica para Eliminar (Perfumes, Usuarios, Pedidos)
    const setupDelete = (selector, endpoint, itemName) => {
        document.querySelectorAll(selector).forEach(button => {
            button.onclick = async () => { 
                if (confirm(`¿Estás seguro de eliminar este ${itemName}? Esta acción no se puede deshacer.`)) { 
                    try {
                        const originalHtml = button.innerHTML;
                        button.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
                        button.disabled = true;
                        
                        await request(`${endpoint}/${button.dataset.id}`, { method: 'DELETE' }); 
                        location.reload(); 
                    } catch (error) {
                        alert(`Error al eliminar ${itemName}. Verifica los permisos.`);
                        location.reload();
                    }
                } 
            };
        });
    };

    setupDelete('.delete-perfume', '/api/perfumes', 'perfume');
    setupDelete('.delete-user', '/api/usuarios', 'usuario');
    setupDelete('.delete-order', '/api/pedidos', 'pedido');

    // Inicializar el Modal de Bootstrap para Perfumes
    const modalEl = document.getElementById('perfumeModal');
    const perfumeModal = modalEl ? new bootstrap.Modal(modalEl) : null;
    const form = document.getElementById('perfumeForm');

    // Abrir Modal para crear Nuevo Perfume
    document.getElementById('btnNewPerfume')?.addEventListener('click', () => {
        form.reset();
        document.getElementById('perfId').value = '';
        document.getElementById('perfumeModalTitle').textContent = 'Añadir Nuevo Perfume';
        perfumeModal?.show();
    });

    // Abrir Modal para Editar Perfume
    document.querySelectorAll('.edit-perfume').forEach(button => {
        button.onclick = async () => { 
            try {
                // Obtener datos actuales del perfume
                const response = await request('/api/perfumes/' + button.dataset.id, { method: 'GET' });
                const perfume = await response.json();
                
                // Llenar el formulario
                document.getElementById('perfId').value = perfume.id;
                document.getElementById('perfNombre').value = perfume.nombre;
                document.getElementById('perfMarca').value = perfume.marca;
                document.getElementById('perfPrecio').value = perfume.precio;
                document.getElementById('perfStock').value = perfume.stock;
                document.getElementById('perfCategoria').value = perfume.categoria || 'Eau de Parfum';
                document.getElementById('perfDescripcion').value = perfume.descripcion || '';
                document.getElementById('perfImagen').value = perfume.imagen || '/assets/logo/logo-dorado.png';
                document.getElementById('perfGenero').value = perfume.genero || 'Unisex';
                
                document.getElementById('perfumeModalTitle').textContent = 'Editar Perfume';
                perfumeModal?.show();
            } catch (error) {
                alert("Error al cargar los datos del perfume.");
            }
        };
    });

   // ... (código previo de admin.js)

// --- VISTA PREVIA IMAGEN ---
const perfImagenInput = document.getElementById('perfImagen');
const perfImagenPreview = document.getElementById('perfImagenPreview');
const defaultPlaceholder = 'https://placehold.co/100x100/f8f2e9/b38b60?text=Vista+Previa';

if (perfImagenInput && perfImagenPreview) {
    perfImagenInput.addEventListener('input', function() {
        perfImagenPreview.src = this.value.trim() !== '' ? this.value : defaultPlaceholder;
    });
    perfImagenPreview.addEventListener('error', function() {
        this.src = defaultPlaceholder; 
    });
}

    // --- GUARDAR PERFUME (Con valores por defecto para campos faltantes) ---
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('perfId').value;
        const isEditing = id !== '';
        
        // Objeto completo para evitar errores de null en campos primitivos o listas
        const perfumeData = {
            nombre: document.getElementById('perfNombre').value,
            marca: document.getElementById('perfMarca').value,
            categoria: document.getElementById('perfCategoria').value,
            presentacion: 'Frasco estándar',
            descripcion: document.getElementById('perfDescripcion').value,
            precio: parseFloat(document.getElementById('perfPrecio').value) || 0.0,
            stock: parseInt(document.getElementById('perfStock').value) || 0,
            familiaOlfativa: 'No especificada', 
            modoDeUso: 'Uso externo',
            volumen: '100 ml',
            paisOrigen: 'Perú',
            notaSalida: ['Notas frescas'],
            notaCorazon: ['Notas florales'],
            notaFondo: ['Notas amaderadas'],
            imagen: document.getElementById('perfImagen').value,
            genero: document.getElementById('perfGenero').value
        };

        try {
            const url = isEditing ? `/api/perfumes/${id}` : '/api/perfumes';
            const method = isEditing ? 'PUT' : 'POST';
            await request(url, { 
                method: method, 
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, 
                body: JSON.stringify(perfumeData) 
            });
            perfumeModal?.hide();
            location.reload();
        } catch (error) {
            console.error(error);
            alert('Error al guardar. Asegúrate de estar logueado como Admin.');
        }
    });

});
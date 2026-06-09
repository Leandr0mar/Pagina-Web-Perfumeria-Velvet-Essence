// ===== LOGIN SIMPLE CON ESTADO LOCAL =====
const LOGIN_STORAGE_KEY = 'velvetEssenceUser';
const loginForm = document.getElementById('loginForm');
const loginAlert = document.getElementById('loginAlert');

function mostrarLoginError(mensaje) {
    if (!loginAlert) return;
    loginAlert.innerHTML = `
        <div class="alert alert-danger py-2 text-center" role="alert">
            ${mensaje}
        </div>
    `;
}

function limpiarLoginError() {
    if (!loginAlert) return;
    loginAlert.innerHTML = '';
}

function guardarUsuarioLogueado(usuario) {
    localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(usuario));
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

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        limpiarLoginError();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        if (!email || !password) {
            mostrarLoginError('Por favor ingresa correo y contraseña.');
            return;
        }

        try {
            const response = await fetch('/api/usuarios');
            if (!response.ok) {
                throw new Error('No se pudo conectar con el servidor.');
            }

            const usuarios = await response.json();
            const usuarioEncontrado = usuarios.find(u => u.correo?.toLowerCase() === email.toLowerCase() && u.contrasenia === password);

            if (!usuarioEncontrado) {
                mostrarLoginError('Correo o contraseña incorrectos.');
                return;
            }

            const usuarioGuardado = {
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                apellido: usuarioEncontrado.apellido,
                correo: usuarioEncontrado.correo
            };

            guardarUsuarioLogueado(usuarioGuardado, remember);
            alert(`¡Bienvenido ${usuarioGuardado.nombre}!`);
            window.location.href = '/inicio';
        } catch (error) {
            console.error('Error de login:', error);
            mostrarLoginError('Ocurrió un error al iniciar sesión. Intenta nuevamente.');
        }
    });
}

// Si el usuario ya inició sesión, redirige directamente a inicio
const usuarioExistente = obtenerUsuarioLogueado();
if (usuarioExistente) {
    window.location.href = '/inicio';
}

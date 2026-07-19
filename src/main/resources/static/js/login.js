document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginAlert = document.getElementById('loginAlert');

    if(loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const correo = document.getElementById('correo').value;
            const contrasenia = document.getElementById('contrasenia').value;
            loginAlert.classList.add('d-none');

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ correo: correo, contrasenia: contrasenia })
                });

                if (response.ok) {
                    const data = await response.json();
                    const usuarioLogueado = data.user;
                    
                    // Guardamos los datos del usuario en LocalStorage
                    localStorage.setItem('velvetEssenceUser', JSON.stringify(usuarioLogueado));
                    
                    // Verificamos si tiene el rol ADMIN buscando en el arreglo de strings
                    let esAdmin = false;
                    if (usuarioLogueado && usuarioLogueado.roles) {
                        esAdmin = usuarioLogueado.roles.includes('ROLE_ADMIN');
                    }

                    // Redirección inteligente al endpoint correcto
                    if (esAdmin) {
                        window.location.href = '/admin/dashboard';
                    } else {
                        window.location.href = data.redirectUrl || '/inicio';
                    }
                    
                } else {
                    loginAlert.textContent = "Credenciales incorrectas. Verifica tu correo y contraseña.";
                    loginAlert.classList.remove('d-none');
                }
            } catch (error) {
                console.error('Error de red al intentar iniciar sesión:', error);
                loginAlert.textContent = "Ocurrió un error en el servidor. Inténtalo más tarde.";
                loginAlert.classList.remove('d-none');
            }
        });
    }
});
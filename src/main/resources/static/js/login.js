document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginAlert = document.getElementById('loginAlert');

    if(loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            // Evita que el navegador recargue la página o haga el POST tradicional
            event.preventDefault();

            // Capturar los valores de los inputs
            const correo = document.getElementById('correo').value;
            const contrasenia = document.getElementById('contrasenia').value;

            // Ocultar alerta de error previa
            loginAlert.classList.add('d-none');

            try {
                // Hacer la petición REST al backend
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        correo: correo, 
                        contrasenia: contrasenia 
                    })
                });

                if (response.ok) {
                    // Si el login es exitoso (200 OK), leemos el JSON devuelto
                    const data = await response.json();
                    if (data.user) {
                        localStorage.setItem('velvetEssenceUser', JSON.stringify(data.user));
                    }
                    
                    // Redirigir según el rol (el backend nos mandará /index o /admin/dashboard)
                    window.location.href = data.redirectUrl || '/inicio';
                } else {
                    // Si falla (401 Unauthorized, 403, 400), mostramos error
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

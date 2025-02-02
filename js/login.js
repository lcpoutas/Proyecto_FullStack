document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("user");
    const passwordInput = document.getElementById("password");
    const rememberMeCheckbox = document.getElementById("remember-me");
    const cancelLoginBtn = document.getElementById("cancel-login");

    const user = localStorage.getItem("user");
    const welcomeModal = document.getElementById("welcome-modal");
    const usernameDisplay = document.getElementById("username-display");
    const closeModalBtn = document.querySelector(".close-btn");
    const modalLogoutBtn = document.getElementById("modal-logout-btn"); // 🔹 Botón del modal
    const loginForm = document.querySelector('.form-registro');

    console.log("Usuario encontrado en localStorage:", user);

    // Cargar usuario guardado si "Remember Me" estaba activado
    const savedUser = localStorage.getItem("rememberedUser");
    if (savedUser) {
        userInput.value = savedUser;
        rememberMeCheckbox.checked = true;
    }

    // Si ya hay un usuario logueado, mostrar el modal de bienvenida
    if (user && welcomeModal && usernameDisplay) {
        usernameDisplay.textContent = user;
        welcomeModal.style.display = "block";
    } else {
        console.warn("No se encontró un usuario en localStorage o elementos clave del modal no existen.");
    }

    // Cerrar el modal cuando se haga clic en el botón de cerrar
    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", function () {
            welcomeModal.style.display = "none";
        });
    } else {
        console.error("No se encontró el botón para cerrar el modal.");
    }

    // Manejar el formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Evita la recarga de la página al enviar el formulario

            const formData = new FormData(loginForm);

            fetch("../php/login.php", {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === "success") {
                        console.log("Login exitoso para:", data.username);
                        localStorage.setItem('user', data.username);

                        // Guardar usuario si "Remember Me" está activado
                        if (rememberMeCheckbox.checked) {
                            localStorage.setItem("rememberedUser", data.username);
                        } else {
                            localStorage.removeItem("rememberedUser");
                        }

                        // Mostrar modal de bienvenida
                        if (welcomeModal && usernameDisplay) {
                            usernameDisplay.textContent = data.username;
                            welcomeModal.style.display = "block";

                            const redirectMessage = document.createElement("p");
                            redirectMessage.textContent = "Redirigiendo a la página principal...";
                            welcomeModal.querySelector(".modal-content").appendChild(redirectMessage);

                            // Redirigir tras 2 segundos
                            setTimeout(() => {
                                window.location.href = "../index.html";
                            }, 2000);
                        }
                    } else {
                        alert(data.message); // Mostrar mensaje si el login falla
                        console.warn("Error de login:", data.message);
                    }
                })
                .catch(error => {
                    console.error("Error en la solicitud:", error);
                    alert("Error al conectar con el servidor. Intente nuevamente.");
                });
        });
    } else {
        console.error("Formulario de login no encontrado.");
    }

    // Evento para "Cancelar" (redirige a la página principal)
    if (cancelLoginBtn) {
        cancelLoginBtn.addEventListener("click", function () {
            window.location.href = "../index.html";
        });
    }

    // Evento de logout para el botón dentro del modal
    if (modalLogoutBtn) {
        modalLogoutBtn.addEventListener("click", function () {
            console.log("🔹 Cierre de sesión desde el modal.");
            localStorage.removeItem("user");
            location.reload();
        });
    } else {
        console.warn("⚠ No se encontró el botón de logout en el modal.");
    }
});

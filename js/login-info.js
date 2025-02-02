document.addEventListener("DOMContentLoaded", function () {
    const user = localStorage.getItem("user");
    const userSessionDiv = document.getElementById("user-session");
    const userNameSpan = document.getElementById("user-name");
    const logoutBtn = document.getElementById("logout-btn");
    const modalLogoutBtn = document.getElementById("modal-logout-btn"); // 🔹 Botón del modal

    console.log("Usuario en localStorage:", user);
    console.log("Div de sesión encontrado:", userSessionDiv !== null);

    // Mostrar el div de sesión si el usuario está logueado
    if (user && userSessionDiv && userNameSpan) {
        console.log("Usuario logueado:", user);
        userNameSpan.textContent = `Usuario: ${user}`;
        userSessionDiv.style.display = "block";
    } else {
        console.log("No hay usuario logueado o falta el div.");
    }

    // Evento de logout para el botón de la cabecera
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            console.log("🔹 Cierre de sesión desde la cabecera.");
            localStorage.removeItem("user");
            location.reload();
        });
    } else {
        console.warn("⚠ No se encontró el botón de logout en la cabecera.");
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

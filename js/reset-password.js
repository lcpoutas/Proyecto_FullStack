import { getPasswordStrength, updateStrengthBar, updatePasswordHint } from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const passwordHint = document.getElementById("password-hint");
    const strengthBar = document.querySelector(".strength-bar");
    const resetForm = document.getElementById("reset-password-form");
    const tokenInput = document.getElementById("token");

    // Capturar y asignar el token desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
        tokenInput.value = token;
    } else {
        alert("Token no válido. Solicita un nuevo enlace de restablecimiento.");
        window.location.href = "forgot-password.html"; // Redirige si no hay token
        return;
    }

    // Validar fuerza de la contraseña en tiempo real
    passwordInput.addEventListener("input", () => {
        const password = passwordInput.value;
        const strength = getPasswordStrength(password);
        updateStrengthBar(strengthBar, strength);
        updatePasswordHint(passwordHint, strength);
    });

    // Validar antes de enviar el formulario
    resetForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe automáticamente

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (getPasswordStrength(password) < 5) {
            alert("La contraseña debe cumplir con los requisitos de seguridad.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        // Enviar la solicitud al servidor para actualizar la contraseña
        const formData = new FormData(resetForm);

        fetch("../php/reset-password.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("Contraseña restablecida correctamente. Serás redirigido al login.");

                // Redirigir automáticamente al login tras 3 segundos
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 3000);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error("Error al restablecer la contraseña:", error);
            alert("Hubo un problema al restablecer la contraseña. Inténtalo de nuevo.");
        });
    });
});

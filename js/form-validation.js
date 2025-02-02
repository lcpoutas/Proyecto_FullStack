import { getPasswordStrength, updateStrengthBar, updatePasswordHint } from "./utils.js";

/**
 * Valida el usuario o email consultando la base de datos.
 * @param {string} type - 'username' o 'email'.
 * @param {HTMLElement} input - Elemento de entrada.
 * @param {HTMLElement} hint - Elemento donde se mostrará el mensaje.
 */
function validateField(type, input, hint) {
    const value = input.value.trim();

    if (type === "username" && value.length < 3) {
        hint.textContent = "El usuario debe tener al menos 3 caracteres.";
        hint.style.color = "red";
        return;
    }

    if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        hint.textContent = "El email no es válido.";
        hint.style.color = "red";
        return;
    }

    fetch("../php/validate.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, value })
    })
        .then(response => response.json())
        .then(data => {
            hint.textContent = data.exists
                ? (type === "username" ? "El nombre de usuario ya está registrado." : "El email ya está registrado.")
                : (type === "username" ? "El nombre de usuario está disponible." : "El email está disponible.");

            hint.style.color = data.exists ? "red" : "green";
        })
        .catch(error => {
            console.error(`Error validando ${type}:`, error);
            hint.textContent = `Error al validar ${type}, intenta nuevamente.`;
            hint.style.color = "red";
        });
}

/**
 * Debounce para evitar múltiples peticiones innecesarias.
 */
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const passwordHint = document.getElementById("password-hint");
    const strengthBar = document.querySelector(".strength-bar");

    const usernameHint = document.getElementById("username-hint");
    const emailHint = document.getElementById("email-hint");

    // Validar usuario y email con `debounce()`
    if (usernameInput && usernameHint) {
        usernameInput.addEventListener("blur", debounce(() => validateField("username", usernameInput, usernameHint), 500));
    }

    if (emailInput && emailHint) {
        emailInput.addEventListener("blur", debounce(() => validateField("email", emailInput, emailHint), 500));
    }

    // Validar fuerza de la contraseña
    if (passwordInput && passwordHint && strengthBar) {
        passwordInput.addEventListener("input", () => {
            const password = passwordInput.value;
            const strength = getPasswordStrength(password);

            updateStrengthBar(strengthBar, strength);
            updatePasswordHint(passwordHint, strength);
        });
    }
});

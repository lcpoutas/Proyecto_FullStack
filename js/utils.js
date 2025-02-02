export function createNotification(message, type, details, duration = 5000) {
    // Verificamos si ya existe un contenedor de notificaciones, si no, lo creamos
    let container = document.getElementById("notification-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";
        container.style.position = "fixed";
        container.style.bottom = "20px";
        container.style.right = "20px";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "10px";
        container.style.zIndex = "1000";
        document.body.appendChild(container);
    }

    // Creamos el contenedor de la notificación
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    // Estilos básicos de la notificación
    notification.style.padding = "10px 20px";
    notification.style.borderRadius = "5px";
    notification.style.fontSize = "1em";
    notification.style.fontWeight = "bold";
    notification.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    notification.style.opacity = "0";
    notification.style.transform = "translateY(10px)";
    notification.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    // Estilos según el tipo de mensaje
    if (type === "success") {
        notification.style.backgroundColor = "#d4edda";
        notification.style.color = "#155724";
        notification.style.border = "1px solid #c3e6cb";
    } else if (type === "error") {
        notification.style.backgroundColor = "#f8d7da";
        notification.style.color = "#721c24";
        notification.style.border = "1px solid #f5c6cb";
    } else {
        notification.style.backgroundColor = "#f8f9fa";
        notification.style.color = "#343a40";
        notification.style.border = "1px solid #ced4da";
    }

    // Agregar botón de cierre manual
    const closeButton = document.createElement("span");
    closeButton.textContent = "×";
    closeButton.style.marginLeft = "10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "1.2em";
    closeButton.style.fontWeight = "bold";
    closeButton.style.float = "right";
    closeButton.addEventListener("click", () => {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(10px)";
        setTimeout(() => notification.remove(), 300);
    });

    notification.appendChild(closeButton);

    // Si hay detalles, los agregamos
    if (details) {
        const detailsEl = document.createElement("div");
        detailsEl.textContent = `Detalles: ${details}`;
        detailsEl.style.marginTop = "5px";
        detailsEl.style.fontSize = "0.9em";
        detailsEl.style.color = "#6c757d";
        notification.appendChild(detailsEl);
    }

    // Añadimos la notificación al contenedor
    container.appendChild(notification);

    // Animamos la aparición de la notificación
    requestAnimationFrame(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateY(0)";
    });

    // Eliminamos la notificación después de `duration` milisegundos
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(10px)";
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

/**
 * 📌 Calcula la fuerza de una contraseña.
 * @param {string} password - La contraseña ingresada por el usuario.
 * @returns {number} - Un puntaje de 0 a 5 que indica la fuerza de la contraseña.
 */
export function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()=]/.test(password)) score++;
    return Math.min(score, 5);
}

/**
 * Actualiza la barra de fuerza de la contraseña.
 * @param {HTMLElement} strengthBar - Elemento de la barra de fuerza.
 * @param {number} strength - El puntaje de fuerza de la contraseña (de 0 a 5).
 */
export function updateStrengthBar(strengthBar, strength) {
    if (!strengthBar) return; // Evita errores si el elemento no existe
    const bars = strengthBar.children;

    for (let i = 0; i < bars.length; i++) {
        bars[i].className = ''; // Limpiar clases anteriores
        if (strength > i) {
            bars[i].classList.add(
                strength === 1 ? 'weak' :
                strength === 5 ? 'strong' :
                'medium'
            );
        }
    }
}

/**
 * Muestra un mensaje según la seguridad de la contraseña.
 * @param {HTMLElement} passwordHint - Elemento donde se muestra el mensaje.
 * @param {number} strength - El puntaje de fuerza de la contraseña (de 0 a 5).
 */
export function updatePasswordHint(passwordHint, strength) {
    if (!passwordHint) return;
    const hints = ["Muy débil", "Débil", "Moderada", "Buena", "Fuerte"];
    const colors = ["red", "orange", "yellow", "lightgreen", "green"];
    passwordHint.textContent = hints[strength - 1] || "";
    passwordHint.style.color = colors[strength - 1] || "";
}


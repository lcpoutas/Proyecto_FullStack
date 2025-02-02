// Importamos la función de notificación desde utils.js
import { createNotification } from "./utils.js";

const registrationForm = document.getElementById("registration-form");

if (registrationForm) {
    registrationForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita que el formulario recargue la página automáticamente

        const formData = new FormData(this); // Captura los datos del formulario

        try {
            // Realizamos la petición a registro.php
            const response = await fetch("../php/registro.php", {
                method: "POST",
                body: formData
            });

            // Verificamos si la respuesta del servidor es válida (status 200-299)
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            // Verificar si la respuesta es JSON válido antes de procesarlo
            const contentType = response.headers.get("content-type");
            const data = contentType && contentType.includes("application/json") 
                ? await response.json() 
                : { status: "error", message: "Respuesta no válida del servidor" };

            if (data.status === "success") {
                createNotification(data.message, "success");

                // Resetear el formulario tras un registro exitoso
                this.reset();

                // Opcional: Redirigir a login tras el registro
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000); // Espera 2 segundos antes de redirigir
            } else {
                createNotification(
                    data.message,
                    "error",
                    data.details ? data.details : null // Muestra detalles si están disponibles
                );
            }
        } catch (error) {
            createNotification(
                "Ocurrió un problema al enviar el formulario. Por favor, intenta nuevamente.",
                "error",
                error.message // Agrega detalles del error en la notificación
            );
            console.error("Error en el envío del formulario: ", error);
        }
    });
}

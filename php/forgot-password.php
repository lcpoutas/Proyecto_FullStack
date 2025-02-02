<?php
    header("Content-Type: application/json");

    try {
        $pdo = new PDO("mysql:host=127.0.0.1;dbname=VerboInPugna;charset=utf8mb4", "root", "", [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        // Obtener el email desde el formulario
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';

        if (empty($email)) {
            echo json_encode(['status' => 'error', 'message' => 'El correo electrónico es obligatorio.']);
            exit();
        }

        // Verificar si el email existe en la base de datos
        $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user) {
            echo json_encode(['status' => 'error', 'message' => 'Este correo no está registrado.']);
            exit();
        }

        // Generar un token único y una fecha de expiración
        $token = bin2hex(random_bytes(32));
        $expires_at = date("Y-m-d H:i:s", strtotime("+1 hour"));

        // Guardar el token en la base de datos
        $stmt = $pdo->prepare("UPDATE usuarios SET reset_token = ?, reset_expires = ? WHERE id = ?");
        $stmt->execute([$token, $expires_at, $user['id']]);

        // Enviar el email con el enlace de recuperación
        $resetLink = "http://localhost/proyecto/pages/reset-password.html?token=$token";
        $message = "Haz clic en el siguiente enlace para restablecer tu contraseña:\n\n$resetLink\n\nEste enlace expirará en 1 hora.";
        
        // Envío del correo (modificar según tu servidor de correo)
        mail($email, "Recuperación de contraseña", $message, "From: no-reply@verboinpugna.com");

        echo json_encode(['status' => 'success', 'message' => 'Correo de recuperación enviado.']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => 'Error en el servidor. Intente nuevamente.']);
    }
?>

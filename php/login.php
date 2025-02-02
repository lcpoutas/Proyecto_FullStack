<?php
session_start();
header("Content-Type: application/json");

try {
    error_log("Iniciando login.php");

    // Conexión segura a la base de datos
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=VerboInPugna;charset=utf8mb4", "root", "", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    error_log("Conexión a la base de datos exitosa.");

    // Obtener datos del formulario
    $username = isset($_POST['user']) ? trim($_POST['user']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    // Validar campos obligatorios
    if (empty($username) || empty($password)) {
        error_log("Campos vacíos en el login.");
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    error_log("Buscando usuario en la base de datos: $username");

    // Consulta segura para obtener el usuario
    $stmt = $pdo->prepare('SELECT id, username, password_hash, failed_attempts, last_failed_login FROM usuarios WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    // Si el usuario existe
    if ($user) {
        $current_time = time();
        $last_failed_time = strtotime($user['last_failed_login']);

        // Bloqueo por intentos fallidos en menos de 5 minutos
        if ($user['failed_attempts'] >= 5 && ($current_time - $last_failed_time) < 300) {
            $remainingTime = ceil((300 - ($current_time - $last_failed_time)) / 60);
            error_log("Cuenta bloqueada temporalmente. Intentar en $remainingTime minutos.");
            http_response_code(429); // Too Many Requests
            echo json_encode([
                'status' => 'error',
                'message' => "Demasiados intentos fallidos. Intenta nuevamente en $remainingTime minutos."
            ]);
            exit();
        }

        // Verificar la contraseña
        if (password_verify($password, $user['password_hash'])) {
            error_log("Contraseña correcta. Iniciando sesión para usuario: $username");

            // Restablecer intentos fallidos en la base de datos
            $stmt = $pdo->prepare('UPDATE usuarios SET failed_attempts = 0, last_failed_login = NULL WHERE id = ?');
            $stmt->execute([$user['id']]);

            // Guardar en sesión
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];

            error_log("🎉 Login exitoso para: $username");

            echo json_encode([
                'status' => 'success',
                'message' => 'Login exitoso',
                'username' => $user['username']
            ]);
            exit();
        } else {
            // Contraseña incorrecta, aumentar intentos fallidos
            error_log("Contraseña incorrecta para usuario: $username");
            $stmt = $pdo->prepare('UPDATE usuarios SET failed_attempts = failed_attempts + 1, last_failed_login = NOW() WHERE id = ?');
            $stmt->execute([$user['id']]);

            http_response_code(401); // Unauthorized
            echo json_encode(['status' => 'error', 'message' => 'Usuario o contraseña incorrectos.']);
            exit();
        }
    } else {
        error_log("Usuario no encontrado: $username");
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Usuario o contraseña incorrectos.']);
        exit();
    }
} catch (Exception $e) {
    error_log("Error en login.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Error interno del servidor. Intente nuevamente.'
    ]);
}
?>

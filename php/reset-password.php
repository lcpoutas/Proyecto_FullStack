<?php
header("Content-Type: application/json");

try {
    // Conectar a la base de datos con PDO
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=VerboInPugna;charset=utf8mb4", "root", "", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Obtener los datos enviados desde el formulario
    $token = isset($_POST['token']) ? trim($_POST['token']) : '';
    $new_password = isset($_POST['password']) ? trim($_POST['password']) : '';

    // Validar que se enviaron todos los datos
    if (empty($token) || empty($new_password)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    // Validar la nueva contraseña con estándares de seguridad
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=])[A-Za-z\d@$!%*?&=]{8,}$/', $new_password)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.'
        ]);
        exit();
    }

    // Buscar el token en la base de datos
    $stmt = $pdo->prepare("SELECT id, reset_expires FROM usuarios WHERE reset_token = ?");
    $stmt->execute([$token]);
    $user = $stmt->fetch();

    // Validar si el token es válido y no ha expirado
    if (!$user || strtotime($user['reset_expires']) < time()) {
        echo json_encode(['status' => 'error', 'message' => 'El token es inválido o ha expirado.']);
        exit();
    }

    // Hashear la nueva contraseña antes de almacenarla en la base de datos
    $password_hash = password_hash($new_password, PASSWORD_DEFAULT);

    // Actualizar la contraseña en la base de datos y eliminar el token
    $stmt = $pdo->prepare("UPDATE usuarios SET password_hash = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?");
    $stmt->execute([$password_hash, $user['id']]);

    // Confirmar que la contraseña se ha restablecido correctamente
    echo json_encode(['status' => 'success', 'message' => 'Contraseña restablecida correctamente.']);

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error interno del servidor.']);
}
?>

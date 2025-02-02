<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    // Conectar a la base de datos con PDO
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=VerboInPugna;charset=utf8mb4", "root", "", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Manejo de errores con excepciones
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Resultados como array asociativo
        PDO::ATTR_EMULATE_PREPARES => false, // Evita la emulación de sentencias preparadas
    ]);

    // Obtener los datos enviados desde JavaScript
    $data = json_decode(file_get_contents('php://input'), true);

    // Validar si `$data` es un array y tiene las claves necesarias
    if (!is_array($data) || !isset($data['type']) || !isset($data['value'])) {
        echo json_encode(['error' => 'Datos inválidos']);
        exit();
    }

    $type = $data['type'];
    $value = trim($data['value']); // Eliminamos espacios en blanco

    // Validar entrada
    if (!in_array($type, ['username', 'email']) || empty($value)) {
        echo json_encode(['error' => 'Datos inválidos']);
        exit();
    }

    // Preparar la consulta según el tipo de dato a validar
    $sql = ($type === 'username')
        ? "SELECT COUNT(*) as count FROM usuarios WHERE username = ?"
        : "SELECT COUNT(*) as count FROM usuarios WHERE email = ?";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$value]);
    $result = $stmt->fetch();

    // Devolver el resultado en formato JSON
    echo json_encode(['exists' => $result['count'] > 0]);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}
?>

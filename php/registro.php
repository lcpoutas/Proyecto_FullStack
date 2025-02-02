<?php

header('Content-Type: application/json');

try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=VerboInPugna;charset=utf8mb4', 'root', '', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    // Obtener los datos del formulario
    $name = trim($_POST['name']);
    $surname = trim($_POST['surname']);
    $email = trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL));
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $country = trim($_POST['country']);
    $birth_date = trim($_POST['date']);

    // Validar campos obligatorios
    if (empty($name) || empty($surname) || empty($email) || empty($username) || empty($password) || empty($country) || empty($birth_date)) {
        echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios.']);
        exit();
    }

    // Validar nombre
    if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ'’\- ]{2,50}$/", $name)) {
        echo json_encode(['status' => 'error', 'message' => 'El nombre no es válido.']);
        exit();
    }

    // Validar apellido
    if (!preg_match("/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ'’\- ]{2,100}$/", $surname)) {
        echo json_encode(['status' => 'error', 'message' => 'El apellido debe contener entre 2 y 100 caracteres, solo letras y espacios.']);
        exit();
    }

    // Validar email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { // ← Corregido
        echo json_encode(['status' => 'error', 'message' => 'El email no es válido.']);
        exit();
    }

    // Validar nombre de usuario
    if (!preg_match("/^(?!.*[_.]{2})[a-zA-Z0-9][a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$/", $username)) {
        echo json_encode(['status' => 'error', 'message' => 'El nombre de usuario no es válido.']);
        exit();
    }

    // Validar fecha de nacimiento
    if (!DateTime::createFromFormat('Y-m-d', $birth_date) || $birth_date >= date('Y-m-d')) {
        echo json_encode(['status' => 'error', 'message' => 'La fecha de nacimiento no es válida o es una fecha futura.']);
        exit();
    }

    // Validar contraseña (mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial)
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=])[A-Za-z\d@$!%*?&=]{8,}$/', $password)) {
        echo json_encode(['status' => 'error', 'message' => 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.']);
        exit();
    }

    // Validar que el email o el username no exista en la base de datos
    $stmtCheck = $pdo->prepare('SELECT COUNT(*) FROM usuarios WHERE email=? OR username=?');
    $stmtCheck->execute([$email, $username]);
    $exists = $stmtCheck->fetchColumn(); // ← Corregido

    if ($exists > 0) {
        echo json_encode(['status' => 'error', 'message' => 'El email o el nombre de usuario ya existen en la base de datos.']);
        exit();
    }

    // Hashear la contraseña antes de guardarla
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insertar el usuario en la base de datos
    $stmtInsert = $pdo->prepare("INSERT INTO usuarios (nombre, apellidos, email, username, password_hash, pais, birth_date) 
                                VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    $insertado = $stmtInsert->execute([$name, $surname, $email, $username, $password_hash, $country, $birth_date]);

    if ($insertado) {
        echo json_encode(['status' => 'success', 'message' => 'Registro completado correctamente.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al insertar los datos en la base de datos.']);
    }

} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
}

?>

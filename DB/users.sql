-- Crear la base de datos VerboInPugna si no existe
CREATE DATABASE IF NOT EXISTS VerboInPugna
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos VerboInPugna
USE VerboInPugna;

-- Crear la tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,            -- Identificador único para cada usuario
    nombre VARCHAR(50) NOT NULL,                  -- Nombre del usuario
    apellidos VARCHAR(100) NOT NULL,              -- Apellidos del usuario
    email VARCHAR(255) NOT NULL UNIQUE,           -- Email único para cada usuario
    username VARCHAR(50) NOT NULL UNIQUE,         -- Nombre de usuario único
    password_hash VARCHAR(255) NOT NULL,          -- Contraseña almacenada como hash
    pais VARCHAR(100) NOT NULL,                   -- País de residencia
    birth_date DATE NOT NULL,                     -- Fecha de nacimiento
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro automática
    failed_attempts INT DEFAULT 0,                -- Contador de intentos fallidos de login
    last_failed_login DATETIME NULL,              -- Último intento de login fallido
    reset_token VARCHAR(64) NULL,                 -- Token para recuperación de contraseña
    reset_expires DATETIME NULL                   -- Fecha de expiración del token
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# Verbo in Pugna 🃏🎓

## Descripción 📜

**Verbo in Pugna** es un juego de cartas estratégico basado en batallas intelectuales. Los jugadores eligen personajes históricos y filósofos para participar en debates y enfrentamientos dialécticos, utilizando cartas y habilidades únicas inspiradas en figuras y conceptos de la filosofía, la teología, la ciencia y la política.

---

## Estructura del Proyecto 📂

```plaintext
proyecto/
├── css/                    # Archivos CSS para diseño y estilo
│   ├── normalize.css       # Reseteo de estilos por defecto en navegadores
│   ├── style.css           # Estilos principales del proyecto
├── DB/                     # Base de datos del proyecto
│   ├── users.sql           # Esquema y datos iniciales de la base de datos
├── img/                    # Imágenes y gráficos
├── js/                     # Funcionalidad interactiva (JavaScript)
│   ├── forgot-password.js  # Lógica de recuperación de contraseñas
│   ├── form-submit.js      # Envío de formularios
│   ├── form-validation.js  # Validaciones de formularios
│   ├── login-info.js       # Control de sesiones activas
│   ├── login.js            # Lógica de inicio de sesión
│   ├── main.js             # Funciones generales del proyecto
│   ├── reset-password.js   # Restablecimiento de contraseñas
│   ├── utils.js            # Funciones auxiliares compartidas
├── node_modules/           # Dependencias de Node.js
├── pages/                  # Páginas HTML del proyecto
│   ├── eljuego.html         # Información del juego
│   ├── forgot-password.html # Formulario de recuperación de contraseñas
│   ├── historia.html        # Historia del juego
│   ├── login.html           # Página de inicio de sesión
│   ├── registro.html        # Página de registro
│   ├── reset-password.html  # Página para restablecer contraseñas
├── php/                    # Scripts PHP para la lógica del servidor
│   ├── forgot-password.php  # Gestión de tokens para restablecer contraseñas
│   ├── login.php            # Autenticación de usuarios
│   ├── registro.php         # Registro de nuevos usuarios
│   ├── reset-password.php   # Procesamiento de restablecimiento de contraseñas
│   ├── validate.php         # Validación de datos en tiempo real
├── index.html              # Página principal
├── LICENSE                 # Licencia del proyecto
├── package.json            # Dependencias y scripts del proyecto
├── package-lock.json       # Bloqueo de dependencias para consistencia
└── README.md               # Documentación del proyecto
```

---

## Instalación y Configuración 🛠️

### Clonar el repositorio

```bash
git clone https://github.com/lcpoutas/Proyecto_FullStack.git
cd Proyecto_FullStack
```

### Configurar la base de datos

1. Abre tu gestor de bases de datos MySQL.
2. Importa el archivo `users.sql` desde el directorio `DB/`.

```bash
mysql -u tu_usuario -p < DB/users.sql
```

---

### Configuración del servidor local

1. Instala y activa un servidor web compatible (XAMPP, WAMP o similar).
2. Copia el proyecto al directorio raíz del servidor web.
   - Ejemplo: `/opt/lampp/htdocs/proyecto`
3. Accede al proyecto en tu navegador:
   ```
   http://localhost/proyecto
   ```


¡Gracias por usar **Verbo in Pugna**! 🚀 Si necesitas más ayuda, no dudes en preguntar.

---

## Características Principales ✨

El proyecto **Verbo in Pugna** no solo ofrece un diseño atractivo y funcionalidad interactiva, sino que también incorpora múltiples medidas de **seguridad** y **optimización** que garantizan una experiencia confiable y robusta. A continuación, se describen las principales características del proyecto, incluyendo las implementaciones clave de seguridad:

---

#### 1. **Diseño Moderno y Responsivo** 🎨
   - **Framework CSS personalizado**: Utilizamos `normalize.css` para estandarizar estilos en todos los navegadores y `style.css` para personalizar el diseño según el tema filosófico del juego.
   - **Responsive Design**: El diseño se adapta a cualquier dispositivo, desde computadoras de escritorio hasta teléfonos móviles.
   - **Animaciones interactivas**: Swiper.js se emplea para carruseles de contenido, como eligiendo personajes y visualizando cartas.

---

#### 2. **Validación de Formularios en el Cliente y el Servidor** 🛡️
   - **Validaciones en el Cliente (JavaScript)**:
     - `form-validation.js` asegura que los datos enviados cumplan con los estándares definidos (contraseñas seguras, formato de correo válido, etc.).
     - Validación de contraseñas con una barra de progreso (`strength-bar`) que evalúa la fuerza de la contraseña en tiempo real.
   - **Validaciones en el Servidor (PHP)**:
     - PHP valida nuevamente los datos enviados desde el cliente, asegurando que no hayan sido manipulados.
     - Cada dato pasa por filtros (`filter_var()`, expresiones regulares) antes de interactuar con la base de datos.
     - Contraseñas se verifican con reglas de seguridad como:
       - Al menos 8 caracteres.
       - Una letra mayúscula, una minúscula, un número y un carácter especial.

---

#### 3. **Autenticación Segura** 🔐
   - **Uso de PHP PDO (PHP Data Objects)**:
     - Todas las interacciones con la base de datos se realizan utilizando consultas preparadas con `PDO`, evitando así vulnerabilidades de inyección SQL.
     ```php
     $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE username = ?");
     $stmt->execute([$username]);
     ```
   - **Hashing de Contraseñas**:
     - Las contraseñas se almacenan de manera segura utilizando el algoritmo `password_hash()` de PHP, que incorpora un "salting" automático y un esquema de hash robusto (por defecto, bcrypt).
     ```php
     $password_hash = password_hash($password, PASSWORD_DEFAULT);
     ```

---

#### 4. **Gestión de Sesiones y LocalStorage** 🛡️
   - **Sesiones PHP**:
     - Los datos sensibles del usuario, como su ID y nombre de usuario, se almacenan en `$_SESSION` durante la autenticación para evitar exponer información en el lado del cliente.
   - **Uso de LocalStorage para Experiencia de Usuario**:
     - `localStorage` se utiliza para mantener información no sensible (como el nombre del usuario) y mejorar la experiencia, por ejemplo, mostrando el estado de "usuario conectado" en diferentes páginas.
   - **Protección Contra Ataques de Sesión**:
     - Las sesiones se cierran al hacer clic en "Cerrar Sesión", y el `localStorage` se vacía para garantizar la desconexión completa.

---

#### 5. **Restablecimiento Seguro de Contraseñas** 🔄
   - **Recuperación mediante Tokens Temporales**:
     - Un token único (de 32 bytes) se genera para cada solicitud de restablecimiento de contraseña y se almacena en la base de datos con un tiempo de expiración (1 hora).
     ```php
     $token = bin2hex(random_bytes(32));
     $expires_at = date("Y-m-d H:i:s", strtotime("+1 hour"));
     ```
   - **Validación del Token en el Servidor**:
     - Antes de permitir el cambio de contraseña, se verifica que el token sea válido y que no haya expirado.
   - **Nueva Contraseña Segura**:
     - La contraseña restablecida debe cumplir con los mismos estándares de seguridad que las contraseñas iniciales.
   - **Eliminación del Token**:
     - Una vez que la contraseña es restablecida, el token se elimina de la base de datos para evitar reusos maliciosos.

---

#### 6. **Protección Contra Ataques de Fuerza Bruta** 🚨
   - **Intentos Fallidos**:
     - Cada usuario tiene un contador de intentos fallidos (`failed_attempts`) y una marca temporal del último intento (`last_failed_login`).
     - Después de 5 intentos fallidos en un lapso de 5 minutos, se bloquea temporalmente la cuenta.
     ```php
     if ($user['failed_attempts'] >= 5 && time() - strtotime($user['last_failed_login']) < 300) {
         echo json_encode(['status' => 'error', 'message' => 'Demasiados intentos fallidos. Intenta nuevamente más tarde.']);
     }
     ```

---

#### 7. **Cumplimiento de Estándares Web y de Seguridad** 🌐
   - **Encabezados HTTP Correctos**:
     - Uso de `Content-Type: application/json` en respuestas del servidor para garantizar que las peticiones devuelvan JSON correctamente interpretado.
   - **Protección Contra CORS**:
     - Configuración de cabeceras para habilitar solicitudes solo desde dominios permitidos:
       ```php
       header("Access-Control-Allow-Origin: http://localhost");
       header("Access-Control-Allow-Methods: POST, GET");
       ```

---

#### 8. **Manejo de Errores y Depuración** 🔧
   - **Errores Detallados en Desarrollo**:
     - Durante el desarrollo, los errores de PHP y JavaScript se logran rastrear fácilmente mediante la consola del navegador y los mensajes detallados en el servidor.
   - **Mensajes de Error Amigables al Usuario**:
     - Los errores críticos, como problemas con la base de datos o token inválido, muestran mensajes amigables para los usuarios mientras ocultan detalles técnicos.

---

Con estas medidas e implementaciones, el proyecto **Verbo in Pugna** garantiza tanto una experiencia de usuario fluida como la seguridad de los datos sensibles.

---

## Procesos Detallados 🛠️

### Registro de Usuarios

1. **Formulario de Registro**:
   - Los datos del usuario se validan tanto en el cliente (JavaScript) como en el servidor (PHP).
   - Contraseñas seguras verificadas con los siguientes estándares:
     - Al menos 8 caracteres.
     - Una letra mayúscula, una letra minúscula, un número y un carácter especial.

2. **Almacenamiento Seguro**:
   - Las contraseñas se almacenan como hash utilizando `password_hash()`.

3. **Validación en Tiempo Real**:
   - `validate.php` comprueba si el email o el nombre de usuario ya están registrados en la base de datos.
4. **Ejemplo de Contraseña Segura** - Una contraseña que cumpla con los estándares propuestos debe incluir:

   - **Al menos 8 caracteres**.
   - **Al menos una letra minúscula**.
   - **Al menos una letra mayúscula**.
   - **Al menos un número**.
   - **Al menos un carácter especial**.

#### Ejemplo:

1. `P@ssw0rd!`
2. `Str0ngP@ss!`
3. `Secur3&Saf3`
4. `MyP@ssw0rd123`
5. `Ex@mple2023!`

---

### Inicio de Sesión

1. **Autenticación**:
   - El usuario introduce su `username` y `password` en `login.html`.
   - Los datos se validan en `login.php`, y si son correctos:
     - Se genera una sesión PHP.
     - El nombre del usuario se guarda en `localStorage`.

2. **Gestión de Sesiones Activas**:
   - `main.js` detecta si un usuario está logueado.
   - Si lo está, muestra el botón de "Cerrar Sesión".

3. **Cierre de Sesión**:
   - Al hacer clic en el botón "Cerrar Sesión", se elimina el usuario del `localStorage` y se recarga la página.

---

### Proceso de Recuperación de Contraseña 🔄

En **Verbo in Pugna**, la funcionalidad de recuperación de contraseña permite que los usuarios restablezcan su contraseña de manera segura en caso de haberla olvidado. Aunque en esta implementación no hemos habilitado el envío automático de correos electrónicos, el proceso puede completarse manualmente accediendo a la base de datos para obtener el token de restablecimiento. A continuación, se detalla el proceso paso a paso:


#### Paso 1: Solicitar el Restablecimiento de Contraseña
1. El usuario navega a la página [**forgot-password.html**](http://localhost/proyecto/pages/forgot-password.html).
2. En la página, el usuario introduce su correo electrónico registrado en el formulario.
3. Al enviar el formulario:
   - El archivo PHP `forgot-password.php` verifica si el correo existe en la base de datos.
   - Si el correo es válido:
     - Se genera un **token único** (32 bytes) y una fecha de expiración (1 hora desde la solicitud).
     - Ambos valores se guardan en la base de datos en los campos `reset_token` y `reset_expires` del usuario correspondiente.
   - El mensaje de éxito es enviado al usuario: 
     - `"Un enlace de recuperación ha sido generado. Accede al token desde la base de datos."`
   - **Nota**: En un entorno con un servidor de correo configurado, se enviaría un correo con un enlace para restablecer la contraseña.

---

#### Paso 2: Acceder al Token desde la Base de Datos
1. Dado que el envío de correos electrónicos no está habilitado, el usuario deberá acceder directamente a la base de datos para obtener el token.
2. El administrador puede usar una herramienta como **phpMyAdmin** o ejecutar un comando SQL para obtener el token:
   ```sql
   SELECT reset_token FROM usuarios WHERE email = 'usuario@ejemplo.com';
   ```
3. Copiar el valor del token generado.

---

#### Paso 3: Acceder a la Página de Restablecimiento
1. El usuario debe construir manualmente la URL de restablecimiento usando el token obtenido:
   - Ejemplo de URL:
     ```
     http://localhost/proyecto/pages/reset-password.html?token=AQUI_EL_TOKEN
     ```
2. El usuario pega esta URL en el navegador para acceder a la página de restablecimiento de contraseña.

---

#### Paso 4: Introducir y Confirmar la Nueva Contraseña
1. En la página **reset-password.html**, el usuario encuentra un formulario que solicita:
   - La nueva contraseña.
   - La confirmación de la contraseña.
2. La validación de la contraseña se realiza tanto en el cliente (JavaScript) como en el servidor:
   - **En el cliente (JavaScript)**:
     - Una barra de progreso muestra la **fuerza de la contraseña** en tiempo real.
     - La contraseña debe cumplir con los siguientes requisitos:
       - Mínimo 8 caracteres.
       - Al menos una letra mayúscula, una minúscula, un número y un carácter especial.
       - Las contraseñas deben coincidir.
   - **En el servidor (PHP)**:
     - El token y la fecha de expiración se validan.
     - La contraseña se verifica nuevamente con los mismos estándares.
3. Si todo es correcto, el servidor:
   - Hashea la nueva contraseña con `password_hash()`.
   - Actualiza la base de datos con la nueva contraseña y elimina el token (`reset_token` y `reset_expires` se establecen como NULL).
   - Envía una respuesta de éxito al usuario:
     - `"Contraseña restablecida correctamente."`

---

#### Paso 5: Redirección al Login
1. Una vez que el proceso se completa, el usuario es redirigido automáticamente a la página de inicio de sesión (**login.html**):
   - Esto se logra mediante el siguiente código en `reset-password.js`:
     ```javascript
     .then(data => {
         if (data.status === "success") {
             alert("Contraseña restablecida correctamente. Redirigiendo al login...");
             setTimeout(() => {
                 window.location.href = "login.html";
             }, 2000);
         }
     })
     ```
2. El usuario puede iniciar sesión con su nueva contraseña.

---

### Notas de Seguridad
- **Validación en ambos lados**: Todas las entradas son validadas en el cliente y en el servidor para evitar manipulaciones.
- **Uso de tokens temporales**:
  - El token tiene una vida útil limitada (1 hora), y se invalida automáticamente al usarse.
  - Esto protege contra intentos de uso malintencionado.
- **No exposición del token**: Aunque se requiere acceder al token manualmente desde la base de datos en esta implementación, en un entorno de producción se enviaría automáticamente por correo al usuario.

---

### Ejemplo de Verificación en la Base de Datos
Para comprobar si el token y la fecha de expiración son válidos, se puede ejecutar el siguiente comando SQL:
```sql
SELECT id, reset_expires FROM usuarios WHERE reset_token = 'AQUI_EL_TOKEN' AND reset_expires > NOW();
```
Si no devuelve resultados, el token es inválido o ha expirado.

---
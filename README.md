# Verbo in Pugna 🃏🎓

## Descripción 📜

**Verbo in Pugna** es un juego de cartas estratégico basado en batallas intelectuales. Los jugadores eligen personajes históricos y filósofos para participar en debates y enfrentamientos dialécticos, utilizando cartas y habilidades únicas inspiradas en figuras y conceptos de la filosofía, la teología, la ciencia y la política.

---

## Estructura del Proyecto 📂

    proyecto/
    ├── css/              # Archivos CSS para diseño y estilo
    │   ├── normalize.css
    │   ├── style.css
    ├── DB/               # Base de datos del proyecto
    │   ├── users.sql
    ├── img/              # Imágenes y gráficos
    ├── js/               # Funcionalidad interactiva (JavaScript)
    │   ├── form-submit.js
    │   ├── form-validation.js
    │   ├── main.js
    │   ├── utils.js
    ├── node_modules/     # Dependencias de Node.js
    ├── pages/            # Páginas HTML del proyecto
    │   ├── eljuego.html
    │   ├── historia.html
    │   ├── login.html
    │   ├── registro.html
    ├── php/              # Scripts PHP para la lógica del servidor
    │   ├── registro.php
    │   ├── validate.php
    │   ├── index.html
    ├── LICENSE           # Licencia del proyecto
    ├── package.json      # Dependencias y scripts del proyecto
    ├── package-lock.json

---

## Características Principales ✨

- **Estilo clásico e ilustraciones animadas** 🖼️
- **Eventos y colecciones** 🎉
- **Elección de personajes** 🧠
- **Interactividad con Swiper.js** 🖱️
- **Validación avanzada de formularios con PHP y JavaScript** ✅

---

## Instalación y Configuración 🛠️

### Clonar el repositorio

```bash
git clone https://github.com/lcpoutas/Proyecto_FullStack.git
cd Proyecto_FullStack
```

### Configurar la base de datos

- Abre tu gestor de bases de datos MySQL.

- Importa el archivo SQL que crea automáticamente la base de datos y la tabla:

```bash
mysql -u tu_usuario -p < DB/users.sql
```

- Verifica que la base de datos VerboInPugna y la tabla usuarios se hayan creado correctamente.

### Configuración del servidor local

- Asegúrate de tener instalado XAMPP o un servidor web compatible con PHP y MySQL.

- Copia el proyecto dentro del directorio raíz del servidor web. Por ejemplo:
    - En Linux: /opt/lampp/htdocs/Proyecto_FullStack
    - En Windows: C:\xampp\htdocs\Proyecto_FullStack

- Activa el servidor web desde la línea de comandos:

```bash
cd /opt/lampp/htdocs/Proyecto_FullStack
php -S localhost:8000
```
- Accede al proyecto en tu navegador en la dirección http://localhost:8000.

### Solución de problemas con PHP ⚙️

1. **Errores de conexión a la base de datos**

    Si ves un mensaje como Error en la conexión a la base de datos en el formulario:

   - Verifica las credenciales en php/registro.php:

    ```php
    $conn = new mysqli('localhost', 'tu_usuario', 'tu_contraseña', 'VerboInPugna');
    ```
   - Asegúrate de que el servidor MySQL esté corriendo:

    ```bash
    sudo /opt/lampp/lampp start
    ```

2. **El módulo mysqli no está habilitado**

    Si aparece un error indicando que mysqli no está disponible:

   - Asegúrate de que el módulo mysqli esté habilitado:

    ```bash
    php -m | grep mysqli
    ```

   - Si no está habilitado, instala el módulo correspondiente:

    ```bash
    sudo apt-get install php-mysql
    ```

3. **El archivo registro.php no devuelve respuestas JSON**

    Si la página se recarga sin mostrar mensajes, verifica:

    - Que el encabezado Content-Type esté correctamente configurado en registro.php:

    ```php
    header("Content-Type: application/json");
    ```
   - Que el archivo esté accesible desde la ruta especificada en form-submit.js.

4. **Error de CORS o MIME en JavaScript**

    Si ves errores relacionados con MIME o CORS:

   - Asegúrate de que el archivo JavaScript se sirva correctamente desde el servidor local.
   - Configura el atributo type="module" en la etiqueta script al usar import:

    ```html
    <script type="module" src="../js/form-submit.js" defer></script>
    ```

5. **Problema con la ruta del servidor PHP**

    Si aparece un error como:

    ```bash
    /usr/bin/php no es compatible o falta `mysqli`
    ```

    Usa el comando:

    ```bash
    /opt/lampp/bin/php -S localhost:8000
    ```

    Este comando ejecuta el servidor PHP utilizando la versión configurada en XAMPP, que incluye el módulo mysqli.

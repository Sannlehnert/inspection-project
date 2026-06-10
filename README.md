# Sistema de Inspecciones Empresariales

Trabajo Práctico N.º 1 – Programación Backend  
Carrera: Desarrollo de Software Full Stack  

## Descripción

Este sistema permite gestionar formularios de inspección para empresas.  
Cada formulario está compuesto por categorías y preguntas, y puede tener múltiples revisiones.  
Las inspecciones se registran sobre una empresa, respondiendo todas las preguntas del formulario.  
Cada respuesta puede incluir una imagen como evidencia.

## Objetivo

Cumplir con la consigna del trabajo práctico:

- Crear formularios con categorías y preguntas.
- Consultar formularios.
- Registrar inspecciones realizadas.
- Consultar inspecciones completas.
- Manejar revisiones de formularios (nueva revisión, anterior queda obsoleta).
- Adjuntar imágenes a las respuestas.

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize (ORM)
- MySQL
- Multer (carga de imágenes)
- dotenv

## Requisitos previos

- Node.js y npm instalados
- MySQL corriendo en localhost
- Base de datos `inspecciones_db` creada (podés usar el script SQL incluido)

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tp-inspecciones.git
   cd tp-inspecciones
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configurar variables de entorno:

   Copiá `.env.example` a `.env` y completá los valores reales.

   ```
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=inspecciones_db
   DB_PORT=3306
   PORT=3000
   ```

4. Crear la base de datos y tablas:

   Ejecutá el script `script.sql` en MySQL.  
   También podés dejar que Sequelize sincronice los modelos, pero el script ya incluye restricciones exactas.

5. Iniciar el servidor:

   ```bash
   npm run dev
   ```

   (Usa `nodemon` para reinicio automático. Si preferís producción: `npm start`)

## Estructura de carpetas

```
tp-inspecciones/
├── docs/                  (capturas de pantalla)
├── src/
│   ├── config/
│   │   └── basededatos.js   (conexión Sequelize)
│   ├── controllers/
│   │   ├── empresasController.js
│   │   ├── formulariosController.js
│   │   ├── inspeccionesController.js
│   │   └── respuestasController.js
│   ├── middlewares/
│   │   ├── validarEmpresa.js
│   │   ├── validarFormulario.js
│   │   ├── validarInspeccion.js
│   │   └── subirImagen.js    (Multer)
│   ├── models/
│   │   ├── Empresa.js
│   │   ├── Formulario.js
│   │   ├── Categoria.js
│   │   ├── Pregunta.js
│   │   ├── Inspeccion.js
│   │   ├── Respuesta.js
│   │   └── index.js         (asociaciones)
│   ├── routes/
│   │   ├── empresas.js
│   │   ├── formularios.js
│   │   ├── inspecciones.js
│   │   └── respuestas.js
│   ├── uploads/             (imágenes guardadas)
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── script.sql
└── server.js
```

## Endpoints disponibles

### Empresas
- `POST /empresas` → Crear empresa  
- `GET /empresas` → Listar empresas

### Formularios
- `POST /formularios` → Crear formulario (con categorías y preguntas)  
- `GET /formularios` → Listar formularios  
- `GET /formularios/:id` → Obtener formulario con sus categorías y preguntas

### Inspecciones
- `POST /inspecciones` → Registrar inspección (con respuestas)  
- `GET /inspecciones/:id` → Obtener inspección completa (empresa, formulario, respuestas)

### Imágenes
- `POST /respuestas/:id/imagen` → Subir imagen a una respuesta (multipart/form-data, campo `imagen`)

## Decisiones de diseño importantes

- **Revisiones**: el número de revisión se envía al crear el formulario. Si ya existe otro con igual nombre, la anterior pasa a `activo = false`.  
- **Imágenes**: se cargan en un endpoint separado (`/respuestas/:id/imagen`) para no complicar el POST de inspección con multipart/form-data y arreglos.  
- **Validaciones**:
  - Los valores de respuesta solo pueden ser “Cumple”, “No cumple” o “N/A”.
  - No se pueden duplicar preguntas en una misma inspección.
  - Deben responderse todas las preguntas del formulario utilizado.
  - La empresa y el formulario deben existir.

## Autor

Santiago Agustín Lehnert
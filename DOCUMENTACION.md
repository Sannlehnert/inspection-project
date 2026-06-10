# Documentación técnica – Sistema de Inspecciones

## Modelo de datos

### Entidades y atributos

- **EMPRESA**: id_empresa (PK), nombre (UNIQUE, NOT NULL)
- **FORMULARIO**: id_formulario (PK), nombre, revision (entero), activo (TINYINT, 1=activo, 0=obsoleto)
- **CATEGORIA**: id_categoria (PK), titulo, orden, id_formulario (FK)
- **PREGUNTA**: id_pregunta (PK), texto, orden, id_categoria (FK)
- **INSPECCION**: id_inspeccion (PK), fecha, id_empresa (FK), id_formulario (FK)
- **RESPUESTA**: id_respuesta (PK), respuesta (ENUM), imagen (NULL), id_pregunta (FK), id_inspeccion (FK)

### Relaciones

- Formulario 1 → N Categoría
- Categoría 1 → N Pregunta
- Empresa 1 → N Inspección
- Formulario 1 → N Inspección
- Inspección 1 → N Respuesta
- Pregunta 1 → N Respuesta

## Restricciones adicionales

- UNIQUE(nombre, revision) en Formulario.
- UNIQUE(id_inspeccion, id_pregunta) en Respuesta.
- campo `respuesta` solo admite 'Cumple', 'No cumple', 'N/A'.
- Borrado restringido (ON DELETE RESTRICT) en todas las FK.

## Manejo de revisiones

Cuando se crea un formulario con un `nombre` y una `revision` determinados:
- Se desactivan (`activo = false`) todos los formularios con el mismo nombre.
- Se inserta el nuevo con `activo = true`.
- La restricción UNIQUE(nombre, revision) impide que se repita la misma combinación.

## Flujo de inspección

1. Se selecciona una empresa y un formulario (revisión concreta).
2. Se envían las respuestas: array de objetos con `id_pregunta` y `respuesta`.
3. El sistema verifica:
   - Que la empresa y el formulario existan.
   - Que todos los `id_pregunta` pertenezcan al formulario.
   - Que se hayan respondido todas las preguntas del formulario.
   - Que no haya duplicados ni valores inválidos.
4. Si todo está bien, se crea la inspección y sus respuestas en una transacción.

## Imágenes con Multer

- Se usa Multer con `diskStorage` para guardar archivos en la carpeta `uploads/`.
- Configuración: solo permite imágenes (jpeg, jpg, png, gif, webp), tamaño máximo 5 MB (ajustable).
- El endpoint `POST /respuestas/:id/imagen` recibe un único archivo en el campo `imagen`.
- El nombre del archivo se genera con timestamp + número aleatorio para evitar colisiones.
- Si la respuesta ya tenía imagen, se sobrescribe (el archivo anterior permanece en disco, pero la referencia se actualiza).

## Validaciones implementadas

- Empresa: nombre obligatorio, no vacío, único.
- Formulario: nombre y revisión obligatorios, al menos una categoría, cada categoría con al menos una pregunta, título y orden presentes.
- Inspección: empresa y formulario existen, todas las preguntas pertenecen al formulario, no hay duplicados, valores permitidos en respuestas.
- Imagen: archivo obligatorio, debe ser imagen.

## Consideraciones

- Las consultas anidadas usan `include` de Sequelize, ordenando por el campo `orden` de categorías y preguntas.
- El manejo de errores se hace con bloques try/catch, devolviendo códigos HTTP 400, 404, 409 y 500 según corresponda.
- La carpeta `uploads/` se crea automáticamente al guardar el primer archivo, pero conviene crearla manualmente o agregar un chequeo en `server.js`.
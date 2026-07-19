# Resumen de lo que se hizo en Condimentos Abby

Se creó la estructura base del proyecto para vender especias con una arquitectura separada en dos partes: `backend/` y `frontend/`.

## Backend

Se preparó un servidor con Node.js y Express que usa `cors` y PostgreSQL.

- Archivo principal: `backend/index.js`
- Conexión a la base de datos: `backend/db.js`
- Dependencias instaladas o declaradas: `express`, `cors`, `pg`, `dotenv`

### Qué hace

- Expone la API en `http://localhost:3000/productos`
- Consulta la tabla `productos`
- Devuelve los campos `id`, `nombre`, `cantidad` y `precio`
- Incluye una ruta extra de prueba en `/health`

## Frontend

Se creó una app en React con Vite y Tailwind CSS.

- Archivo principal: `frontend/src/App.jsx`
- Entrada principal: `frontend/src/main.jsx`
- Estilos base: `frontend/src/index.css`

### Qué hace

- Consume la API con `fetch`
- Muestra una tarjeta por cada producto
- Diseña la interfaz con un estilo moderno, limpio y responsive
- Incluye botones de compra por WhatsApp

## WhatsApp dinámico

Se agregó un array llamado `numerosWhatsApp` en `frontend/src/App.jsx`.

- El número activo se toma con `numerosWhatsApp[0]`
- Si quieres usar otro número, cambia el índice a `numerosWhatsApp[1]`
- Eso te permite alternar entre números de prueba y el número real sin cambiar toda la lógica

### Mensaje que se envía

El botón genera este formato:

`Hola, quiero pedir [nombre del producto] que cuesta $[precio]`

## Inicialización recomendada

### Backend

1. Entrar a la carpeta `backend`
2. Ejecutar `npm install`
3. Configurar el archivo `.env` con los datos de PostgreSQL
4. Ejecutar `npm start`

### Frontend

1. Entrar a la carpeta `frontend`
2. Ejecutar `npm install`
3. Ejecutar `npm run dev`

## Resultado final

Quedó una base lista para conectar la base de datos PostgreSQL con una tienda visual enfocada en ventas por WhatsApp, usando una estructura modular y fácil de mantener.

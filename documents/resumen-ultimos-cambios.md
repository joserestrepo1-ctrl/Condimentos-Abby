# Resumen de los últimos cambios

## Objetivo
Dejar el proyecto `Condimentos Abby` listo para trabajar tanto en desarrollo local como en producción usando una URL configurable de la API.

## Cambios realizados

### Frontend
- Se reemplazó la URL fija de la API por una variable de entorno en `frontend/src/App.jsx`.
- La URL se arma con `VITE_API_BASE_URL` y agrega automáticamente `/productos`.
- Se dejaron los archivos de entorno:
  - `frontend/.env.development` con `VITE_API_BASE_URL=http://localhost:3000`
  - `frontend/.env.production` con `VITE_API_BASE_URL=http://174.138.68.243:3000`
- Se corrigió la ruta del logo para que apunte a `images/Condimentos Abby.jpeg`.
- Se quitó la configuración de proxy de Vite porque ya no era necesaria con la URL base por entorno.

### Backend
- La ruta de la API quedó expuesta como `GET /productos` en `backend/index.js`.
- El backend sigue leyendo variables desde `.env` y usa el puerto definido por `PORT` o `3000` por defecto.

## Validaciones ejecutadas
- Se ejecutó `npm run build` en `frontend` y terminó correctamente.
- Se reinició el backend local y se verificó que responde con éxito en `http://localhost:3000/productos`.

## Resultado final
- En local, el frontend usa `http://localhost:3000/productos`.
- En producción, el frontend usa `http://174.138.68.243:3000/productos`.
- El cambio de entorno ya no requiere editar el código a mano cada vez.

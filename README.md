# Condimentos Abby

Catálogo web de productos y especias de Condimentos Abby. Los clientes pueden consultar los productos disponibles, armar un pedido y enviarlo directamente por WhatsApp.

## Tecnologías

- React 19 y Vite
- Tailwind CSS
- Node.js y Express
- Supabase (PostgreSQL gestionado)
- Vercel (deploy y dominio)

## Despliegue

- Frontend desplegado en Vercel
- Dominio principal: https://www.abbyj.me

## Estructura del proyecto

```text
.
├── backend/
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── images/
├── docker-compose.yml
└── test_db.js
```

## Cómo funciona

1. El frontend solicita los productos al backend.
2. El backend consulta la tabla `productos` en Supabase (PostgreSQL).
3. React muestra el catálogo con imágenes, precios y stock.
4. El cliente agrega productos al carrito.
5. El sistema genera un mensaje y abre WhatsApp para enviar el pedido.

El carrito se mantiene temporalmente en el navegador. Actualmente los pedidos no se guardan en la base de datos.

## Requisitos

- Node.js 20 o superior
- npm
- Proyecto de Supabase
- Docker Desktop (opcional, solo para desarrollo local con Docker Compose)

## Configuración del backend

Crea o configura `backend/.env` con una cadena de conexión válida:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME
PORT=3000
```

No subas secretos ni credenciales reales al repositorio.

La tabla requerida es:

```sql
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  cantidad INTEGER NOT NULL,
  precio NUMERIC NOT NULL
);
```

## Ejecutar localmente

### Backend

```bash
cd backend
npm install
npm start
```

La API estará disponible en `http://localhost:3000`.

### Frontend

En desarrollo, `frontend/.env.development` debe contener:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Después ejecuta:

```bash
cd frontend
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:4173`.

## API

### Obtener productos

```http
GET /api/productos
```

Devuelve los productos ordenados por `id`:

```json
[
  {
    "id": 1,
    "nombre": "Canela molida",
    "cantidad": 20,
    "precio": 5000
  }
]
```

### Comprobar conexión

```http
GET /api/health
```

Devuelve el estado de la API y la hora del servidor de base de datos.

## Docker Compose (solo desarrollo local)

Docker Compose se usa únicamente para levantar servicios en entorno local durante el desarrollo.
No se utiliza para el despliegue en producción.

Para iniciar servicios locales:

```bash
docker compose up --build
```

Para detenerlos:

```bash
docker compose down
```

## Build de producción

```bash
cd frontend
npm run build
```

El resultado se genera en `frontend/dist`.

En producción, la URL de la API se configura mediante `frontend/.env.production` usando `VITE_API_BASE_URL`.

## Limitaciones actuales

- Los pedidos no se almacenan en la base de datos.
- El stock no se descuenta automáticamente.
- No existe un panel administrativo.
- Las imágenes se relacionan con los productos mediante su nombre.
- El número de WhatsApp está configurado en `frontend/src/App.jsx`.

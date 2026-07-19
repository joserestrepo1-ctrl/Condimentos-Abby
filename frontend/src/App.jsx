import { useEffect, useState } from 'react';
import logoCondimentosAbby from '../../images/Condimentos Abby.jpeg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_URL = `${API_BASE_URL}/productos`;

const numerosWhatsApp = [
  '3043674857',
  '5492222222222',
];

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(precio));

export default function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de productos');
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const numeroWhatsAppPrincipal = numerosWhatsApp[0];

  const crearLinkWhatsApp = (producto) => {
    const mensaje = `Hola, quiero pedir ${producto.nombre} que cuesta $${formatearPrecio(producto.precio)}`;
    return `https://wa.me/${numeroWhatsAppPrincipal}?text=${encodeURIComponent(mensaje)}`;
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
        <header className="overflow-hidden rounded-[2rem] border-4 border-yellow-400 bg-white p-8 shadow-lg sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 rounded-[1.75rem] border-2 border-red-600 bg-white px-4 py-3 shadow-sm">
                <img
                  src={logoCondimentosAbby}
                  alt="Condimentos Abby"
                  className="h-28 w-auto max-w-[180px] object-contain sm:h-32 sm:max-w-[220px]"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-600">Marca oficial</p>
                  <span className="block text-2xl font-black text-red-600 sm:text-3xl">Condimentos Abby</span>
                </div>
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="inline-block rounded-full bg-white px-3 py-1 text-black shadow-sm ring-2 ring-yellow-400">
                  Especias premium
                </span>{' '}
                para elevar cada comida.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-gray-700 sm:text-lg">
                Catálogo simple, rápido y orientado a conversión. El cliente ve el producto y pide por WhatsApp en un clic.
              </p>
            </div>

            <div className="grid gap-3 rounded-3xl border-2 border-yellow-400 bg-white p-5 text-sm text-gray-800 sm:min-w-80">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">WhatsApp principal</span>
                <span className="rounded-full bg-green-600 px-3 py-1 font-black text-white shadow-sm ring-2 ring-green-700">
                  {numeroWhatsAppPrincipal}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">API</span>
                <span className="font-black text-yellow-600">{API_URL}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">Estado</span>
                <span className="font-black text-green-600">✓ Listo para vender</span>
              </div>
            </div>
          </div>
        </header>

        <section>
          {loading && (
            <div className="rounded-3xl border-2 border-yellow-400 bg-white p-8 text-center text-gray-700">
              Cargando productos...
            </div>
          )}

          {error && (
            <div className="rounded-3xl border-2 border-red-500 bg-white p-8 text-center text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && productos.length === 0 && (
            <div className="rounded-3xl border-2 border-yellow-400 bg-white p-8 text-center text-gray-700">
              No hay productos para mostrar.
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {productos.map((producto) => (
              <article
                key={producto.id}
                className="group rounded-[1.75rem] border-2 border-yellow-300 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-xl"
              >
                <div className="flex h-full flex-col gap-5">
                  <div className="overflow-hidden rounded-2xl border-2 border-yellow-400 bg-white p-3">
                    <img
                      src={logoCondimentosAbby}
                      alt="Perrito de Condimentos Abby"
                      className="h-40 w-full object-contain"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] font-bold text-yellow-600">Producto</p>
                      <h2 className="mt-2 text-2xl font-bold text-gray-900">{producto.nombre}</h2>
                    </div>
                    <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-white">
                      Stock: {producto.cantidad}
                    </span>
                  </div>

                  <div className="rounded-2xl border-2 border-yellow-400 bg-white p-4">
                    <p className="text-sm font-semibold text-yellow-600">Precio</p>
                    <p className="mt-1 text-3xl font-black text-black">${formatearPrecio(producto.precio)}</p>
                  </div>

                  <div className="mt-auto flex items-center gap-3">
                    <a
                      href={crearLinkWhatsApp(producto)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center rounded-2xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700 hover:shadow-lg"
                    >
                      Pedir por WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer className="pb-4 text-center text-sm text-gray-700">
          Cambia el número de prueba editando <span className="font-bold text-yellow-600">numerosWhatsApp[0]</span> a{' '}
          <span className="font-bold text-red-600">numerosWhatsApp[1]</span> cuando quieras usar el número real.
        </footer>
      </section>
    </main>
  );
}
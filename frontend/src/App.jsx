import { useEffect, useState } from 'react';
import logoCondimentosAbby from '../../images/imagenes de productos/Abby Logo.png';
import adoboCompletoImg from '../../images/imagenes de productos/adobocompleto.jpeg';
import anisEstrelladoImg from '../../images/imagenes de productos/anisestrellado.jpeg';
import calendulaImg from '../../images/imagenes de productos/calendula.jpeg';
import canelaAstillaImg from '../../images/imagenes de productos/canelaastilla.jpeg';
import canelaMolidaImg from '../../images/imagenes de productos/Canelamolida.jpg';
import clavosImg from '../../images/imagenes de productos/Clavos.jpeg';
import cocoImg from '../../images/imagenes de productos/Coco.jpeg';
import colorImg from '../../images/imagenes de productos/color.jpeg';
import cominoMolidoImg from '../../images/imagenes de productos/comino molido.jpeg';
import cominoGranoImg from '../../images/imagenes de productos/cominograno.jpeg';
import cominoPequenoImg from '../../images/imagenes de productos/cominopequeño.jpeg';
import curcumaImg from '../../images/imagenes de productos/curcuma.jpeg';
import florJamaicaImg from '../../images/imagenes de productos/florjamaica.jpeg';
import jengibreMolidoImg from '../../images/imagenes de productos/jengibremolido.jpeg';
import laurelImg from '../../images/imagenes de productos/Laurel.jpeg';
import linazaImg from '../../images/imagenes de productos/linaza.jpeg';
import linazaPequenaImg from '../../images/imagenes de productos/linazapequeña.jpeg';
import manzanillaImg from '../../images/imagenes de productos/manzanilla.jpeg';
import nuezMoscadaImg from '../../images/imagenes de productos/nuezmoscada.jpeg';
import oreganoImg from '../../images/imagenes de productos/Oregano.jpeg';
import paprikaImg from '../../images/imagenes de productos/paprika.jpeg';
import pasasImg from '../../images/imagenes de productos/Pasas.jpeg';
import pimientaMolidaImg from '../../images/imagenes de productos/pimientamolida.jpg';
import sodaImg from '../../images/imagenes de productos/soda.jpeg';
import sodaPequenaImg from '../../images/imagenes de productos/sodapequeña.jpeg';
import tomilloImg from '../../images/imagenes de productos/Tomillo.jpeg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';
const API_URL = `${API_BASE_URL}/api/productos`;

const imagenesProductos = {
  'adobo completo': adoboCompletoImg,
  'anis estrellado': anisEstrelladoImg,
  'aniz estrellado': anisEstrelladoImg,
  calendula: calendulaImg,
  'canela en astilla': canelaAstillaImg,
  'canela molida': canelaMolidaImg,
  clavos: clavosImg,
  coco: cocoImg,
  color: colorImg,
  'comino molido': cominoMolidoImg,
  'comino en grano': cominoGranoImg,
  'comino pequeno': cominoPequenoImg,
  curcuma: curcumaImg,
  'flor de jamaica': florJamaicaImg,
  'flor jamaica': florJamaicaImg,
  'jengibre molido': jengibreMolidoImg,
  laurel: laurelImg,
  linaza: linazaImg,
  'linaza pequena': linazaPequenaImg,
  manzanilla: manzanillaImg,
  'nuez moscada': nuezMoscadaImg,
  oregano: oreganoImg,
  paprika: paprikaImg,
  pasas: pasasImg,
  'pimienta molida': pimientaMolidaImg,
  soda: sodaImg,
  'soda pequena': sodaPequenaImg,
  tomillo: tomilloImg,
};

const normalizarNombreProducto = (nombre) =>
  nombre
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

const obtenerImagenProducto = (nombreProducto) =>
  imagenesProductos[normalizarNombreProducto(nombreProducto)] ?? logoCondimentosAbby;

const numeroWhatsAppVisible = '3234506510';
const numeroWhatsAppPrincipal = '573234506510';

const formatearPrecio = (precio) =>
  new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(precio));

export default function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [carrito, setCarrito] = useState({});

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

  const crearLinkWhatsApp = (producto) => {
    const mensaje = `Hola, quiero pedir ${producto.nombre} que cuesta $${formatearPrecio(producto.precio)}`;
    return `https://wa.me/${numeroWhatsAppPrincipal}?text=${encodeURIComponent(mensaje)}`;
  };

  const agregarProductoAlCarrito = (producto) => {
    setCarrito((carritoActual) => ({
      ...carritoActual,
      [producto.id]: {
        producto,
        cantidad: (carritoActual[producto.id]?.cantidad ?? 0) + 1,
      },
    }));
  };

  const disminuirProductoDelCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const itemActual = carritoActual[producto.id];

      if (!itemActual) {
        return carritoActual;
      }

      if (itemActual.cantidad <= 1) {
        const { [producto.id]: _eliminado, ...resto } = carritoActual;
        return resto;
      }

      return {
        ...carritoActual,
        [producto.id]: {
          ...itemActual,
          cantidad: itemActual.cantidad - 1,
        },
      };
    });
  };

  const eliminarProductoDelCarrito = (producto) => {
    setCarrito((carritoActual) => {
      if (!carritoActual[producto.id]) {
        return carritoActual;
      }

      const { [producto.id]: _eliminado, ...resto } = carritoActual;
      return resto;
    });
  };

  const productosEnCarrito = Object.values(carrito);
  const totalProductosSeleccionados = productosEnCarrito.reduce((total, item) => total + item.cantidad, 0);
  const totalPedido = productosEnCarrito.reduce((total, item) => total + item.cantidad * Number(item.producto.precio), 0);

  const crearMensajePedidoWhatsApp = () => {
    const lineasPedido = productosEnCarrito.map((item) => {
      const subtotal = item.cantidad * Number(item.producto.precio);
      return `- ${item.cantidad}x ${item.producto.nombre} - $${formatearPrecio(subtotal)}`;
    });

    const mensaje = [
      '¡Hola! Quisiera realizar el siguiente pedido:',
      ...lineasPedido,
      '',
      `Total pedido: $${formatearPrecio(totalPedido)}`,
    ].join('\n');

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
                  className="h-20 w-auto max-h-[96px] object-contain sm:h-24"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-600">MARCA OFICIAL</p>
                  <span className="block text-2xl font-black text-red-600 sm:text-3xl">Condimentos Abby</span>
                </div>
              </div>
              <h1 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-gray-900 font-sans sm:text-4xl lg:text-5xl">
                <span className="inline-block w-auto rounded-full bg-white px-[15px] py-2 text-black shadow-sm ring-2 ring-yellow-400 whitespace-nowrap">
                  Dale vida a cada plato.
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-gray-700 sm:text-lg">
                Catálogo simple, rápido y orientado a conversión. El cliente ve el producto y pide por WhatsApp en un clic.
              </p>
            </div>

            <div className="grid gap-4 rounded-3xl border-2 border-yellow-400 bg-white p-6 text-sm text-gray-800 sm:min-w-80">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold">WhatsApp principal</span>
                <span className="rounded-full bg-green-600 px-3 py-1 font-black text-white shadow-sm ring-2 ring-green-700">
                  {numeroWhatsAppVisible}
                </span>
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

          <div className="grid gap-6 pb-28 sm:grid-cols-2 xl:grid-cols-3">
            {productos.map((producto) => (
              <article
                key={producto.id}
                className="group rounded-[1.75rem] border-2 border-yellow-300 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-xl"
              >
                <div className="flex h-full flex-col gap-5">
                  <div className="overflow-hidden rounded-2xl border-2 border-yellow-400 bg-white p-3">
                    <img
                      src={obtenerImagenProducto(producto.nombre)}
                      alt={producto.nombre}
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

                  <div className="mt-auto flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-yellow-400 bg-white p-3">
                      <button
                        type="button"
                        onClick={() => disminuirProductoDelCarrito(producto)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl font-black text-gray-700 transition hover:bg-gray-200"
                        aria-label={`Disminuir cantidad de ${producto.nombre}`}
                      >
                        -
                      </button>

                      <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-600">Cantidad</p>
                        <p className="text-2xl font-black text-gray-900">{carrito[producto.id]?.cantidad ?? 0}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => agregarProductoAlCarrito(producto)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-2xl font-black text-white transition hover:bg-green-700"
                        aria-label={`Agregar una unidad de ${producto.nombre}`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => agregarProductoAlCarrito(producto)}
                      className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700 hover:shadow-lg"
                    >
                      Agregar al pedido
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {totalProductosSeleccionados > 0 && (
          <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[1.75rem] border-2 border-yellow-400 bg-white/95 p-4 shadow-2xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">Pedido activo</p>
                <p className="text-lg font-semibold text-gray-900">
                  {totalProductosSeleccionados} producto{totalProductosSeleccionados === 1 ? '' : 's'} seleccionado{totalProductosSeleccionados === 1 ? '' : 's'}
                </p>
                <p className="text-sm font-semibold text-gray-700">Total acumulado: ${formatearPrecio(totalPedido)}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-wrap gap-2">
                  {productosEnCarrito.slice(0, 3).map((item) => (
                    <span
                      key={item.producto.id}
                      className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-gray-800"
                    >
                      {item.cantidad}x {item.producto.nombre}
                    </span>
                  ))}
                  {productosEnCarrito.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                      +{productosEnCarrito.length - 3} más
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCarrito({})}
                    className="inline-flex items-center justify-center rounded-2xl border-2 border-gray-300 bg-white px-5 py-3 font-bold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
                  >
                    Vaciar
                  </button>
                  <a
                    href={crearMensajePedidoWhatsApp()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-3 font-bold text-white transition hover:bg-green-700 hover:shadow-lg"
                  >
                    Pedir por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>
    </main>
  );
}
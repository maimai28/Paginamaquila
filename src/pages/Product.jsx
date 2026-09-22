import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ProductImage from '../components/ProductImage.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProviderCard from '../components/ProviderCard.jsx'
import RatingSummary from '../components/RatingSummary.jsx'
import ReviewList from '../components/ReviewList.jsx'
import ContactNotice from '../components/ContactNotice.jsx'
import Stars from '../components/Stars.jsx'
import VerifiedBadge from '../components/VerifiedBadge.jsx'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'
import { calcularEstadisticas, getCategoria, getEstadisticasProveedor, getProducto, getProveedor, getResenasDeProveedor, productos } from '../lib/data.js'
import { PLAZOS, cantidadConUnidad, formatEntrega, formatMXN, formatNumero, formatPrecio, unidadPlural } from '../lib/format.js'

// La `key` reinicia el estado (imagen, filtros) al navegar entre productos.
export default function Product() {
  const { id } = useParams()
  return <ProductView key={id} id={id} />
}

function ProductView({ id }) {
  const producto = getProducto(id)
  const [imagen, setImagen] = useState(0)
  const [soloProducto, setSoloProducto] = useState(false)
  const [estrellas, setEstrellas] = useState(null)
  if (!producto) return <NotFound />

  const prov = getProveedor(producto.proveedorId)
  const cat = getCategoria(producto.categoriaId)
  const statsProv = getEstadisticasProveedor(prov.id)
  const resenasProv = getResenasDeProveedor(prov.id)
  const resenasProd = resenasProv.filter((r) => r.productoId === producto.id)
  const resenasVisibles = soloProducto ? resenasProd : resenasProv
  const stats = soloProducto ? calcularEstadisticas(resenasProd) : statsProv
  const similares = productos.filter((p) => p.categoriaId === producto.categoriaId && p.proveedorId !== prov.id).slice(0, 4)
  const tramos = [{ minimo: producto.pedidoMinimo, precio: producto.precioUnitario }, ...producto.preciosPorVolumen]

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: cat.nombre, to: `/buscar?cat=${cat.id}` }, { label: producto.nombre }]} />

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr_300px]">
        {/* Galería */}
        <div>
          <div className="card overflow-hidden">
            <ProductImage producto={producto} variante={imagen} className="aspect-[4/3] w-full" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((v) => (
              <button key={v} type="button" onClick={() => setImagen(v)} aria-label={`Ver imagen ${v + 1}`} aria-pressed={imagen === v}
                className={`overflow-hidden rounded-lg border-2 ${imagen === v ? 'border-brand-600' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                <ProductImage producto={producto} variante={v} etiqueta={false} className="aspect-[4/3] w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Información principal */}
        <div>
          <p className="text-sm font-medium text-brand-700">{cat.nombre}</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{producto.nombre}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <Link to={`/proveedor/${prov.id}`} className="font-medium text-slate-700 hover:text-brand-700 hover:underline">{prov.nombre}</Link>
            <VerifiedBadge verificado={prov.verificado} compacto />
            <a href="#resenas" className="inline-flex items-center gap-1.5 text-slate-600 hover:text-brand-700">
              <Stars value={statsProv.promedio} /> <span className="font-semibold text-slate-900">{statsProv.promedio.toFixed(1)}</span> ({statsProv.total} reseñas)
            </a>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Precio por {producto.unidad}</p>
            <p className="text-3xl font-bold text-slate-900">{formatPrecio(producto.precioUnitario)} <span className="text-base font-medium text-slate-500">MXN / {producto.unidad}</span></p>
            <p className="mt-1 text-xs text-slate-500">Precios de referencia antes de IVA. El precio final se confirma en la cotización.</p>

            <table className="mt-4 w-full text-sm">
              <caption className="mb-2 text-left text-sm font-semibold text-slate-900">Precio por volumen</caption>
              <thead><tr className="border-b border-slate-200 text-left text-xs text-slate-500"><th className="py-1.5 font-medium">Cantidad</th><th className="py-1.5 text-right font-medium">Precio por {producto.unidad}</th></tr></thead>
              <tbody>
                {tramos.map((t, i) => {
                  const hasta = tramos[i + 1]?.minimo
                  const ahorro = 1 - t.precio / producto.precioUnitario
                  return (
                    <tr key={t.minimo} className="border-b border-slate-100 last:border-0">
                      <td className="py-2 text-slate-700">{hasta ? `${formatNumero(t.minimo)} – ${formatNumero(hasta - 1)}` : `${formatNumero(t.minimo)} o más`} {unidadPlural(producto.unidad)}</td>
                      <td className="py-2 text-right font-semibold text-slate-900">
                        {formatPrecio(t.precio)}
                        {ahorro > 0 && <span className="ml-2 chip bg-emerald-50 px-1.5 py-0 text-emerald-700">−{Math.round(ahorro * 100)} %</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-lg bg-white p-3 ring-1 ring-slate-200">
              <Icon name="box" className="h-5 w-5 shrink-0 text-brand-600" />
              <div><dt className="text-xs text-slate-500">Pedido mínimo</dt><dd className="font-semibold text-slate-900">{cantidadConUnidad(producto.pedidoMinimo, producto.unidad)}</dd></div>
            </div>
            <div className="flex gap-3 rounded-lg bg-white p-3 ring-1 ring-slate-200">
              <Icon name="truck" className="h-5 w-5 shrink-0 text-brand-600" />
              <div><dt className="text-xs text-slate-500">Tiempo de entrega</dt><dd className="font-semibold text-slate-900">{formatEntrega(producto.tiempoEntregaDias)}</dd></div>
            </div>
          </dl>

          <div className="mt-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-slate-900"><Icon name="card" className="h-4 w-4 text-brand-600" />Plazos de pago disponibles</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {PLAZOS.map((p) => {
                const ok = producto.plazosPago.includes(p.id)
                return (
                  <li key={p.id} className={`chip gap-1 px-3 py-1.5 text-sm ${ok ? 'bg-brand-50 text-brand-800 ring-1 ring-brand-200' : 'bg-slate-100 text-slate-400 line-through'}`}>
                    {ok && <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />}{p.nombre}
                    {!ok && <span className="sr-only">(no disponible)</span>}
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to={`/cotizacion?producto=${producto.id}`} className="btn-primary flex-1 py-3 text-base">
              <Icon name="message" className="h-5 w-5" /> Solicitar cotización
            </Link>
            <Link to={`/proveedor/${prov.id}`} className="btn-secondary py-3">Ver proveedor</Link>
          </div>
          <ContactNotice className="mt-4" />
        </div>

        {/* Proveedor */}
        <aside className="lg:row-span-2">
          <div className="lg:sticky lg:top-44">
            <ProviderCard proveedor={prov} />
            <p className="mt-3 flex items-start gap-2 px-1 text-xs text-slate-500">
              <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
              La plataforma no recomienda a un proveedor sobre otro. Compara y decide con base en tus propios criterios.
            </p>
          </div>
        </aside>

        {/* Descripción y especificaciones */}
        <section className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-slate-900">Descripción</h2>
            <p className="mt-2 leading-relaxed text-slate-700">{producto.descripcion}</p>
            <h2 className="mt-8 text-lg font-bold text-slate-900">Especificaciones técnicas</h2>
            <table className="mt-3 w-full overflow-hidden rounded-lg text-sm ring-1 ring-slate-200">
              <tbody>
                {Object.entries(producto.especificaciones).map(([k, v], i) => (
                  <tr key={k} className={i % 2 ? 'bg-white' : 'bg-slate-50'}>
                    <th scope="row" className="w-2/5 px-4 py-2.5 text-left font-medium text-slate-600">{k}</th>
                    <td className="px-4 py-2.5 text-slate-900">{v}</td>
                  </tr>
                ))}
                <tr className="bg-white"><th scope="row" className="px-4 py-2.5 text-left font-medium text-slate-600">Unidad de venta</th><td className="px-4 py-2.5 text-slate-900">{producto.unidad}</td></tr>
                <tr className="bg-slate-50"><th scope="row" className="px-4 py-2.5 text-left font-medium text-slate-600">Precio de lista</th><td className="px-4 py-2.5 text-slate-900">{formatMXN(producto.precioUnitario)} / {producto.unidad}</td></tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs text-slate-500">Información proporcionada por el proveedor. La responsabilidad sobre la calidad y el cumplimiento de especificaciones es del proveedor.</p>
          </div>
        </section>
      </div>

      {/* Reseñas */}
      <section id="resenas" className="card mt-8 scroll-mt-44 p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Reseñas del proveedor</h2>
            <p className="text-sm text-slate-600">Calificaciones de maquiladoras que compraron a {prov.nombre} a través de la plataforma.</p>
          </div>
          <div className="inline-flex rounded-lg bg-slate-100 p-1 text-sm" role="group" aria-label="Alcance de las reseñas">
            <button type="button" onClick={() => { setSoloProducto(false); setEstrellas(null) }} aria-pressed={!soloProducto} className={`rounded-md px-3 py-1.5 ${!soloProducto ? 'bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-600'}`}>Todas ({resenasProv.length})</button>
            <button type="button" onClick={() => { setSoloProducto(true); setEstrellas(null) }} aria-pressed={soloProducto} className={`rounded-md px-3 py-1.5 ${soloProducto ? 'bg-white font-semibold text-slate-900 shadow-sm' : 'text-slate-600'}`}>De este producto ({resenasProd.length})</button>
          </div>
        </div>
        <div className="mt-6"><RatingSummary stats={stats} onFiltrarEstrellas={setEstrellas} estrellasActivas={estrellas} /></div>
        <div className="mt-8"><ReviewList resenas={resenasVisibles} estrellas={estrellas} onLimpiarEstrellas={() => setEstrellas(null)} /></div>
      </section>

      {similares.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Productos similares de otros proveedores</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
            {similares.map((p) => <ProductCard key={p.id} producto={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ProductCard from '../components/ProductCard.jsx'
import RatingSummary from '../components/RatingSummary.jsx'
import ReviewList from '../components/ReviewList.jsx'
import ContactNotice from '../components/ContactNotice.jsx'
import Stars from '../components/Stars.jsx'
import VerifiedBadge from '../components/VerifiedBadge.jsx'
import Icon from '../components/Icon.jsx'
import { Monograma } from '../components/ProviderCard.jsx'
import NotFound from './NotFound.jsx'
import { getCategoria, getEstadisticasProveedor, getProductosDeProveedor, getProveedor, getResenasDeProveedor } from '../lib/data.js'
import { aniosEnPlataforma, formatNumero } from '../lib/format.js'

export default function Provider() {
  const { id } = useParams()
  return <ProviderView key={id} id={id} />
}

function ProviderView({ id }) {
  const prov = getProveedor(id)
  const [estrellas, setEstrellas] = useState(null)
  if (!prov) return <NotFound />

  const stats = getEstadisticasProveedor(prov.id)
  const productos = getProductosDeProveedor(prov.id)
  const resenas = getResenasDeProveedor(prov.id)

  const datos = [
    { icon: 'pin', label: 'Ubicación', valor: prov.ciudad },
    { icon: 'calendar', label: 'En la plataforma', valor: `${aniosEnPlataforma(prov.enPlataformaDesde)} (desde ${prov.enPlataformaDesde})` },
    { icon: 'box', label: 'Pedidos completados', valor: formatNumero(prov.pedidosCompletados) },
    { icon: 'clock', label: 'Tiempo de respuesta a cotizaciones', valor: prov.tiempoRespuesta },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Proveedores', to: '/buscar' }, { label: prov.nombre }]} />

      {/* Encabezado */}
      <section className="card overflow-hidden">
        <div className="h-20 bg-gradient-to-r from-brand-800 to-brand-600 sm:h-24" />
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <span className="rounded-2xl bg-white p-1.5 shadow"><Monograma nombre={prov.nombre} className="h-20 w-20 text-2xl" /></span>
              <div className="pb-1">
                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{prov.nombre}</h1>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-500"><Icon name="pin" className="h-4 w-4" />{prov.ciudad}</p>
              </div>
            </div>
            <Link to={`/cotizacion?proveedor=${prov.id}`} className="btn-primary">
              <Icon name="message" className="h-4 w-4" /> Solicitar cotización a este proveedor
            </Link>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <VerifiedBadge verificado={prov.verificado} />
            <span className="inline-flex items-center gap-1.5 text-sm">
              <Stars value={stats.promedio} /> <strong>{stats.promedio.toFixed(1)}</strong> <span className="text-slate-500">({stats.total} reseñas)</span>
            </span>
            {prov.categorias.map((c) => (
              <Link key={c} to={`/buscar?cat=${c}`} className="chip bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-700">{getCategoria(c)?.nombre}</Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="card p-6">
            <h2 className="text-lg font-bold text-slate-900">Acerca del proveedor</h2>
            <p className="mt-2 leading-relaxed text-slate-700">{prov.descripcion}</p>
            {prov.certificaciones.length > 0 && (
              <>
                <h3 className="mt-5 text-sm font-semibold text-slate-900">Certificaciones y documentación declaradas</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {prov.certificaciones.map((c) => <li key={c} className="chip bg-brand-50 text-brand-800 ring-1 ring-brand-100">{c}</li>)}
                </ul>
                <p className="mt-2 text-xs text-slate-500">Declaradas por el proveedor. Solicita los certificados vigentes dentro de tu cotización.</p>
              </>
            )}
          </section>

          <section className="card p-6">
            <h2 className="text-lg font-bold text-slate-900">Calificación desglosada</h2>
            <div className="mt-5"><RatingSummary stats={stats} onFiltrarEstrellas={setEstrellas} estrellasActivas={estrellas} /></div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-slate-900">Datos generales</h2>
            <dl className="mt-3 space-y-3">
              {datos.map((d) => (
                <div key={d.label} className="flex gap-3">
                  <Icon name={d.icon} className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <div><dt className="text-xs text-slate-500">{d.label}</dt><dd className="text-sm font-semibold text-slate-900">{d.valor}</dd></div>
                </div>
              ))}
            </dl>
          </div>
          {prov.verificado ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
              <p className="flex items-center gap-2 font-semibold"><Icon name="shield" className="h-5 w-5" />Proveedor verificado</p>
              <p className="mt-1 text-emerald-800">Se revisó RFC, permisos vigentes y referencias comerciales. La verificación no garantiza la calidad de cada pedido. <Link to="/terminos#verificacion" className="underline">Conoce los alcances</Link>.</p>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-700">
              <p className="flex items-center gap-2 font-semibold"><Icon name="info" className="h-5 w-5" />Proveedor sin verificar</p>
              <p className="mt-1">Este proveedor aún no completa el proceso de verificación. <Link to="/terminos#verificacion" className="underline">¿Qué significa?</Link></p>
            </div>
          )}
          <ContactNotice />
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900">Productos que ofrece ({productos.length})</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {productos.map((p) => <ProductCard key={p.id} producto={p} />)}
        </div>
      </section>

      <section id="resenas" className="card mt-10 scroll-mt-44 p-6">
        <h2 className="text-xl font-bold text-slate-900">Todas las reseñas ({resenas.length})</h2>
        <div className="mt-4"><ReviewList resenas={resenas} estrellas={estrellas} onLimpiarEstrellas={() => setEstrellas(null)} /></div>
      </section>
    </div>
  )
}

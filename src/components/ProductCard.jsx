import { Link } from 'react-router-dom'
import ProductImage from './ProductImage.jsx'
import Stars from './Stars.jsx'
import VerifiedBadge from './VerifiedBadge.jsx'
import Icon from './Icon.jsx'
import { getProveedor, getEstadisticasProveedor, precioDesde } from '../lib/data.js'
import { formatPrecio, cantidadConUnidad, formatEntrega } from '../lib/format.js'

export default function ProductCard({ producto }) {
  const prov = getProveedor(producto.proveedorId)
  const stats = getEstadisticasProveedor(prov.id)
  const desde = precioDesde(producto)
  return (
    <Link to={`/producto/${producto.id}`} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <ProductImage producto={producto} className="h-full w-full transition duration-300 group-hover:scale-105" etiqueta={false} />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-slate-900 group-hover:text-brand-700">{producto.nombre}</h3>
        <p className="mt-2 text-xl font-bold text-slate-900">
          {formatPrecio(producto.precioUnitario)}
          <span className="ml-1 text-xs font-medium text-slate-500">MXN / {producto.unidad}</span>
        </p>
        {desde < producto.precioUnitario && (
          <p className="text-xs font-medium text-emerald-700">Desde {formatPrecio(desde)} por volumen</p>
        )}
        <dl className="mt-3 space-y-1 text-xs text-slate-600">
          <div className="flex items-center gap-1.5"><Icon name="box" className="h-3.5 w-3.5 text-slate-400" /><dt className="sr-only">Pedido mínimo</dt><dd>Mínimo {cantidadConUnidad(producto.pedidoMinimo, producto.unidad)}</dd></div>
          <div className="flex items-center gap-1.5"><Icon name="truck" className="h-3.5 w-3.5 text-slate-400" /><dt className="sr-only">Entrega</dt><dd>{formatEntrega(producto.tiempoEntregaDias)}</dd></div>
        </dl>
        <div className="mt-auto border-t border-slate-100 pt-3">
          <p className="truncate text-xs font-medium text-slate-700">{prov.nombre}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-slate-600">
              <Stars value={stats.promedio} size="h-3.5 w-3.5" />
              <span className="font-semibold text-slate-800">{stats.promedio.toFixed(1)}</span>
              <span>({stats.total})</span>
            </span>
            <VerifiedBadge verificado={prov.verificado} compacto />
          </div>
        </div>
      </div>
    </Link>
  )
}

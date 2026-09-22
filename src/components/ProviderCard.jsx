import { Link } from 'react-router-dom'
import Stars from './Stars.jsx'
import VerifiedBadge from './VerifiedBadge.jsx'
import Icon from './Icon.jsx'
import { getEstadisticasProveedor } from '../lib/data.js'
import { aniosEnPlataforma, formatNumero } from '../lib/format.js'

export function Monograma({ nombre, className = 'h-12 w-12 text-base' }) {
  const iniciales = nombre.replace(/,? S\.A\. de C\.V\./, '').split(/\s+/).filter((w) => w.length > 2 && w[0] === w[0].toUpperCase()).slice(0, 2).map((w) => w[0]).join('')
  return <span className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-800 font-bold text-cobre-200 ${className}`} aria-hidden="true">{iniciales}</span>
}

// Tarjeta del proveedor (sin datos de contacto: solo ciudad).
export default function ProviderCard({ proveedor }) {
  const stats = getEstadisticasProveedor(proveedor.id)
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Proveedor</p>
      <div className="mt-3 flex items-start gap-3">
        <Monograma nombre={proveedor.nombre} />
        <div className="min-w-0">
          <Link to={`/proveedor/${proveedor.id}`} className="font-semibold text-slate-900 hover:text-brand-700">{proveedor.nombre}</Link>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><Icon name="pin" className="h-3.5 w-3.5" />{proveedor.ciudad}</p>
          <div className="mt-2"><VerifiedBadge verificado={proveedor.verificado} /></div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Stars value={stats.promedio} />
        <span className="font-semibold text-slate-900">{stats.promedio.toFixed(1)}</span>
        <span className="text-sm text-slate-500">({stats.total} reseñas)</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">En la plataforma</dt><dd className="font-semibold text-slate-900">{aniosEnPlataforma(proveedor.enPlataformaDesde)}</dd></div>
        <div className="rounded-lg bg-slate-50 p-3"><dt className="text-xs text-slate-500">Pedidos completados</dt><dd className="font-semibold text-slate-900">{formatNumero(proveedor.pedidosCompletados)}</dd></div>
      </dl>
      <Link to={`/proveedor/${proveedor.id}`} className="btn-secondary mt-4 w-full">Ver perfil del proveedor</Link>
    </div>
  )
}

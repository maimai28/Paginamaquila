import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Stars from './Stars.jsx'
import Icon from './Icon.jsx'
import { CRITERIOS, getProducto } from '../lib/data.js'
import { formatFecha } from '../lib/format.js'

function ReviewCard({ r, mostrarProducto }) {
  const prod = getProducto(r.productoId)
  return (
    <article className="border-b border-slate-100 py-5 last:border-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Stars value={r.calificacion} />
        <h4 className="font-semibold text-slate-900">{r.titulo}</h4>
      </div>
      <p className="mt-1 text-xs text-slate-500">
        <span className="font-medium text-slate-700">{r.empresa}</span> · {formatFecha(r.fecha)}
        <span className="ml-2 inline-flex items-center gap-1 text-emerald-700"><Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />Pedido confirmado en la plataforma</span>
      </p>
      {mostrarProducto && prod && (
        <p className="mt-1 text-xs text-slate-500">Material: <Link to={`/producto/${prod.id}`} className="text-brand-700 hover:underline">{prod.nombre}</Link></p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-slate-700">{r.texto}</p>
      <dl className="mt-3 flex flex-wrap gap-2">
        {CRITERIOS.map((c) => {
          const v = r.calificaciones[c.id]
          return (
            <div key={c.id} className={`chip gap-1 ${v >= 4 ? 'bg-emerald-50 text-emerald-800' : v === 3 ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800'}`}>
              <dt>{c.nombre}</dt><dd className="font-bold">{v}/5</dd>
            </div>
          )
        })}
      </dl>
      {r.respuestaProveedor && (
        <div className="mt-3 rounded-lg border-l-4 border-brand-300 bg-brand-50/60 p-3 text-sm">
          <p className="text-xs font-semibold text-brand-800">Respuesta del proveedor</p>
          <p className="mt-1 text-slate-700">{r.respuestaProveedor}</p>
        </div>
      )}
    </article>
  )
}

const ORDENES = {
  recientes: { nombre: 'Más recientes', fn: (a, b) => b.fecha.localeCompare(a.fecha) },
  mejores: { nombre: 'Mejor calificadas', fn: (a, b) => b.calificacion - a.calificacion || b.fecha.localeCompare(a.fecha) },
  peores: { nombre: 'Peor calificadas', fn: (a, b) => a.calificacion - b.calificacion || b.fecha.localeCompare(a.fecha) },
}

export default function ReviewList({ resenas, mostrarProducto = true, estrellas = null, onLimpiarEstrellas }) {
  const [orden, setOrden] = useState('recientes')
  const lista = useMemo(
    () => resenas.filter((r) => !estrellas || r.calificacion === estrellas).sort(ORDENES[orden].fn),
    [resenas, orden, estrellas],
  )
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <p className="text-sm text-slate-600">
          Mostrando {lista.length} de {resenas.length}
          {estrellas && (
            <button type="button" onClick={onLimpiarEstrellas} className="ml-2 chip gap-1 bg-brand-50 text-brand-700 hover:bg-brand-100">
              {estrellas} {estrellas === 1 ? 'estrella' : 'estrellas'} <Icon name="x" className="h-3 w-3" />
            </button>
          )}
        </p>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          Ordenar
          <select value={orden} onChange={(e) => setOrden(e.target.value)} className="input w-auto py-1.5">
            {Object.entries(ORDENES).map(([k, o]) => <option key={k} value={k}>{o.nombre}</option>)}
          </select>
        </label>
      </div>
      {lista.length ? lista.map((r) => <ReviewCard key={r.id} r={r} mostrarProducto={mostrarProducto} />) : (
        <p className="py-8 text-center text-sm text-slate-500">No hay reseñas con este filtro.</p>
      )}
      <p className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
        Solo las empresas con un pedido completado a través de la plataforma pueden publicar reseñas. Las reseñas negativas no se eliminan por petición del proveedor; este puede responder públicamente.
      </p>
    </div>
  )
}

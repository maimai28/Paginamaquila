import Stars from './Stars.jsx'
import { CRITERIOS } from '../lib/data.js'

// Resumen de calificaciones: promedio, distribución por estrellas y promedio por criterio.
export default function RatingSummary({ stats, onFiltrarEstrellas, estrellasActivas }) {
  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_1fr]">
      <div className="text-center sm:pr-6 sm:text-left">
        <p className="text-5xl font-bold text-slate-900">{stats.total ? stats.promedio.toFixed(1) : '—'}</p>
        <Stars value={stats.promedio} size="h-5 w-5" className="mt-1" />
        <p className="mt-1 text-sm text-slate-500">{stats.total} {stats.total === 1 ? 'reseña' : 'reseñas'}</p>
      </div>

      <div className="space-y-1.5">
        {[5, 4, 3, 2, 1].map((n) => {
          const c = stats.distribucion[n]
          const pct = stats.total ? (c / stats.total) * 100 : 0
          const activo = estrellasActivas === n
          const Tag = onFiltrarEstrellas ? 'button' : 'div'
          return (
            <Tag
              key={n}
              {...(onFiltrarEstrellas && { type: 'button', onClick: () => onFiltrarEstrellas(activo ? null : n), 'aria-pressed': activo })}
              className={`flex w-full items-center gap-2 rounded px-1 text-sm ${onFiltrarEstrellas ? 'hover:bg-slate-100' : ''} ${activo ? 'bg-brand-50 ring-1 ring-brand-200' : ''}`}
            >
              <span className="w-20 shrink-0 text-left whitespace-nowrap text-slate-600">{n} {n === 1 ? 'estrella' : 'estrellas'}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                <span className="block h-full rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
              </span>
              <span className="w-6 text-right text-slate-500">{c}</span>
            </Tag>
          )
        })}
      </div>

      <div className="space-y-2.5 sm:col-span-2 lg:col-span-1">
        {CRITERIOS.map((c) => {
          const v = stats.criterios[c.id]
          return (
            <div key={c.id}>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-slate-700">{c.nombre}</span>
                <span className="font-semibold text-slate-900">{stats.total ? v.toFixed(1) : '—'}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className={`h-full rounded-full ${v >= 4 ? 'bg-emerald-500' : v >= 3 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${(v / 5) * 100}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

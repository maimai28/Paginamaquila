import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import Icon from '../components/Icon.jsx'
import Stars from '../components/Stars.jsx'
import { buscarProductos, categorias, getCategoria, getProveedor, getEstadisticasProveedor, productos } from '../lib/data.js'
import { PLAZOS } from '../lib/format.js'

const ORDENES = [
  { id: 'relevancia', nombre: 'Más relevantes' },
  { id: 'precio-asc', nombre: 'Precio: menor a mayor' },
  { id: 'precio-desc', nombre: 'Precio: mayor a menor' },
  { id: 'calificacion', nombre: 'Mejor calificación del proveedor' },
  { id: 'entrega', nombre: 'Entrega más rápida' },
]

const lista = (v) => (v ? v.split(',').filter(Boolean) : [])
const rating = (p) => getEstadisticasProveedor(p.proveedorId).promedio

function FiltroGrupo({ titulo, children }) {
  return (
    <fieldset className="border-b border-slate-200 py-4 first:pt-0 last:border-0">
      <legend className="mb-2.5 text-sm font-semibold text-slate-900">{titulo}</legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  )
}

function Check({ checked, onChange, children, type = 'checkbox', name }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-700 hover:text-slate-900">
      <input type={type} name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-brand-700" />
      {children}
    </label>
  )
}

export default function Search() {
  const [params, setParams] = useSearchParams()
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false)

  const q = params.get('q') ?? ''
  const cats = lista(params.get('cat'))
  const plazos = lista(params.get('plazo'))
  const pmin = params.get('pmin') ?? ''
  const pmax = params.get('pmax') ?? ''
  const cal = Number(params.get('cal') ?? 0)
  const soloVerificados = params.get('verificados') === '1'
  const orden = params.get('orden') ?? 'relevancia'

  const actualizar = (cambios) => {
    const p = new URLSearchParams(params)
    for (const [k, v] of Object.entries(cambios)) {
      if (v === '' || v == null || v === false || (Array.isArray(v) && !v.length)) p.delete(k)
      else p.set(k, Array.isArray(v) ? v.join(',') : v === true ? '1' : String(v))
    }
    setParams(p, { replace: true })
  }
  const alternar = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  const resultados = useMemo(() => {
    const min = pmin === '' ? null : Number(pmin)
    const max = pmax === '' ? null : Number(pmax)
    const r = buscarProductos(q).filter((p) => {
      const prov = getProveedor(p.proveedorId)
      if (cats.length && !cats.includes(p.categoriaId)) return false
      if (plazos.length && !plazos.some((x) => p.plazosPago.includes(x))) return false
      if (min != null && p.precioUnitario < min) return false
      if (max != null && p.precioUnitario > max) return false
      if (cal && rating(p) < cal) return false
      if (soloVerificados && !prov.verificado) return false
      return true
    })
    const orden_ = {
      relevancia: (a, b) => b.destacado - a.destacado || rating(b) - rating(a),
      'precio-asc': (a, b) => a.precioUnitario - b.precioUnitario,
      'precio-desc': (a, b) => b.precioUnitario - a.precioUnitario,
      calificacion: (a, b) => rating(b) - rating(a),
      entrega: (a, b) => a.tiempoEntregaDias.min - b.tiempoEntregaDias.min || a.tiempoEntregaDias.max - b.tiempoEntregaDias.max,
    }[orden] ?? (() => 0)
    return [...r].sort(orden_)
  }, [params])

  const cuenta = (catId) => buscarProductos(q).filter((p) => p.categoriaId === catId).length
  const hayFiltros = cats.length || plazos.length || pmin || pmax || cal || soloVerificados
  const titulo = q ? `Resultados para “${q}”` : cats.length === 1 ? getCategoria(cats[0])?.nombre : 'Todos los productos'

  const filtros = (
    <div>
      <FiltroGrupo titulo="Categoría">
        {categorias.map((c) => (
          <Check key={c.id} checked={cats.includes(c.id)} onChange={() => actualizar({ cat: alternar(cats, c.id) })}>
            <span className="flex-1">{c.nombre}</span><span className="text-xs text-slate-400">{cuenta(c.id)}</span>
          </Check>
        ))}
      </FiltroGrupo>

      <FiltroGrupo titulo="Precio por unidad (MXN)">
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="pmin">Precio mínimo</label>
          <input id="pmin" type="number" min="0" inputMode="decimal" placeholder="Mín." value={pmin} onChange={(e) => actualizar({ pmin: e.target.value })} className="input py-2" />
          <span className="text-slate-400">–</span>
          <label className="sr-only" htmlFor="pmax">Precio máximo</label>
          <input id="pmax" type="number" min="0" inputMode="decimal" placeholder="Máx." value={pmax} onChange={(e) => actualizar({ pmax: e.target.value })} className="input py-2" />
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[[0, 50], [50, 150], [150, 500], [500, '']].map(([a, b]) => (
            <button key={`${a}-${b}`} type="button" onClick={() => actualizar({ pmin: a || '', pmax: b })} className="chip bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700">
              {b === '' ? `Más de $${a}` : a === 0 ? `Hasta $${b}` : `$${a} – $${b}`}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500">El precio se compara por la unidad de venta de cada producto (kg, litro, pieza, rollo…).</p>
      </FiltroGrupo>

      <FiltroGrupo titulo="Plazo de pago">
        {PLAZOS.map((p) => (
          <Check key={p.id} checked={plazos.includes(p.id)} onChange={() => actualizar({ plazo: alternar(plazos, p.id) })}>{p.nombre}</Check>
        ))}
      </FiltroGrupo>

      <FiltroGrupo titulo="Calificación del proveedor">
        {[4.5, 4, 3].map((n) => (
          <Check key={n} type="radio" name="cal" checked={cal === n} onChange={() => actualizar({ cal: n })}>
            <Stars value={n} size="h-3.5 w-3.5" /> <span>{n} o más</span>
          </Check>
        ))}
        <Check type="radio" name="cal" checked={!cal} onChange={() => actualizar({ cal: '' })}>Cualquier calificación</Check>
      </FiltroGrupo>

      <FiltroGrupo titulo="Proveedor">
        <label className="flex cursor-pointer items-center justify-between gap-3 text-sm text-slate-700">
          <span className="flex items-center gap-1.5"><Icon name="shield" className="h-4 w-4 text-emerald-600" />Solo proveedores verificados</span>
          <input type="checkbox" role="switch" checked={soloVerificados} onChange={(e) => actualizar({ verificados: e.target.checked })} className="peer sr-only" />
          <span className="relative h-6 w-11 shrink-0 rounded-full bg-slate-300 transition peer-checked:bg-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-300 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" aria-hidden="true" />
        </label>
      </FiltroGrupo>

      {hayFiltros ? (
        <button type="button" onClick={() => setParams(q ? { q } : {}, { replace: true })} className="btn-secondary mt-2 w-full">Limpiar filtros</button>
      ) : null}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: titulo }]} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{titulo}</h1>
          <p className="mt-1 text-sm text-slate-600">{resultados.length} {resultados.length === 1 ? 'producto' : 'productos'} de {productos.length}</p>
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <button type="button" onClick={() => setFiltrosAbiertos((v) => !v)} className="btn-secondary lg:hidden" aria-expanded={filtrosAbiertos} aria-controls="panel-filtros">
            <Icon name="filter" className="h-4 w-4" /> Filtros{hayFiltros ? ' •' : ''}
          </button>
          <label className="sr-only" htmlFor="orden">Ordenar por</label>
          <select id="orden" value={orden} onChange={(e) => actualizar({ orden: e.target.value === 'relevancia' ? '' : e.target.value })} className="input flex-1 sm:w-80">
            {ORDENES.map((o) => <option key={o.id} value={o.id}>Ordenar: {o.nombre}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside id="panel-filtros" className={`${filtrosAbiertos ? 'block' : 'hidden'} card h-fit p-5 lg:sticky lg:top-44 lg:block`}>
          {filtros}
        </aside>
        <section aria-label="Resultados">
          {resultados.length ? (
            <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {resultados.map((p) => <ProductCard key={p.id} producto={p} />)}
            </div>
          ) : (
            <div className="card flex flex-col items-center p-10 text-center">
              <Icon name="search" className="h-10 w-10 text-slate-300" />
              <h2 className="mt-3 font-semibold text-slate-900">No encontramos productos con estos criterios</h2>
              <p className="mt-1 max-w-md text-sm text-slate-600">Prueba con otros términos o quita algunos filtros. Si no encuentras el material, envía una solicitud de cotización abierta y la compartiremos con proveedores de la categoría.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <button type="button" onClick={() => setParams({}, { replace: true })} className="btn-secondary">Ver todo el catálogo</button>
                <Link to="/cotizacion" className="btn-primary">Solicitar cotización abierta</Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

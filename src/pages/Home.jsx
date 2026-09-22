import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import CategoryIcon, { categoriaEstilo } from '../components/CategoryIcon.jsx'
import Icon from '../components/Icon.jsx'
import { categorias, productos, proveedores, resenas, productosDestacados } from '../lib/data.js'
import { config } from '../config.js'

const pasos = [
  { icon: 'search', titulo: 'Buscar', texto: 'Encuentra materia prima por categoría, especificación o proveedor. Filtra por precio, plazo de pago y calificación.' },
  { icon: 'compare', titulo: 'Comparar', texto: 'Revisa precios por volumen, pedidos mínimos, tiempos de entrega y reseñas honestas de otras maquiladoras.' },
  { icon: 'message', titulo: 'Solicitar cotización', texto: 'Envía tu solicitud desde la plataforma. El proveedor responde por el mismo canal y todo queda documentado.' },
]

export default function Home() {
  const verificados = proveedores.filter((p) => p.verificado).length
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 text-white">
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
          <defs><pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0v40" fill="none" stroke="#fff" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20">
          <p className="chip bg-white/10 text-cobre-200 ring-1 ring-white/20">Hecho para la industria de {config.ciudadBase}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
            La materia prima que tu línea necesita, de proveedores locales evaluados por otras maquiladoras.
          </h1>
          <p className="mt-4 max-w-2xl text-brand-100 sm:text-lg">
            Compara precios, plazos de pago y reseñas reales. Solicita cotizaciones sin intermediarios informales y con todo documentado en un solo lugar.
          </p>
          <div className="mt-8 max-w-3xl"><SearchBar grande /></div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-brand-200">
            <span>Búsquedas frecuentes:</span>
            {['polipropileno', 'alambre magneto', 'caja corrugada', 'alcohol isopropílico', 'stretch'].map((t) => (
              <Link key={t} to={`/buscar?q=${encodeURIComponent(t)}`} className="rounded-full bg-white/10 px-2.5 py-0.5 hover:bg-white/20 hover:text-white">{t}</Link>
            ))}
          </div>
          <dl className="mt-10 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div><dt className="text-xs text-brand-200 sm:text-sm">Proveedores</dt><dd className="text-2xl font-bold sm:text-3xl">{proveedores.length}</dd></div>
            <div><dt className="text-xs text-brand-200 sm:text-sm">Verificados</dt><dd className="text-2xl font-bold sm:text-3xl">{verificados}</dd></div>
            <div><dt className="text-xs text-brand-200 sm:text-sm">Reseñas publicadas</dt><dd className="text-2xl font-bold sm:text-3xl">{resenas.length}</dd></div>
          </dl>
        </div>
      </section>

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Categorías destacadas</h2>
          <Link to="/buscar" className="text-sm font-semibold text-brand-700 hover:underline">Ver todo el catálogo</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((c) => {
            const n = productos.filter((p) => p.categoriaId === c.id).length
            const e = categoriaEstilo[c.id]
            return (
              <Link key={c.id} to={`/buscar?cat=${c.id}`} className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: `linear-gradient(135deg, ${e.from}, ${e.to})` }}>
                  <CategoryIcon id={c.id} className="h-11 w-11" />
                </span>
                <h3 className="mt-4 font-semibold text-slate-900 group-hover:text-brand-700">{c.nombre}</h3>
                <p className="mt-1 flex-1 text-sm text-slate-600">{c.descripcion}</p>
                <p className="mt-4 text-sm font-medium text-brand-700">{n} productos <span aria-hidden="true">→</span></p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Destacados */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Productos destacados</h2>
              <p className="mt-1 text-sm text-slate-600">Selección de materiales con alta demanda entre maquiladoras de la ciudad.</p>
            </div>
            <Link to="/buscar" className="hidden text-sm font-semibold text-brand-700 hover:underline sm:block">Ver más</Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {productosDestacados().slice(0, 10).map((p) => <ProductCard key={p.id} producto={p} />)}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="mx-auto max-w-7xl scroll-mt-44 px-4 py-14">
        <h2 className="text-center text-2xl font-bold text-slate-900">Cómo funciona</h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">Tres pasos, sin llamadas en frío ni contactos por fuera: la plataforma documenta cada solicitud para proteger a ambas partes.</p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="card relative p-6">
              <span className="absolute -top-3 left-6 chip bg-cobre-500 font-bold text-white">Paso {i + 1}</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon name={p.icon} className="h-6 w-6" /></span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{p.titulo}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.texto}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid gap-4 rounded-2xl bg-brand-900 p-6 text-white sm:grid-cols-3 sm:p-8">
          <div className="flex gap-3"><Icon name="shield" className="h-6 w-6 shrink-0 text-cobre-300" /><p className="text-sm"><strong className="block">Proveedores verificados</strong><span className="text-brand-200">Revisamos RFC, permisos vigentes y referencias comerciales.</span></p></div>
          <div className="flex gap-3"><Icon name="message" className="h-6 w-6 shrink-0 text-cobre-300" /><p className="text-sm"><strong className="block">Reseñas honestas</strong><span className="text-brand-200">Solo de empresas con pedidos completados. No se borran las negativas.</span></p></div>
          <div className="flex gap-3"><Icon name="lock" className="h-6 w-6 shrink-0 text-cobre-300" /><p className="text-sm"><strong className="block">Comunicación protegida</strong><span className="text-brand-200">Cotizaciones y mensajes dentro de la plataforma, con historial.</span></p></div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/cotizacion" className="btn-primary px-6 py-3 text-base">Solicitar una cotización</Link>
        </div>
      </section>
    </>
  )
}

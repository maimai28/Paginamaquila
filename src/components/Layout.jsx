import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import SearchBar from './SearchBar.jsx'
import Icon from './Icon.jsx'
import { categorias } from '../lib/data.js'
import { config } from '../config.js'

function ScrollManager() {
  const { pathname, search, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, search, hash])
  return null
}

function Header() {
  return (
    <header className="z-30 shadow-sm md:sticky md:top-0">
      <div className="bg-cobre-100 px-4 py-1.5 text-center text-xs font-medium text-cobre-700">
        Prototipo de demostración · Todos los proveedores, productos y reseñas son ficticios
      </div>
      <div className="bg-brand-900">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 md:gap-x-6">
          <Logo />
          <div className="order-last w-full md:order-none md:w-auto md:flex-1">
            <SearchBar />
          </div>
          <nav className="flex shrink-0 items-center gap-1 text-sm">
            <Link to="/#como-funciona" className="hidden rounded-lg px-3 py-2 text-brand-100 hover:bg-white/10 hover:text-white lg:block">Cómo funciona</Link>
            <Link to="/cotizacion" className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 font-semibold text-white ring-1 ring-white/20 hover:bg-white/20">
              <Icon name="message" className="h-4 w-4" />
              <span className="hidden sm:inline">Solicitar cotización</span>
              <span className="sm:hidden">Cotizar</span>
            </Link>
          </nav>
        </div>
      </div>
      <nav aria-label="Categorías" className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 text-sm whitespace-nowrap">
          <NavLink to="/buscar" end className="px-3 py-2.5 font-semibold text-slate-800 hover:text-brand-700">Todos los productos</NavLink>
          {categorias.map((c) => (
            <Link key={c.id} to={`/buscar?cat=${c.id}`} className="px-3 py-2.5 text-slate-600 hover:text-brand-700">{c.nombre}</Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 bg-brand-950 text-brand-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-3 text-sm text-brand-200">{config.eslogan}.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Categorías</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {categorias.map((c) => <li key={c.id}><Link to={`/buscar?cat=${c.id}`} className="hover:text-white hover:underline">{c.nombre}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Plataforma</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/#como-funciona" className="hover:text-white hover:underline">Cómo funciona</Link></li>
            <li><Link to="/cotizacion" className="hover:text-white hover:underline">Solicitar cotización</Link></li>
            <li><Link to="/buscar?verificados=1" className="hover:text-white hover:underline">Proveedores verificados</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/terminos" className="font-semibold text-cobre-200 hover:text-white hover:underline">Términos y condiciones</Link></li>
            <li><Link to="/terminos#privacidad" className="hover:text-white hover:underline">Aviso de privacidad</Link></li>
            <li><Link to="/terminos#verificacion" className="hover:text-white hover:underline">Cómo verificamos proveedores</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {config.nombrePlataforma}. Prototipo de demostración: los datos mostrados son ficticios.</p>
          <Link to="/terminos" className="font-semibold text-cobre-200 underline hover:text-white">Términos y condiciones</Link>
        </div>
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

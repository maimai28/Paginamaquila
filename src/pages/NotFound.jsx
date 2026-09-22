import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl font-bold text-brand-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">No encontramos esta página</h1>
      <p className="mt-2 text-slate-600">Es posible que el producto o proveedor ya no esté disponible.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/" className="btn-secondary">Ir al inicio</Link>
        <Link to="/buscar" className="btn-primary">Ver catálogo</Link>
      </div>
    </div>
  )
}

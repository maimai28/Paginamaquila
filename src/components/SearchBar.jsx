import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Icon from './Icon.jsx'
import { categorias } from '../lib/data.js'

export default function SearchBar({ grande = false }) {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [cat, setCat] = useState(params.get('cat') ?? '')

  useEffect(() => {
    setQ(params.get('q') ?? '')
    setCat(params.get('cat') ?? '')
  }, [params])

  const enviar = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (q.trim()) p.set('q', q.trim())
    if (cat) p.set('cat', cat)
    navigate(`/buscar?${p}`)
  }

  return (
    <form onSubmit={enviar} role="search" className={`flex w-full overflow-hidden rounded-lg bg-white ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-cobre-300 ${grande ? 'h-14 shadow-lg' : 'h-11'}`}>
      <label className="sr-only" htmlFor="buscar-cat">Categoría</label>
      <select id="buscar-cat" value={cat} onChange={(e) => setCat(e.target.value)} className="hidden max-w-48 border-r border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 focus:outline-none sm:block">
        <option value="">Todas</option>
        {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
      </select>
      <label className="sr-only" htmlFor="buscar-q">Buscar materiales</label>
      <input
        id="buscar-q"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Busca resina, alambre, cajas, solventes…"
        className={`min-w-0 flex-1 px-4 text-slate-800 placeholder:text-slate-400 focus:outline-none ${grande ? 'text-base' : 'text-sm'}`}
      />
      <button type="submit" className="flex items-center gap-2 bg-cobre-500 px-4 font-semibold text-white hover:bg-cobre-600 sm:px-5" aria-label="Buscar">
        <Icon name="search" className="h-5 w-5" strokeWidth={2.2} />
        <span className="hidden text-sm md:inline">Buscar</span>
      </button>
    </form>
  )
}

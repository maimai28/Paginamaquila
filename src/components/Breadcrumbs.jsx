import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-4 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <Icon name="chevron" className="h-3.5 w-3.5 text-slate-400" />}
            {it.to ? <Link to={it.to} className="hover:text-brand-700 hover:underline">{it.label}</Link> : <span className="line-clamp-1 text-slate-700">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

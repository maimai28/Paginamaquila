import { Link } from 'react-router-dom'
import { config } from '../config.js'

export default function Logo({ claro = true }) {
  return (
    <Link to="/" className="flex min-w-0 flex-1 items-center gap-2.5 md:flex-none" aria-label={`${config.nombrePlataforma}, inicio`}>
      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={claro ? '#ffffff' : '#124452'} fillOpacity={claro ? 0.12 : 1} />
        <path d="M8 22V10l8 6 8-6v12" fill="none" stroke="#e7a37f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`min-w-0 leading-tight font-bold ${claro ? 'text-white' : 'text-brand-900'}`}>
        <span className="block text-sm sm:text-[15px]">{config.nombrePlataforma}</span>
        <span className={`block text-[11px] font-medium ${claro ? 'text-brand-200' : 'text-slate-500'}`}>Marketplace industrial B2B</span>
      </span>
    </Link>
  )
}

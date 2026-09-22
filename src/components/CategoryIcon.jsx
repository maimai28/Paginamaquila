// Ilustraciones simples por categoría (usadas en tarjetas y placeholders).
export const categoriaEstilo = {
  'resinas-plasticos': { from: '#d5ecef', to: '#74bcc6', ink: '#124452', soft: 'bg-brand-50 text-brand-700' },
  'metales-alambre': { from: '#e2e8f0', to: '#94a3b8', ink: '#1e293b', soft: 'bg-slate-100 text-slate-700' },
  'empaque-carton': { from: '#f5e6d3', to: '#d6ae84', ink: '#5c3a1c', soft: 'bg-amber-50 text-amber-800' },
  'quimicos-industriales': { from: '#e4e3f7', to: '#a5a1dc', ink: '#2e2a6b', soft: 'bg-indigo-50 text-indigo-700' },
}

export function CategoryGlyph({ id, color = 'currentColor' }) {
  const s = { fill: 'none', stroke: color, strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (id) {
    case 'resinas-plasticos':
      return (
        <g {...s}>
          <ellipse cx="24" cy="30" rx="7" ry="5" /><ellipse cx="40" cy="26" rx="7" ry="5" /><ellipse cx="32" cy="40" rx="7" ry="5" />
          <ellipse cx="46" cy="40" rx="6" ry="4.5" /><ellipse cx="19" cy="43" rx="5.5" ry="4" />
        </g>
      )
    case 'metales-alambre':
      return (
        <g {...s}>
          <ellipse cx="26" cy="32" rx="9" ry="15" /><ellipse cx="26" cy="32" rx="4" ry="7" />
          <path d="M26 17h16c5 0 9 6.7 9 15s-4 15-9 15H26" /><path d="M42 17c-5 0-9 6.7-9 15s4 15 9 15" />
        </g>
      )
    case 'empaque-carton':
      return (
        <g {...s}>
          <path d="m32 14 18 9v20l-18 9-18-9V23l18-9Z" /><path d="m14 23 18 9 18-9M32 32v20" /><path d="m23 18.5 18 9v6" />
        </g>
      )
    case 'quimicos-industriales':
      return (
        <g {...s}>
          <path d="M27 13h10M29 13v12L17 47a3 3 0 0 0 2.6 4.5h24.8A3 3 0 0 0 47 47L35 25V13" /><path d="M22 39h20" />
          <circle cx="28" cy="45" r="1.5" /><circle cx="36" cy="43" r="1" />
        </g>
      )
    default:
      return null
  }
}

export default function CategoryIcon({ id, className = 'h-10 w-10', color }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <CategoryGlyph id={id} color={color ?? categoriaEstilo[id]?.ink} />
    </svg>
  )
}

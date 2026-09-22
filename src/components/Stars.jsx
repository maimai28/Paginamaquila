// Estrellas de calificación con relleno parcial.
export default function Stars({ value, size = 'h-4 w-4', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${value.toFixed(1)} de 5 estrellas`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i))
        return (
          <span key={i} className={`relative inline-block ${size}`}>
            <svg viewBox="0 0 20 20" className={`absolute inset-0 ${size} text-slate-300`} fill="currentColor"><path d="m10 1.8 2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8L6 11.8l-4.3-4 5.8-.7L10 1.8Z" /></svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <svg viewBox="0 0 20 20" className={`${size} text-amber-500`} fill="currentColor"><path d="m10 1.8 2.5 5.3 5.8.7-4.3 4 1.1 5.7L10 14.7l-5.1 2.8L6 11.8l-4.3-4 5.8-.7L10 1.8Z" /></svg>
            </span>
          </span>
        )
      })}
    </span>
  )
}

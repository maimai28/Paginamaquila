import { useId } from 'react'
import { CategoryGlyph, categoriaEstilo } from './CategoryIcon.jsx'

// Imagen de marcador de posición generada en SVG (no usa archivos externos).
// `variante` cambia el encuadre para simular varias fotos en la galería.
export default function ProductImage({ producto, variante = 0, className = '', etiqueta = true }) {
  const uid = useId().replace(/:/g, '')
  const e = categoriaEstilo[producto.categoriaId] ?? categoriaEstilo['resinas-plasticos']
  const escala = [1, 1.35, 0.8, 1.15][variante % 4]
  const giro = [0, -12, 8, 18][variante % 4]
  const angulo = [135, 45, 180, 90][variante % 4]
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label={`Imagen ilustrativa: ${producto.nombre}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`g${uid}`} gradientTransform={`rotate(${angulo - 90} .5 .5)`}>
          <stop offset="0" stopColor={e.from} />
          <stop offset="1" stopColor={e.to} />
        </linearGradient>
        <pattern id={`p${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" stroke={e.ink} strokeOpacity=".07" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#g${uid})`} />
      <rect width="400" height="300" fill={`url(#p${uid})`} />
      <circle cx="200" cy="150" r={92 * escala} fill="#fff" fillOpacity=".35" />
      <g transform={`translate(200 150) rotate(${giro}) scale(${2.6 * escala}) translate(-32 -32)`}>
        <CategoryGlyph id={producto.categoriaId} color={e.ink} />
      </g>
      {etiqueta && (
        <text x="16" y="286" fontSize="12" fill={e.ink} fillOpacity=".6" fontFamily="system-ui, sans-serif">Imagen ilustrativa</text>
      )}
    </svg>
  )
}

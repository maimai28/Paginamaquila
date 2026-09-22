const mxn = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 })
const num = new Intl.NumberFormat('es-MX')
const fecha = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })

/** $1,234.50 MXN */
export const formatMXN = (n) => `${mxn.format(n)} MXN`
/** $1,234.50 (sin sufijo, para tablas) */
export const formatPrecio = (n) => mxn.format(n)
export const formatNumero = (n) => num.format(n)
export const formatFecha = (iso) => fecha.format(new Date(`${iso}T12:00:00`))

const plurales = { kg: 'kg', litro: 'litros', pieza: 'piezas', rollo: 'rollos', frasco: 'frascos' }
export const unidadPlural = (u) => plurales[u] ?? `${u}s`
/** "625 kg", "1 rollo", "24 rollos" */
export const cantidadConUnidad = (n, u) => `${formatNumero(n)} ${n === 1 ? u : unidadPlural(u)}`

export const PLAZOS = [
  { id: 'contado', nombre: 'Contado' },
  { id: '30', nombre: '30 días' },
  { id: '60', nombre: '60 días' },
  { id: '90', nombre: '90 días' },
]
export const nombrePlazo = (id) => PLAZOS.find((p) => p.id === id)?.nombre ?? id

export const formatEntrega = ({ min, max }) => (min === max ? `${min} días hábiles` : `${min} a ${max} días hábiles`)

export const aniosEnPlataforma = (desde) => {
  const n = new Date().getFullYear() - desde
  if (n < 1) return 'Menos de 1 año'
  return n === 1 ? '1 año' : `${n} años`
}

/** Minúsculas y sin acentos, para búsquedas. */
export const normalizar = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

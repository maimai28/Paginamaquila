// Capa de acceso a los datos de ejemplo (src/data/*.json).
// Las calificaciones promedio se calculan aquí a partir de las reseñas,
// así que al editar resenas.json todo se actualiza solo.
import categorias from '../data/categorias.json'
import proveedores from '../data/proveedores.json'
import productos from '../data/productos.json'
import resenas from '../data/resenas.json'
import { normalizar } from './format.js'

export { categorias, proveedores, productos, resenas }

export const CRITERIOS = [
  { id: 'calidad', nombre: 'Calidad' },
  { id: 'puntualidad', nombre: 'Puntualidad' },
  { id: 'trato', nombre: 'Trato' },
  { id: 'cumplimiento', nombre: 'Cumplimiento' },
]

const byId = (arr) => Object.fromEntries(arr.map((x) => [x.id, x]))
const categoriasPorId = byId(categorias)
const proveedoresPorId = byId(proveedores)
const productosPorId = byId(productos)

export const getCategoria = (id) => categoriasPorId[id]
export const getProveedor = (id) => proveedoresPorId[id]
export const getProducto = (id) => productosPorId[id]

export const getProductosDeProveedor = (id) => productos.filter((p) => p.proveedorId === id)
export const getResenasDeProveedor = (id) => resenas.filter((r) => r.proveedorId === id)

export function calcularEstadisticas(lista) {
  const total = lista.length
  const promedio = (fn) => (total ? lista.reduce((a, r) => a + fn(r), 0) / total : 0)
  const distribucion = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  lista.forEach((r) => { distribucion[r.calificacion]++ })
  return {
    total,
    promedio: promedio((r) => r.calificacion),
    criterios: Object.fromEntries(CRITERIOS.map((c) => [c.id, promedio((r) => r.calificaciones[c.id])])),
    distribucion,
  }
}

const statsCache = {}
export function getEstadisticasProveedor(id) {
  statsCache[id] ??= calcularEstadisticas(getResenasDeProveedor(id))
  return statsCache[id]
}

/** Precio más bajo disponible (considerando precios por volumen). */
export const precioDesde = (p) => Math.min(p.precioUnitario, ...p.preciosPorVolumen.map((t) => t.precio))

/** Precio por unidad aplicable a una cantidad según la tabla de volumen. */
export function precioParaCantidad(p, cantidad) {
  let precio = p.precioUnitario
  for (const t of p.preciosPorVolumen) if (cantidad >= t.minimo) precio = Math.min(precio, t.precio)
  return precio
}

function textoBuscable(p) {
  const prov = getProveedor(p.proveedorId)
  const cat = getCategoria(p.categoriaId)
  return normalizar([p.nombre, p.descripcion, prov?.nombre, cat?.nombre, ...Object.values(p.especificaciones)].join(' '))
}
const indice = Object.fromEntries(productos.map((p) => [p.id, textoBuscable(p)]))

export function buscarProductos(q) {
  const terminos = normalizar(q ?? '').split(/\s+/).filter(Boolean)
  if (!terminos.length) return productos
  return productos.filter((p) => terminos.every((t) => indice[p.id].includes(t)))
}

export const productosDestacados = () => productos.filter((p) => p.destacado)

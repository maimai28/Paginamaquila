import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ProductImage from '../components/ProductImage.jsx'
import VerifiedBadge from '../components/VerifiedBadge.jsx'
import Icon from '../components/Icon.jsx'
import { categorias, getCategoria, getProducto, getProductosDeProveedor, getProveedor, precioParaCantidad, productos } from '../lib/data.js'
import { PLAZOS, cantidadConUnidad, formatEntrega, formatFecha, formatMXN, nombrePlazo, unidadPlural } from '../lib/format.js'
import { config } from '../config.js'

const UNIDADES = ['kg', 'litro', 'pieza', 'rollo', 'frasco']
const OTRO = 'otro'

// Detecta datos de contacto para mantener la comunicación dentro de la plataforma.
const PATRONES_CONTACTO = [
  /[\w.+-]+@[\w-]+\.[\w.]+/, // correo
  /(?:\+?\d[\s().-]*){10,}/, // teléfono (10 dígitos o más)
  /https?:\/\/|www\.|\.com\b|\.mx\b/i, // sitios web
  /whats\s?app|wa\.me|telegram/i,
]
const tieneContacto = (t) => PATRONES_CONTACTO.some((re) => re.test(t))

const fechaISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export default function Quote() {
  const [params] = useSearchParams()
  const productoInicial = getProducto(params.get('producto') ?? '')
  const proveedorFijo = getProveedor(params.get('proveedor') ?? '') ?? (productoInicial && getProveedor(productoInicial.proveedorId))

  const opciones = proveedorFijo ? getProductosDeProveedor(proveedorFijo.id) : productos
  const manana = new Date(); manana.setDate(manana.getDate() + 1)

  const [form, setForm] = useState({
    empresa: '',
    material: productoInicial?.id ?? '',
    materialOtro: '',
    categoriaOtro: '',
    unidadOtro: 'kg',
    cantidad: productoInicial ? String(productoInicial.pedidoMinimo) : '',
    fecha: '',
    plazo: '',
    comentarios: '',
    acepto: false,
  })
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(null)

  const producto = form.material && form.material !== OTRO ? getProducto(form.material) : null
  const proveedor = producto ? getProveedor(producto.proveedorId) : proveedorFijo
  const unidad = producto?.unidad ?? form.unidadOtro
  const plazosDisponibles = producto ? PLAZOS.filter((p) => producto.plazosPago.includes(p.id)) : PLAZOS
  const cantidadNum = Number(form.cantidad)

  const set = (campo) => (e) => {
    const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => {
      const nuevo = { ...f, [campo]: valor }
      if (campo === 'material') {
        const p = getProducto(valor)
        if (p) nuevo.cantidad = String(p.pedidoMinimo)
        if (p && f.plazo && !p.plazosPago.includes(f.plazo)) nuevo.plazo = ''
      }
      return nuevo
    })
    setErrores((er) => ({ ...er, [campo]: undefined }))
  }

  const alertaContacto = useMemo(
    () => tieneContacto(`${form.empresa} ${form.materialOtro} ${form.comentarios}`),
    [form.empresa, form.materialOtro, form.comentarios],
  )

  const validar = () => {
    const e = {}
    if (!form.empresa.trim()) e.empresa = 'Indica el nombre de tu empresa.'
    if (!form.material) e.material = 'Selecciona un material.'
    if (form.material === OTRO && !form.materialOtro.trim()) e.materialOtro = 'Describe el material que necesitas.'
    if (form.material === OTRO && !proveedorFijo && !form.categoriaOtro) e.categoriaOtro = 'Elige la categoría para enviar tu solicitud a los proveedores correctos.'
    if (!form.cantidad || !(cantidadNum > 0)) e.cantidad = 'Indica una cantidad mayor a cero.'
    else if (producto && cantidadNum < producto.pedidoMinimo) e.cantidad = `El pedido mínimo es de ${cantidadConUnidad(producto.pedidoMinimo, producto.unidad)}.`
    if (!form.fecha) e.fecha = 'Indica la fecha en que necesitas el material.'
    else if (form.fecha < fechaISO(manana)) e.fecha = 'La fecha debe ser posterior a hoy.'
    if (!form.plazo) e.plazo = 'Selecciona el plazo de pago deseado.'
    if (alertaContacto) e.comentarios = 'Elimina teléfonos, correos o enlaces: la comunicación se gestiona dentro de la plataforma.'
    if (!form.acepto) e.acepto = 'Debes aceptar los Términos y condiciones.'
    return e
  }

  const enviar = (ev) => {
    ev.preventDefault()
    const e = validar()
    setErrores(e)
    if (Object.keys(e).length) {
      document.getElementById(`campo-${Object.keys(e)[0]}`)?.focus()
      return
    }
    setEnviado({
      folio: `COT-${new Date().getFullYear()}-${String(Math.floor(10000 + Math.random() * 90000))}`,
      material: producto?.nombre ?? form.materialOtro,
      destino: proveedor?.nombre ?? `Proveedores de ${getCategoria(form.categoriaOtro)?.nombre.toLowerCase()}`,
      cantidad: cantidadConUnidad(cantidadNum, unidad),
      fecha: formatFecha(form.fecha),
      plazo: nombrePlazo(form.plazo),
    })
    window.scrollTo(0, 0)
  }

  if (enviado) return <Confirmacion datos={enviado} producto={producto} />

  const MensajeError = ({ campo }) => errores[campo] ? <p className="mt-1 text-xs font-medium text-rose-600" id={`error-${campo}`}>{errores[campo]}</p> : null
  const aria = (campo) => ({ id: `campo-${campo}`, 'aria-invalid': !!errores[campo], 'aria-describedby': errores[campo] ? `error-${campo}` : undefined })
  const conError = (campo) => (errores[campo] ? 'border-rose-400 ring-1 ring-rose-200' : '')

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, ...(producto ? [{ label: producto.nombre, to: `/producto/${producto.id}` }] : []), { label: 'Solicitar cotización' }]} />
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Solicitar cotización</h1>
      <p className="mt-1 text-slate-600">
        {proveedor ? <>Tu solicitud se enviará a <strong>{proveedor.nombre}</strong> a través de la plataforma.</> : 'Describe lo que necesitas y lo enviaremos a los proveedores de la categoría.'}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
        <form onSubmit={enviar} noValidate className="card space-y-5 p-5 sm:p-7">
          <div>
            <label className="label" htmlFor="campo-empresa">Empresa solicitante</label>
            <input {...aria('empresa')} type="text" value={form.empresa} onChange={set('empresa')} placeholder="Ej. Manufacturas del Norte, planta 2" className={`input ${conError('empresa')}`} autoComplete="organization" />
            <MensajeError campo="empresa" />
          </div>

          <div>
            <label className="label" htmlFor="campo-material">Material</label>
            <select {...aria('material')} value={form.material} onChange={set('material')} className={`input ${conError('material')}`}>
              <option value="">Selecciona un material…</option>
              {categorias.map((c) => {
                const items = opciones.filter((p) => p.categoriaId === c.id)
                if (!items.length) return null
                return (
                  <optgroup key={c.id} label={c.nombre}>
                    {items.map((p) => <option key={p.id} value={p.id}>{p.nombre}{proveedorFijo ? '' : ` — ${getProveedor(p.proveedorId).nombre}`}</option>)}
                  </optgroup>
                )
              })}
              <option value={OTRO}>Otro material (describir)</option>
            </select>
            <MensajeError campo="material" />
          </div>

          {form.material === OTRO && (
            <div className="grid gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label" htmlFor="campo-materialOtro">Describe el material</label>
                <input {...aria('materialOtro')} type="text" value={form.materialOtro} onChange={set('materialOtro')} placeholder="Tipo, grado, medidas, norma…" className={`input ${conError('materialOtro')}`} />
                <MensajeError campo="materialOtro" />
              </div>
              {!proveedorFijo && (
                <div>
                  <label className="label" htmlFor="campo-categoriaOtro">Categoría</label>
                  <select {...aria('categoriaOtro')} value={form.categoriaOtro} onChange={set('categoriaOtro')} className={`input ${conError('categoriaOtro')}`}>
                    <option value="">Selecciona…</option>
                    {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                  <MensajeError campo="categoriaOtro" />
                </div>
              )}
              <div>
                <label className="label" htmlFor="campo-unidadOtro">Unidad</label>
                <select id="campo-unidadOtro" value={form.unidadOtro} onChange={set('unidadOtro')} className="input">
                  {UNIDADES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="campo-cantidad">Cantidad</label>
              <div className="relative">
                <input {...aria('cantidad')} type="number" min="0" inputMode="decimal" value={form.cantidad} onChange={set('cantidad')} className={`input pr-20 ${conError('cantidad')}`} />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-slate-500">{unidadPlural(unidad)}</span>
              </div>
              {producto && !errores.cantidad && <p className="mt-1 text-xs text-slate-500">Pedido mínimo: {cantidadConUnidad(producto.pedidoMinimo, producto.unidad)}</p>}
              <MensajeError campo="cantidad" />
            </div>
            <div>
              <label className="label" htmlFor="campo-fecha">Fecha requerida</label>
              <input {...aria('fecha')} type="date" min={fechaISO(manana)} value={form.fecha} onChange={set('fecha')} className={`input ${conError('fecha')}`} />
              {producto && !errores.fecha && <p className="mt-1 text-xs text-slate-500">Entrega habitual: {formatEntrega(producto.tiempoEntregaDias)}</p>}
              <MensajeError campo="fecha" />
            </div>
          </div>

          <fieldset>
            <legend className="label">Plazo de pago deseado</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" id="campo-plazo" tabIndex={-1}>
              {PLAZOS.map((p) => {
                const disponible = plazosDisponibles.some((x) => x.id === p.id)
                return (
                  <label key={p.id} className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-sm font-medium transition has-[:checked]:border-brand-600 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-800 ${disponible ? 'border-slate-300 text-slate-700 hover:border-brand-400' : 'cursor-not-allowed border-slate-200 text-slate-300 line-through'}`}>
                    <input type="radio" name="plazo" value={p.id} checked={form.plazo === p.id} onChange={set('plazo')} disabled={!disponible} className="sr-only" />
                    {p.nombre}
                  </label>
                )
              })}
            </div>
            {producto && plazosDisponibles.length < PLAZOS.length && <p className="mt-1 text-xs text-slate-500">Los plazos tachados no los ofrece este proveedor para este producto.</p>}
            <MensajeError campo="plazo" />
          </fieldset>

          <div>
            <label className="label" htmlFor="campo-comentarios">Comentarios <span className="font-normal text-slate-400">(opcional)</span></label>
            <textarea {...aria('comentarios')} rows={4} value={form.comentarios} onChange={set('comentarios')} placeholder="Especificaciones adicionales, certificados requeridos, entregas parciales, punto de entrega (parque industrial)…" className={`input ${conError('comentarios')}`} />
            {alertaContacto && !errores.comentarios && (
              <p className="mt-1 flex items-center gap-1 text-xs font-medium text-amber-700"><Icon name="alert" className="h-4 w-4" />Parece que incluiste datos de contacto. Por política de la plataforma, elimínalos antes de enviar.</p>
            )}
            <MensajeError campo="comentarios" />
          </div>

          <div>
            <label className="flex items-start gap-2.5 text-sm text-slate-700">
              <input {...aria('acepto')} type="checkbox" checked={form.acepto} onChange={set('acepto')} className="mt-0.5 h-4 w-4 accent-brand-700" />
              <span>Acepto los <Link to="/terminos" target="_blank" className="font-semibold text-brand-700 underline">Términos y condiciones</Link> y entiendo que la cotización y toda la comunicación con el proveedor se gestionan dentro de {config.nombrePlataforma}.</span>
            </label>
            <MensajeError campo="acepto" />
          </div>

          <button type="submit" className="btn-primary w-full py-3 text-base sm:w-auto sm:px-8">
            <Icon name="message" className="h-5 w-5" /> Enviar solicitud de cotización
          </button>
        </form>

        <aside className="space-y-4">
          {producto ? (
            <div className="card overflow-hidden">
              <ProductImage producto={producto} className="aspect-[16/9] w-full" etiqueta={false} />
              <div className="p-5">
                <p className="font-semibold text-slate-900">{producto.nombre}</p>
                <p className="mt-1 text-sm text-slate-600">{proveedor.nombre}</p>
                <div className="mt-2"><VerifiedBadge verificado={proveedor.verificado} compacto /></div>
                {cantidadNum >= producto.pedidoMinimo && (
                  <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-sm">
                    <div className="flex justify-between"><dt className="text-slate-500">Precio de referencia</dt><dd className="font-medium">{formatMXN(precioParaCantidad(producto, cantidadNum))} / {producto.unidad}</dd></div>
                    <div className="flex justify-between"><dt className="text-slate-500">Estimado</dt><dd className="font-bold text-slate-900">{formatMXN(precioParaCantidad(producto, cantidadNum) * cantidadNum)}</dd></div>
                    <p className="text-xs text-slate-500">Antes de IVA. Referencia calculada con la lista de precios publicada; el proveedor confirma el precio final en su cotización.</p>
                  </dl>
                )}
              </div>
            </div>
          ) : proveedor ? (
            <div className="card p-5">
              <p className="text-xs font-semibold text-slate-500 uppercase">Destinatario</p>
              <p className="mt-2 font-semibold text-slate-900">{proveedor.nombre}</p>
              <div className="mt-2"><VerifiedBadge verificado={proveedor.verificado} compacto /></div>
            </div>
          ) : null}
          <div className="card p-5">
            <h2 className="text-sm font-semibold text-slate-900">¿Qué pasa después?</h2>
            <ol className="mt-3 space-y-3 text-sm text-slate-600">
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">1</span>El proveedor recibe tu solicitud en su bandeja dentro de la plataforma.</li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">2</span>Te responde con precio, disponibilidad y condiciones por el mismo canal.</li>
              <li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-800">3</span>Aceptas o rechazas la cotización. Al completar el pedido podrás publicar una reseña.</li>
            </ol>
          </div>
          <div className="flex gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4 text-xs text-brand-900">
            <Icon name="lock" className="h-5 w-5 shrink-0 text-brand-600" />
            <p>No compartimos tus datos de contacto con el proveedor ni los suyos contigo. Toda la negociación queda registrada en la plataforma.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Confirmacion({ datos, producto }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="card p-6 text-center sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Icon name="check" className="h-8 w-8" strokeWidth={2.6} />
        </span>
        <h1 className="mt-5 text-2xl font-bold text-slate-900">Solicitud de cotización enviada</h1>
        <p className="mt-2 text-slate-600">Folio <strong className="font-mono text-slate-900">{datos.folio}</strong></p>
        <div className="mt-6 rounded-xl bg-brand-50 p-5 text-left text-sm text-brand-900">
          <p className="font-semibold">Tu cotización se gestiona dentro de la plataforma.</p>
          <p className="mt-1">
            {datos.destino} recibirá tu solicitud y responderá a través de tu bandeja de cotizaciones en {config.nombrePlataforma}.
            Ahí mismo podrás hacer preguntas, negociar condiciones y aceptar la propuesta. No es necesario ni está permitido intercambiar teléfonos o correos.
          </p>
        </div>
        <dl className="mt-6 divide-y divide-slate-100 text-left text-sm">
          {[['Material', datos.material], ['Destinatario', datos.destino], ['Cantidad', datos.cantidad], ['Fecha requerida', datos.fecha], ['Plazo de pago', datos.plazo]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5"><dt className="text-slate-500">{k}</dt><dd className="text-right font-medium text-slate-900">{v}</dd></div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {producto && <Link to={`/producto/${producto.id}`} className="btn-secondary">Volver al producto</Link>}
          <Link to="/buscar" className="btn-primary">Seguir explorando</Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">Prototipo de demostración: esta solicitud no se envió a ningún proveedor real.</p>
      </div>
    </div>
  )
}

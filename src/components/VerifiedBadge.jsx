import Icon from './Icon.jsx'

export default function VerifiedBadge({ verificado, compacto = false }) {
  if (verificado) {
    return (
      <span className={`chip gap-1 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 ${compacto ? 'px-2 py-0.5' : ''}`} title="La plataforma revisó RFC, permisos vigentes y referencias comerciales. Consulta los Términos y condiciones para conocer los alcances.">
        <Icon name="shield" className="h-3.5 w-3.5" strokeWidth={2.2} />
        {compacto ? 'Verificado' : 'Proveedor verificado'}
      </span>
    )
  }
  return (
    <span className={`chip gap-1 bg-slate-100 text-slate-500 ring-1 ring-slate-200 ${compacto ? 'px-2 py-0.5' : ''}`} title="Este proveedor aún no completa el proceso de verificación de la plataforma.">
      <Icon name="info" className="h-3.5 w-3.5" strokeWidth={2.2} />
      Sin verificar
    </span>
  )
}

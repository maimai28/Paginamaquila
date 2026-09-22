import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { config } from '../config.js'

// Aviso de la regla de contacto: toda la comunicación es dentro de la plataforma.
export default function ContactNotice({ className = '' }) {
  return (
    <div className={`flex gap-3 rounded-lg border border-brand-100 bg-brand-50/70 p-3 text-xs text-brand-900 ${className}`}>
      <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
      <p>
        Para proteger a compradores y proveedores, {config.nombrePlataforma} no muestra teléfonos, correos ni direcciones.
        Toda la comunicación se gestiona mediante <Link to="/cotizacion" className="font-semibold underline">solicitudes de cotización</Link> dentro de la plataforma.
      </p>
    </div>
  )
}

import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { config } from '../config.js'

const N = config.nombrePlataforma

// Texto de ejemplo. BORRADOR: debe revisarlo un abogado antes de usarse.
const secciones = [
  {
    id: 'objeto', titulo: 'Objeto y aceptación',
    contenido: (
      <>
        <p>Estos Términos y condiciones regulan el acceso y uso de {N} (la “Plataforma”), un servicio en línea que permite a empresas manufactureras (los “Compradores”) localizar, comparar y solicitar cotizaciones de materia prima a empresas distribuidoras y fabricantes (los “Proveedores”).</p>
        <p>Al registrarse, navegar o enviar una solicitud de cotización, el usuario declara haber leído y aceptado estos Términos. Si no está de acuerdo, debe abstenerse de usar la Plataforma.</p>
      </>
    ),
  },
  {
    id: 'definiciones', titulo: 'Definiciones',
    contenido: (
      <ul>
        <li><strong>Usuario:</strong> toda persona física o moral que accede a la Plataforma, sea Comprador o Proveedor.</li>
        <li><strong>Solicitud de cotización:</strong> requerimiento de un Comprador enviado a uno o varios Proveedores a través de la Plataforma.</li>
        <li><strong>Cotización aceptada:</strong> propuesta de un Proveedor que el Comprador acepta expresamente dentro de la Plataforma.</li>
        <li><strong>Proveedor verificado:</strong> Proveedor que completó el proceso de verificación descrito en la sección 5.</li>
        <li><strong>Reseña:</strong> calificación y comentario que un Comprador publica sobre un Proveedor tras un pedido completado.</li>
      </ul>
    ),
  },
  {
    id: 'intermediario', titulo: 'La Plataforma como intermediario de información',
    contenido: (
      <>
        <p>{N} actúa <strong>únicamente como intermediario de información</strong>. Pone a disposición de los Usuarios un espacio para publicar productos, solicitar y responder cotizaciones y compartir experiencias.</p>
        <p>La Plataforma <strong>no es parte de las transacciones</strong> que celebren Compradores y Proveedores: no compra, no vende, no almacena, no transporta ni factura los productos, y no actúa como agente, comisionista mercantil, representante ni garante de ninguna de las partes. Los contratos de compraventa se celebran directa y exclusivamente entre Comprador y Proveedor.</p>
      </>
    ),
  },
  {
    id: 'responsabilidad-proveedor', titulo: 'Responsabilidad sobre los productos',
    contenido: (
      <>
        <p>La responsabilidad por la <strong>calidad, seguridad, legalidad y cumplimiento</strong> de los productos ofrecidos recae exclusivamente en el Proveedor, incluyendo, sin limitar:</p>
        <ul>
          <li>La veracidad de descripciones, especificaciones técnicas, precios, pedidos mínimos y tiempos de entrega publicados.</li>
          <li>El cumplimiento de las Normas Oficiales Mexicanas y normas técnicas aplicables, así como de la regulación sobre etiquetado, transporte y manejo de sustancias químicas.</li>
          <li>La entrega de certificados de calidad, certificados de análisis u hojas de datos de seguridad cuando correspondan.</li>
          <li>Las garantías, devoluciones y reposiciones pactadas con el Comprador.</li>
        </ul>
        <p>El Comprador es responsable de validar que el material cumple con sus propios requisitos de ingeniería y de calidad antes de utilizarlo en su proceso productivo.</p>
      </>
    ),
  },
  {
    id: 'verificacion', titulo: 'Verificación de proveedores: alcances y límites',
    contenido: (
      <>
        <p>La insignia de <strong>“Proveedor verificado”</strong> indica que, al momento de la revisión, el Proveedor entregó y la Plataforma revisó documentalmente lo siguiente:</p>
        <ul>
          <li><strong>RFC</strong> y constancia de situación fiscal vigente, y que el nombre o razón social coincide con el registrado en la Plataforma.</li>
          <li><strong>Permisos y licencias vigentes</strong> que resulten aplicables a su giro (por ejemplo, licencia de funcionamiento municipal y, en su caso, permisos para el manejo de sustancias químicas).</li>
          <li><strong>Referencias comerciales</strong> de al menos tres clientes, contactadas por la Plataforma.</li>
        </ul>
        <p>La verificación se renueva al menos una vez al año y puede retirarse si la documentación pierde vigencia o si se detecta información falsa.</p>
        <p><strong>Límites:</strong> la verificación es una revisión documental. No constituye una auditoría, inspección física, certificación de calidad ni evaluación financiera, y <strong>no garantiza</strong> la calidad de los productos, la puntualidad de las entregas, la solvencia del Proveedor ni el resultado de un pedido específico. Los Proveedores “sin verificar” no han completado este proceso, lo cual no implica necesariamente un mal desempeño.</p>
      </>
    ),
  },
  {
    id: 'neutralidad', titulo: 'Neutralidad: la decisión es del Comprador',
    contenido: (
      <>
        <p>{N} <strong>no recomienda a un Proveedor sobre otro</strong>. El orden de los resultados depende de los criterios de búsqueda, filtros y opciones de ordenamiento que el Usuario elija. Las etiquetas de “destacado” identifican productos con alta demanda y no constituyen una recomendación.</p>
        <p>La elección del Proveedor, la negociación de condiciones y la decisión de compra corresponden exclusivamente al Comprador.</p>
      </>
    ),
  },
  {
    id: 'comunicacion', titulo: 'Cotizaciones y comunicación dentro de la Plataforma',
    contenido: (
      <>
        <p>Toda solicitud de cotización, respuesta, aclaración y negociación entre Compradores y Proveedores que se hayan conocido a través de {N} <strong>debe gestionarse dentro de la Plataforma</strong>. Esto permite conservar un historial verificable, atender reclamaciones y proteger a ambas partes.</p>
        <p>Por ello, la Plataforma no publica datos de contacto de los Proveedores (teléfono, correo electrónico, WhatsApp, dirección exacta o sitio web) y los Usuarios se obligan a no compartirlos en mensajes, solicitudes, productos o reseñas.</p>
        <p>Intentar desviar la comunicación o la transacción fuera de la Plataforma para evitar el pago de comisiones podrá dar lugar a la eliminación del contenido, la suspensión o la cancelación de la cuenta, sin perjuicio de lo previsto en la sección de comisiones.</p>
      </>
    ),
  },
  {
    id: 'resenas', titulo: 'Reglas para publicar reseñas y moderación de contenido',
    contenido: (
      <>
        <p>Solo pueden publicar reseñas los Compradores con un pedido completado con el Proveedor a través de la Plataforma. Cada reseña incluye una calificación general de 1 a 5 y calificaciones de calidad, puntualidad, trato y cumplimiento.</p>
        <p>Las reseñas deben:</p>
        <ul>
          <li>Basarse en experiencias reales y verificables del pedido correspondiente.</li>
          <li>Evitar lenguaje ofensivo, discriminatorio o amenazante.</li>
          <li>No incluir datos personales ni de contacto, ni información confidencial de ninguna de las partes.</li>
          <li>No ser publicadas por personas con conflicto de interés (empleados, socios o competidores del Proveedor).</li>
        </ul>
        <p><strong>Moderación:</strong> la Plataforma puede ocultar o eliminar reseñas que incumplan estas reglas. Las reseñas <strong>no se eliminan por ser negativas</strong> ni a petición del Proveedor. El Proveedor puede publicar una respuesta pública por reseña y reportar las que considere contrarias a estas reglas; los reportes se resuelven en un plazo objetivo de 10 días hábiles.</p>
      </>
    ),
  },
  {
    id: 'comisiones', titulo: 'Comisiones',
    contenido: (
      <>
        <p>El uso de la Plataforma para buscar productos y solicitar cotizaciones no tiene costo para los Compradores.</p>
        <p>El Proveedor pagará a {N} una comisión de <strong>{config.comisionPorcentaje} %</strong> <em>(porcentaje de ejemplo)</em> sobre el valor, antes de IVA, de cada cotización aceptada a través de la Plataforma. La comisión se factura mensualmente y es pagadera dentro de los 30 días naturales siguientes a la emisión de la factura.</p>
        <p>La comisión también será aplicable a los pedidos celebrados fuera de la Plataforma entre un Comprador y un Proveedor que se hayan conocido a través de ella, durante los 12 meses siguientes a su primera cotización.</p>
      </>
    ),
  },
  {
    id: 'privacidad', titulo: 'Aviso de privacidad y manejo de datos',
    contenido: (
      <>
        <p>{N} es responsable del tratamiento de los datos personales que recaba, conforme a la legislación mexicana aplicable en materia de protección de datos personales en posesión de los particulares.</p>
        <p><strong>Datos que recabamos:</strong> nombre y cargo del usuario, razón social, RFC, datos de facturación, correo electrónico y teléfono de la cuenta (que no se muestran a otros Usuarios), así como el historial de cotizaciones, mensajes y reseñas.</p>
        <p><strong>Finalidades primarias:</strong> crear y administrar cuentas, verificar Proveedores, gestionar cotizaciones y comunicaciones, facturar comisiones, atender reclamaciones y cumplir obligaciones legales.</p>
        <p><strong>Finalidades secundarias:</strong> envío de comunicaciones comerciales y elaboración de estadísticas agregadas. El usuario puede oponerse a ellas en cualquier momento.</p>
        <p><strong>Transferencias:</strong> no vendemos datos personales. Solo se comparten con proveedores de servicios tecnológicos que actúan por cuenta de la Plataforma, o cuando lo requiera una autoridad competente.</p>
        <p><strong>Derechos ARCO:</strong> el titular puede ejercer sus derechos de acceso, rectificación, cancelación y oposición, así como revocar su consentimiento, mediante solicitud en el centro de ayuda de la Plataforma. La respuesta se emitirá en los plazos que establece la ley.</p>
        <p><strong>Cookies:</strong> la Plataforma utiliza cookies propias para mantener la sesión y recordar preferencias de búsqueda. Pueden deshabilitarse desde el navegador.</p>
      </>
    ),
  },
  {
    id: 'obligaciones', titulo: 'Obligaciones generales de los Usuarios',
    contenido: (
      <ul>
        <li>Proporcionar información veraz y mantenerla actualizada.</li>
        <li>Resguardar sus credenciales de acceso y responder por el uso de su cuenta.</li>
        <li>No publicar productos prohibidos, falsificados o que infrinjan derechos de terceros.</li>
        <li>No usar la Plataforma para fines ilícitos, prácticas monopólicas o competencia desleal.</li>
      </ul>
    ),
  },
  {
    id: 'limitacion', titulo: 'Limitación de responsabilidad',
    contenido: (
      <p>En la medida permitida por la ley, {N} no será responsable por daños directos o indirectos, pérdidas de producción, paros de línea, lucro cesante ni por incumplimientos derivados de las transacciones entre Usuarios, ni por la exactitud de la información publicada por los Proveedores. La Plataforma se ofrece “tal cual” y puede presentar interrupciones por mantenimiento o causas fuera de su control.</p>
    ),
  },
  {
    id: 'suspension', titulo: 'Suspensión y cancelación de cuentas',
    contenido: (
      <p>La Plataforma podrá suspender o cancelar cuentas que incumplan estos Términos, previa notificación al Usuario cuando sea posible, y conservará la información necesaria para atender reclamaciones o requerimientos de autoridad.</p>
    ),
  },
  {
    id: 'modificaciones', titulo: 'Modificaciones',
    contenido: (
      <p>{N} podrá modificar estos Términos. Los cambios se publicarán en esta página con su fecha de actualización y se notificarán a los Usuarios registrados con al menos 15 días naturales de anticipación cuando sean sustanciales.</p>
    ),
  },
  {
    id: 'jurisdiccion', titulo: 'Legislación aplicable y jurisdicción',
    contenido: (
      <p>Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Para su interpretación y cumplimiento, las partes se someten a los tribunales competentes de Ciudad Juárez, Chihuahua, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
    ),
  },
]

export default function Terms() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div role="alert" className="flex gap-3 rounded-xl border-2 border-amber-400 bg-amber-50 p-4 text-amber-900 sm:p-5">
        <Icon name="alert" className="h-6 w-6 shrink-0 text-amber-600" />
        <div>
          <p className="font-bold">Borrador de demostración. Este documento no ha sido revisado por un abogado.</p>
          <p className="mt-1 text-sm">El texto es un ejemplo para presentar el concepto de la plataforma. No debe usarse con usuarios reales sin revisión legal profesional.</p>
        </div>
      </div>

      <header className="mt-8">
        <h1 className="text-3xl font-bold text-slate-900">Términos y condiciones</h1>
        <p className="mt-2 text-sm text-slate-500">{N} · Última actualización del borrador: {config.fechaTerminos}</p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Contenido" className="h-fit lg:sticky lg:top-44">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Contenido</p>
          <ol className="mt-3 space-y-1.5 text-sm">
            {secciones.map((s, i) => (
              <li key={s.id}><a href={`#${s.id}`} className="text-slate-600 hover:text-brand-700 hover:underline">{i + 1}. {s.titulo}</a></li>
            ))}
          </ol>
        </nav>

        <article className="card space-y-10 p-6 text-slate-700 sm:p-10 [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed [&_ul]:space-y-1.5">
          {secciones.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-44 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">{i + 1}. {s.titulo}</h2>
              {s.contenido}
            </section>
          ))}
          <p className="border-t border-slate-200 pt-6 text-sm text-slate-500">
            ¿Dudas sobre estos Términos? Escríbenos desde el centro de ayuda de la Plataforma. También puedes <Link to="/" className="text-brand-700 underline">volver al inicio</Link>.
          </p>
        </article>
      </div>
    </div>
  )
}

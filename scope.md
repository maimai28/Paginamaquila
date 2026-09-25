# Alcance del proyecto — Marketplace B2B de materia prima para maquiladoras

> Nombre provisional: **Nombre de la Plataforma** (configurable en `src/config.js`).
> Estado: idea validada con prototipo navegable. Este documento define qué se construye, qué no y en qué orden.

---

## 1. Resumen

Una plataforma web donde las maquiladoras de Ciudad Juárez encuentran, comparan y cotizan materia prima con distribuidoras locales. Toda la comunicación y la cotización se hacen dentro de la plataforma. Las decisiones se apoyan en reseñas de otras maquiladoras con pedidos completados.

**Modelo de ingreso:** comisión al proveedor por cada cotización aceptada a través de la plataforma.

## 2. Problema

| Para el comprador (maquiladora) | Para el proveedor (distribuidora) |
|---|---|
| Encontrar proveedores locales alternos toma tiempo y depende de contactos personales. | Llegar a nuevas plantas depende de visitas en frío y de tener un contacto dentro de Compras. |
| No hay forma objetiva de comparar desempeño (calidad, puntualidad, trato, cumplimiento). | Un buen historial de servicio no es visible para compradores nuevos. |
| Las cotizaciones llegan por correo, WhatsApp y llamadas, sin historial ordenado. | Las solicitudes llegan incompletas (sin cantidad, fecha ni plazo de pago). |
| Un paro de línea por falta de material obliga a comprar de urgencia sin referencias. | Compite solo por precio porque no puede demostrar confiabilidad. |

## 3. Propuesta de valor

- **Comprador:** encontrar y comparar proveedores locales en minutos, con reseñas honestas y solicitudes estandarizadas.
- **Proveedor:** acceso a demanda calificada y un historial público que premia el buen servicio.
- **Ambos:** registro documentado de cada negociación y reglas claras de conducta.

## 4. Usuarios

| Rol | Quién es | Qué necesita |
|---|---|---|
| Comprador | Comprador o gerente de compras de una maquiladora | Buscar, comparar, cotizar y dar seguimiento |
| Comprador técnico | Ingeniero de calidad o de manufactura | Especificaciones, certificados y hojas de seguridad |
| Proveedor | Vendedor o dueño de una distribuidora | Publicar catálogo, responder cotizaciones y reseñas |
| Administrador | Equipo de la plataforma | Verificar proveedores, moderar contenido y facturar comisiones |

## 5. Objetivos y métricas de éxito

| Objetivo | Métrica | Meta inicial (por validar) |
|---|---|---|
| Liquidez del marketplace | Solicitudes de cotización por semana | Definir tras el piloto |
| Respuesta del proveedor | % de solicitudes respondidas en menos de 24 h | ≥ 80 % |
| Conversión | % de cotizaciones aceptadas | Definir tras el piloto |
| Confianza | % de pedidos completados con reseña | ≥ 40 % |
| Retención | Compradores con 2 o más solicitudes en 90 días | Definir tras el piloto |
| Ingreso | Valor de cotizaciones aceptadas × comisión | Definir tras el piloto |

> Las metas numéricas se fijan después de entrevistar a compradores y proveedores reales (sección 13).

---

## 6. Qué ya existe: prototipo de demostración

Rama `claude/b2b-marketplace-prototype-q57u14`. Sin backend, con datos ficticios en `src/data/`.

- Inicio con búsqueda, categorías, productos destacados y "Cómo funciona".
- Resultados con filtros (categoría, precio, plazo de pago, calificación, solo verificados) y orden (precio, calificación, entrega).
- Detalle de producto: precio por unidad y por volumen, pedido mínimo, entrega, plazos de pago, tarjeta del proveedor y reseñas.
- Perfil del proveedor con calificación desglosada por criterio.
- Formulario de cotización que bloquea datos de contacto y muestra confirmación.
- Términos y condiciones en borrador.
- 14 proveedores, 4 categorías, 55 productos y 94 reseñas ficticias.

**Sirve para:** presentar la idea a socios y hacer entrevistas de validación. **No sirve para:** operar con usuarios reales.

---

## 7. Alcance del MVP (primera versión operable)

### 7.1 En alcance

**Cuentas y acceso**
1. Registro de empresa (compradora o proveedora) con RFC y razón social.
2. Varios usuarios por empresa con roles básicos (administrador y usuario).
3. Inicio de sesión con correo y contraseña, y recuperación de contraseña.

**Proveedores**
4. Alta del perfil: descripción, categorías, certificaciones declaradas y ciudad.
5. Alta y edición de productos: especificaciones, unidad, precio de lista, precios por volumen, pedido mínimo, tiempo de entrega y plazos de pago.
6. Carga de fotos de producto y de fichas técnicas u hojas de seguridad (PDF).
7. Solicitud de verificación con carga de documentos.

**Búsqueda y comparación**
8. Búsqueda por texto con filtros y orden, como en el prototipo.
9. Comparador lado a lado de 2 a 4 productos.

**Cotizaciones y mensajería**
10. Solicitud de cotización a un proveedor, o abierta a toda una categoría.
11. Bandeja de cotizaciones para comprador y proveedor, con estados: enviada → respondida → aceptada / rechazada / vencida.
12. Respuesta del proveedor con precio, cantidad, fecha de entrega, plazo de pago y vigencia.
13. Mensajería interna por cotización, con archivos adjuntos.
14. Filtro automático de datos de contacto en mensajes, solicitudes y reseñas.
15. Notificaciones por correo ("tienes una nueva cotización"), sin incluir datos de la otra parte.

**Pedidos y reseñas**
16. Al aceptar una cotización se genera un pedido. Ambas partes lo marcan como completado.
17. Reseña habilitada solo tras un pedido completado: calificación de 1 a 5, cuatro criterios y texto.
18. Respuesta pública del proveedor (una por reseña) y botón para reportar.

**Administración**
19. Panel de verificación: revisar documentos, aprobar o rechazar, y registrar la fecha de vencimiento.
20. Cola de moderación de reseñas y mensajes reportados.
21. Reporte mensual de cotizaciones aceptadas por proveedor para facturar la comisión.

**Legal**
22. Términos, aviso de privacidad y consentimiento revisados por un abogado.

### 7.2 Fuera de alcance del MVP

| Excluido | Motivo | Cuándo reconsiderar |
|---|---|---|
| Pagos dentro de la plataforma / escrow | Regulación financiera y alto costo de implementación | Cuando haya volumen transaccional recurrente |
| Logística y fletes | Otro negocio; lo resuelve el proveedor | Fase 3 |
| Financiamiento o factoraje | Regulado; requiere socio financiero | Fase 3 |
| Integración con ERP (SAP, Oracle, etc.) | Cada planta es distinta; alto costo | Cuando un cliente grande lo pida |
| Subastas inversas | Puede ahuyentar proveedores al inicio | Fase 2, si la liquidez lo permite |
| Otras ciudades (Chihuahua, Reynosa, Tijuana…) | Primero probar densidad local | Tras cumplir las métricas en Juárez |
| App móvil nativa | El sitio responsivo cubre el uso inicial | Si el uso en celular lo justifica |
| Versión en inglés | Compradores de EE. UU. no son el mercado inicial | Fase 2 |
| Precios dinámicos por índice (cobre, resinas) | Complejidad alta | Fase 2 |

---

## 8. Flujos principales

**A. Comprador cotiza un producto**
1. Busca → filtra → abre el detalle del producto.
2. Pulsa "Solicitar cotización" → llena cantidad, fecha, plazo y comentarios.
3. El proveedor recibe la notificación y responde en la bandeja.
4. El comprador acepta → se crea el pedido → se registra la comisión.
5. Ambas partes marcan el pedido como completado → el comprador puede reseñar.

**B. Solicitud abierta (el material no está en el catálogo)**
1. El comprador describe el material y elige la categoría.
2. La plataforma envía la solicitud a los proveedores de esa categoría, sin mostrar quién es el comprador hasta que responda.
3. El comprador recibe varias respuestas y las compara.

**C. Verificación de proveedor**
1. El proveedor sube su constancia de situación fiscal, los permisos aplicables y tres referencias.
2. El administrador revisa y contacta las referencias.
3. Si aprueba, se activa la insignia con fecha de vencimiento a un año.

---

## 9. Reglas de negocio

1. **Contacto:** nunca se muestran teléfono, correo, WhatsApp, dirección exacta ni sitio web del proveedor. Solo la ciudad.
2. **Comunicación:** toda negociación entre partes que se conocieron en la plataforma ocurre dentro de ella.
3. **Neutralidad:** la plataforma no recomienda proveedores. El orden depende solo de los filtros y del orden que elige el usuario. "Destacado" no es una recomendación.
4. **Reseñas:** solo con pedido completado. No se eliminan por ser negativas ni a petición del proveedor. Solo se retiran si violan las reglas publicadas.
5. **Verificación:** es una revisión documental (RFC, permisos, referencias). No garantiza calidad ni puntualidad, y así se comunica.
6. **Comisión:** porcentaje sobre el valor antes de IVA de cada cotización aceptada, a cargo del proveedor. También aplica a pedidos cerrados fuera de la plataforma entre partes que se conocieron en ella durante los 12 meses siguientes. El porcentaje está por definir; el prototipo usa 3 % como ejemplo.
7. **Responsabilidad:** la calidad, la seguridad y el cumplimiento del producto son del proveedor. La plataforma no es parte de la compraventa.

---

## 10. Modelo de negocio

| Fuente | Descripción | Fase |
|---|---|---|
| Comisión por cotización aceptada | % del valor antes de IVA, facturado mensualmente al proveedor | MVP |
| Suscripción de proveedor | Más productos, estadísticas y respuesta prioritaria a solicitudes abiertas | Fase 2 |
| Verificación extendida | Visita a instalaciones o auditoría de terceros, con costo | Fase 2 |

**Riesgo principal: desintermediación.** Si comprador y proveedor se conocen en la plataforma y luego compran por fuera, no hay comisión. Mitigaciones:
- Ocultar los datos de contacto y filtrarlos en mensajes (ya está en el prototipo).
- Dar valor a quedarse: historial, reseñas, comparador y solicitudes abiertas.
- Cláusula contractual de comisión a 12 meses (sección 9).
- Evaluar pronto si conviene cobrar suscripción en lugar de, o además de, la comisión.

---

## 11. Requisitos no funcionales y legales

| Tema | Requisito |
|---|---|
| Datos personales | Aviso de privacidad y derechos ARCO conforme a la ley mexicana vigente de protección de datos en posesión de particulares. Validar con abogado, porque la ley cambió en 2025. |
| Facturación | La plataforma emite CFDI por la comisión. El proveedor factura la mercancía directamente al comprador. |
| Químicos | Productos químicos con hoja de datos de seguridad obligatoria (NOM-018-STPS) antes de publicarse. |
| Seguridad | HTTPS, contraseñas con hash, permisos por empresa, respaldo diario y bitácora de accesos del administrador. |
| Rendimiento | Búsqueda con respuesta en menos de 1 s para el catálogo inicial (menos de 5,000 productos). |
| Accesibilidad | Navegable con teclado y buen contraste. Funcional en celular. |
| Idioma y moneda | Español de México y MXN. Precios antes de IVA, indicado siempre. |

### Stack sugerido para el MVP
- **Frontend:** reutilizar el prototipo (React + Vite + Tailwind + React Router).
- **Backend y base de datos:** PostgreSQL con un backend administrado (Supabase o similar) para autenticación, almacenamiento de archivos y permisos por fila. Reduce el tiempo de construcción frente a un backend propio.
- **Correo transaccional:** un servicio de envío como Resend, Postmark o similar.
- **Hosting:** Vercel o Netlify para el frontend.

> Decisión abierta: backend administrado vs. propio (Node o Django). Recomendación: administrado para el MVP; migrar solo si hay una limitación concreta.

---

## 12. Riesgos y supuestos

| Supuesto o riesgo | Impacto | Cómo validarlo o mitigarlo |
|---|---|---|
| Las maquiladoras aceptan cotizar fuera de sus canales corporativos | Alto | Entrevistas con compras. Empezar por compras indirectas y urgencias, no por materiales ya aprobados por el corporativo. |
| Muchos materiales directos requieren proveedores aprobados por el corporativo o el cliente final | Alto | Enfocar el MVP en MRO, empaque, químicos de limpieza y materiales no críticos. |
| Los proveedores aceptan pagar comisión | Alto | Piloto sin costo y medir la disposición a pagar antes de cobrar. |
| Desintermediación | Alto | Ver sección 10. |
| Masa crítica: pocos proveedores o pocas solicitudes al inicio | Alto | Dar de alta manualmente 20–30 proveedores antes de abrir a compradores. |
| Reseñas falsas o de represalia | Medio | Solo con pedido completado, moderación y derecho de respuesta. |
| Responsabilidad legal por el desempeño de un proveedor verificado | Medio | Términos claros sobre los alcances de la verificación y revisión legal. |

---

## 13. Preguntas abiertas (resolver antes de construir el MVP)

1. ¿Qué porcentaje de las compras de una maquiladora típica puede decidirse localmente sin aprobación del corporativo?
2. ¿Qué categorías tienen más dolor: urgencias, empaque, químicos o MRO?
3. ¿Qué comisión tolera un distribuidor local? ¿Prefiere comisión o suscripción?
4. ¿Los compradores aceptarían solicitudes abiertas sin ver quién responde hasta recibir la cotización?
5. ¿Quién hace las verificaciones y cuánto cuesta cada una?
6. ¿La plataforma necesita ser una empresa constituida desde el piloto, o basta un acuerdo con los primeros usuarios?

**Validación propuesta con el prototipo:**
- [ ] Entrevistar a 10 compradores de maquiladoras (distintos giros).
- [ ] Entrevistar a 10 distribuidores locales.
- [ ] Registrar sus respuestas a las preguntas 1–4 y ajustar este documento.
- [ ] Conseguir 3 compradores y 10 proveedores dispuestos a un piloto.

---

## 14. Fases

| Fase | Contenido | Criterio para pasar a la siguiente |
|---|---|---|
| 0. Prototipo | Demo navegable con datos ficticios ✅ | Hecho |
| 1. Validación | Entrevistas, ajuste de alcance, revisión legal y decisión de comisión | Compromiso de un piloto (3 compradores y 10 proveedores) |
| 2. MVP | Sección 7.1 | Metas de la sección 5 durante el piloto |
| 3. Crecimiento | Suscripciones, comparador avanzado, versión en inglés, subastas inversas y otras ciudades | Rentabilidad por comprador activo |
| 4. Transaccional | Pagos, logística y financiamiento con socios | Volumen que justifique la regulación |

---

## 15. Entregables del MVP

- Aplicación web en producción con dominio propio.
- Panel de administración (verificación, moderación y comisiones).
- Términos, aviso de privacidad y contrato de proveedor revisados por un abogado.
- Manual breve para proveedores (alta de catálogo y respuesta de cotizaciones).
- Tablero de métricas de la sección 5.

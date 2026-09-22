# Marketplace B2B de materia prima — prototipo

Prototipo de demostración de un marketplace que conecta maquiladoras de Ciudad Juárez con distribuidoras de materia prima. **No tiene backend**: todos los datos son ficticios y viven en archivos JSON dentro de `src/data/`.

Stack: React + Vite + Tailwind CSS + React Router.

## Cómo correrlo

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

Para generar una versión estática: `npm run build` (queda en `dist/`; `npm run preview` la sirve localmente).

## Cambiar el nombre de la plataforma

Edita `src/config.js`. Ahí están el nombre (`nombrePlataforma`), el eslogan, la comisión de ejemplo que aparece en los Términos y la fecha del borrador. El cambio se refleja en todo el sitio.

## Páginas

| Ruta | Página |
|---|---|
| `/` | Inicio: búsqueda, categorías, destacados y "Cómo funciona" |
| `/buscar` | Resultados con filtros (categoría, precio, plazo de pago, calificación, verificados) y orden |
| `/producto/:id` | Detalle de producto, tarjeta del proveedor y reseñas |
| `/proveedor/:id` | Perfil del proveedor, productos y todas sus reseñas |
| `/cotizacion` | Formulario de solicitud de cotización (acepta `?producto=` o `?proveedor=`) |
| `/terminos` | Términos y condiciones (borrador) |

## Datos: cómo agregar o editar

Todo está en `src/data/`. Los IDs conectan los archivos entre sí. En los ejemplos de abajo, los comentarios `//` son solo explicativos: bórralos al copiar, porque JSON no los admite.

### `proveedores.json`

```json
{
  "id": "mi-proveedor",                 // único, se usa en la URL: /proveedor/mi-proveedor
  "nombre": "Mi Proveedor, S.A. de C.V.",
  "ciudad": "Ciudad Juárez, Chih.",      // solo ciudad: nunca teléfono, correo ni dirección
  "categorias": ["metales-alambre"],     // IDs de categorias.json
  "verificado": true,
  "enPlataformaDesde": 2024,             // los "años en la plataforma" se calculan solos
  "pedidosCompletados": 120,
  "tiempoRespuesta": "Menos de 8 horas",
  "certificaciones": ["ISO 9001:2015"],
  "descripcion": "Texto breve sobre el proveedor."
}
```

### `productos.json`

```json
{
  "id": "p056",                          // único, se usa en la URL: /producto/p056
  "proveedorId": "mi-proveedor",
  "categoriaId": "metales-alambre",
  "nombre": "Alambre galvanizado calibre 16",
  "descripcion": "…",
  "unidad": "kg",                        // kg, litro, pieza, rollo, frasco…
  "precioUnitario": 39.5,                // MXN antes de IVA
  "preciosPorVolumen": [{ "minimo": 1000, "precio": 37.9 }],
  "pedidoMinimo": 250,                   // debe ser menor que el primer "minimo" de volumen
  "tiempoEntregaDias": { "min": 2, "max": 4 },
  "plazosPago": ["contado", "30", "60"], // valores posibles: contado, 30, 60, 90
  "destacado": false,                    // true = aparece en "Productos destacados" del inicio
  "especificaciones": { "Diámetro": "1.59 mm", "Presentación": "Rollo de 20 kg" }
}
```

Si agregas una unidad nueva, añade su plural en `src/lib/format.js` (`plurales`).

### `resenas.json`

```json
{
  "id": "r095",
  "proveedorId": "mi-proveedor",
  "productoId": "p056",
  "empresa": "Maquiladora de arneses automotrices",   // nombre genérico, no real
  "fecha": "2026-08-14",
  "calificacion": 4,                                   // 1 a 5
  "calificaciones": { "calidad": 5, "puntualidad": 3, "trato": 4, "cumplimiento": 4 },
  "titulo": "…",
  "texto": "…",
  "respuestaProveedor": "…"                            // opcional
}
```

Los promedios de cada proveedor (general y por criterio) se calculan automáticamente a partir de las reseñas.

### `categorias.json`

Cada categoría tiene `id`, `nombre`, `descripcion` e `icono`. Si agregas una categoría nueva, define también sus colores e ilustración en `src/components/CategoryIcon.jsx`.

## Regla de contacto

El sitio no muestra datos de contacto de proveedores. El formulario de cotización bloquea el envío si detecta teléfonos, correos o enlaces en los campos de texto. Mantén esta regla al editar descripciones y reseñas.

## Estructura

```
src/
  config.js          nombre y textos generales
  data/              JSON editables
  lib/data.js        acceso a datos, búsqueda y cálculo de calificaciones
  lib/format.js      formato de precios (MXN), fechas y unidades
  components/        piezas reutilizables (tarjetas, reseñas, header/footer…)
  pages/             una página por ruta
```

Las imágenes de producto son marcadores de posición generados en SVG según la categoría.

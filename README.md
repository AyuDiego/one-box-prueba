## Descripción

Este proyecto es una solución para el ejercicio técnico de un **sistema de reserva de localidades para eventos**. Permite a los usuarios consultar una cartelera de eventos, ver el detalle de cada evento con sus sesiones disponibles y gestionar un carrito de compra de localidades seleccionadas.

## Funcionalidades principales

- **Cartelera de eventos**:

  - Listado de eventos en formato grid.
  - Responsive:
    - 1 columna en pantallas pequeñas
    - 2 columnas en pantallas medianas/grandes
  - Cada tarjeta de evento muestra: título, subtítulo, imagen, lugar, fechas, descripción (solo en desktop) y botón de acción.
  - Ordenados por fecha de finalización (ascendente).
  - Acceso al detalle de cada evento desde cualquier elemento clicable de la tarjeta.

- **Ficha de evento**:

  - Listado de sesiones disponibles para el evento, cada una con fecha, disponibilidad, número de localidades seleccionadas y controles +/–.
  - Carrito de la compra mostrando las sesiones seleccionadas agrupadas por evento.
  - Botón para volver a la cartelera.
  - Orden de sesiones por fecha (ascendente).
  - Prevención de selección de más localidades que las disponibles y de valores negativos.
  - Mensaje “EVENT INFO NOT FOUND” si no hay datos para el evento.

- **Carrito de la compra**:
  - Agrupa las sesiones seleccionadas por evento.
  - Muestra el título del evento y, debajo, las sesiones seleccionadas con fecha, cantidad y botón para eliminar (decrementar) localidades.
  - Solo aparecen eventos con sesiones seleccionadas.

## Arquitectura y tecnologías

- **Angular** 20 con programación reactiva (`signals`, `computed`)
- **Routing** con `@angular/router`
- **HTTPClient** para simular peticiones a servidor usando ficheros JSON mock
- **Componentes desacoplados y reutilizables** (por ejemplo, el carrito)
- **Diseño responsive** con CSS modular y variables
- **Arquitectura escalable**: separación clara por features y servicios
- **Sin dependencias externas de UI** (solo CSS propio, pero preparado para integrar librerías si se desea)

## Estructura del proyecto

- `src/app/features/catalog/`: Cartelera de eventos
- `src/app/features/event-detail/`: Ficha de evento y sesiones
- `src/app/shared/components/shopping-cart/`: Componente reutilizable de carrito
- `src/app/core/services/`: Servicios para eventos, sesiones y carrito
- `src/assets/data/`: Ficheros JSON mock de eventos y sesiones
- `src/assets/img/`: Imágenes de ejemplo y el icono de la papelera

## Cómo ejecutar

1. Instala dependencias:

   ```sh
   npm install

   ```

2. Arranca el servidor de desarrollo:
   ```sh
   npm start
   ```
3. Accede a http://localhost:4200 en tu navegador.

4. Lanzar tests:
   ```sh
   npm test
   ```
5. Coverage test:

   ```sh
   npm run test:coverage

   ```

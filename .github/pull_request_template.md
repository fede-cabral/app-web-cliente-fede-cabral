## Descripción

- Cargué el catálogo real con 20 fotos, separado en categorías (mates de calabaza, mates de madera, bombillas de alpaca, yerbas y termos).
- Los filtros de la izquierda ahora llevan a cada categoría.
- Agregué `carrito.js`, mi primer JavaScript: los botones "Agregar al carrito" y "Eliminar" funcionan de verdad. El carrito se guarda en el navegador con localStorage, así que no se pierde al cambiar de página. El menú muestra la cantidad de productos.
- Corregí el nombre de la tienda a Mates_Oliver en las 4 páginas.
- Mejoré la presentación: tipografía Playfair Display para los títulos, encabezado centrado, tarjetas de producto más grandes y con sombra.
- Arreglé un desborde horizontal de la tabla del carrito en pantallas de celular.

Yerbas y Termos quedaron como "Próximamente" porque todavía no tengo las fotos.

-

## Cómo probarlo

Pasos para que el profesor pueda correr o revisar el cambio (comandos, URL, capturas de pantalla si aplica):

-1. Cambiar a la rama `feature/catalogo-fotos`.
2. Abrir `index.html` con Live Server.
3. Hacer clic en "Agregar al carrito" en cualquier producto.
4. Ir a Carrito desde el menú: el producto aparece en la tabla.
5. El botón "Eliminar" lo saca y recalcula el total.

## Prompt usado y historial con Open Code

Pegá todo el histórico de mensajes con el agente de IA:

```
Cargá las fotos de la carpeta y armá el catálogo separado por categorías,
usando como título de cada producto el nombre del archivo.
Corregí el nombre de la tienda y hacé que se vea más prolijo: el título
centrado, más grande y con una tipografía llamativa.
Agregá un botón de eliminar en el carrito, agrandá la lista de filtros y
los productos.
Poné en cada producto un botón de agregar al carrito, y que ese botón y
el de eliminar funcionen de verdad.
```

## Checklist antes de enviar

- [x] Trabajé en una rama propia (no directo en `main`).
- [x] Probé que mi código/archivo funciona antes de subirlo.
- [x] Este PR es dentro de mi propio repositorio.
- [x] Completé todos los datos de esta plantilla.

## Comentarios adicionales (opcional)

Dudas, aclaraciones o algo que quieras comentarle al profesor.
El carrito guarda en el navegador, no en un servidor. Si se abre la página en otra computadora el carrito está vacío. Para que sea un e-commerce real haría falta backend y base de datos.
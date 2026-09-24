# predicciones

Voy a armar una tienda de mates, bombillas y yerbas.

Antes de escribir el HTML pienso que:

1. Voy a necesitar header, main y footer.
2. El menú lo voy a hacer con una lista de links.
3. Al abrirlo se va a ver todo apilado y sin colores, porque no hay CSS.

# prediccion 31/8

1- quiero crear pantalla de carrito y contacto del ecomerce

# prediccion 05/9

Predicción: maquetar con los estilos principales header, catálogo, nav y footer.
Antes de escribir el CSS pienso que:
1. Voy a necesitar un archivo aparte, style.css, y engancharlo desde el HTML.
2. Con CSS voy a poder poner el menú horizontal en vez de con puntitos.
3. Los filtros van a poder quedar a la izquierda y el catálogo al centro.
4. Voy a usar verde y dorado como colores de la tienda.
5. En el celular las columnas se van a tener que acomodar una abajo de la otra

# prediccion 14/9

Predicción: cargar el catálogo real con las fotos de los productos.

Antes de hacerlo pienso que:
1. Voy a necesitar una carpeta dentro del repo para guardar las imágenes.
2. Cada producto va a ser un article con su foto, su título y su precio.
3. El título de cada producto va a salir del nombre de la foto.
4. Voy a separar el catálogo en secciones por categoría: mates de calabaza,
   mates de madera, bombillas de alpaca, yerbas y termos.
5. Los filtros de la izquierda van a poder llevar a cada sección.
6. Las fotos van a tener que achicarse con CSS, porque si no salen gigantes.
7. Con muchos productos voy a necesitar acomodarlos en una grilla y no uno
   abajo del otro.


# prediccion 14/9 (segunda parte)

Predicción: corregir el nombre de la tienda y mejorar la presentación.

Antes de hacerlo pienso que:
1. El nombre está mal escrito: dice Mates_Oiver y va Mates_Oliver. Hay que
   cambiarlo en las 4 páginas, no alcanza con una.
2. Para que se vea más prolijo, el título tiene que estar centrado y más
   grande.
3. La letra por defecto del navegador se ve muy básica. Voy a necesitar
   traer una tipografía de afuera.
4. Creo que con una sombra suave las tarjetas de producto van a verse
   menos planas.
5. Todo esto es CSS, no debería tener que tocar la estructura del HTML.


# prediccion 14/9 (tercera parte)

Predicción: agregar el botón de eliminar en el carrito y agrandar el
listado de filtros y los productos.

Antes de hacerlo pienso que:
1. El botón de eliminar va a necesitar una columna nueva en la tabla, así
   que también hay que agregarla en el encabezado.
2. Ese botón va a tener que verse distinto al de Enviar, porque borrar no
   es lo mismo que confirmar.
3. Por ahora el botón va a ser solo la parte visual, la columna y el
   estilo; que borre de verdad queda para más adelante.
4. Para agrandar los filtros y los productos alcanza con cambiar números
   en el CSS, no debería tocar el HTML.
5. Si agrando las tarjetas van a entrar menos por fila, y en el celular se
   van a seguir apilando igual.

# prediccion 17/9 

Predicción: quiero agregar un poco mas de estilo.

Antes de hacerlo pienso que:
1. Debo corregir el footer que se mantenga en todas las pestañas siempre en la parte inferior en todas las vistas.

2. un video en el head para dar un toque mas personalizado.

3. voy a agregar vista de usuario y vista de programador

4. agregar mas productos

5. agregar mas etiquetas y buscador


# prediccion 24/9

Predicción: sumar los efectos de la clase 4 (position, transiciones y
animaciones) sin tocar la estructura que ya tengo.

Antes de hacerlo pienso que:
1. El cartel de OFERTA va a tener que ir con position absolute, y para que
   se ubique adentro de la tarjeta el article va a necesitar position
   relative. Si no, se me va a ir a la esquina de la pantalla.
2. Ese cartel lo quiero solo en los productos que tienen precio tachado,
   así que lo voy a resolver con CSS y no agregando 20 veces lo mismo en
   el HTML.
3. Para la rayita dorada abajo de los títulos no hace falta HTML nuevo:
   con ::after puedo crear el elemento desde el CSS.
4. La entrada de las tarjetas necesita @keyframes y no transition, porque
   transition arranca con un hover y esto tiene que correr solo al cargar.
5. Si cada tarjeta tuviera el mismo delay entrarían todas juntas, así que
   voy a escalonarlas con animation-delay.
6. Tengo que tener cuidado con animation-fill-mode: si dejo forwards, el
   transform final de la animación me pisa el transform del hover y las
   tarjetas dejan de levantarse.
7. Todo esto es CSS agregado al final, no debería romper nada de lo
   anterior.
8. voy a crear la pestaña de administrador para que el mismo pueda cargar 
   sus cosas.
   
## Predicción 1/10 — Flechas del carrusel

Voy a agregar dos botones ‹ y › a cada carrusel de productos.

**Qué creo que va a pasar:** los botones van a aparecer flotando encima
del carrusel, uno a cada lado, centrados verticalmente. Al hacer clic
en › el carrusel se va a correr 300px hacia la derecha (el ancho de
una tarjeta más el espacio), suave, no de golpe.

**Qué creo que puede salir mal:** que los botones tapen la primera y la
última tarjeta. Y que si los pongo con HTML tenga que copiar y pegar el
mismo código 4 veces, una por cada carrusel.

**Por qué necesito JavaScript:** el CSS puede hacer que algo se vea y se
mueva, pero no puede reaccionar a un clic y correr una barra de scroll.
Eso solo lo hace JS con scrollBy().
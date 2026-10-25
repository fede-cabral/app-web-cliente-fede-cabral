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

## Predicción 3/10 — Página de preguntas frecuentes

Voy a agregar una página nueva, faq.html, como última pestaña del menú.

la página va a salir con el mismo header, el mismo menú y el mismo pie 
que las otras cuatro, porque uso la mismaestructura y el mismo style.css. 
Las preguntas van a estar plegadas y se van a abrir al hacerles clic.

 con la etiqueta <details> de HTML. Abre y cierra sola, sin JavaScript. 
 El navegador le pone el atributo "open" alabrirla y yo lo uso en el CSS
  con el selector details[open] para cambiar
el + por un −.

**Qué creo que puede salir mal:** que me olvide de agregar el enlace FAQ
en alguna de las otras cuatro páginas y quede un menú distinto en cada
una. Son ocho lugares: el menú de arriba y el pie de página de index,
producto, carrito y contacto.

Voy a hacer tres cosas: darle ficha propia a las bombillas, que al tocar
la foto de una ficha se abra la imagen en grande, y que los filtros de la
izquierda acompañen el scroll en vez de quedarse arriba.

**Qué creo que va a pasar:** las bombillas van a necesitar su propia ficha
porque los datos son otros (alpaca, cabezal, filtro) y no los del mate
(cedro, virola). Como el CSS de la ficha está hecho con clases y no con
id, si le pongo las mismas clases a la ficha nueva el estilo lo va a
agarrar solo y no voy a tener que escribir CSS.

**Qué creo que puede salir mal:** que el selector que abre la ficha de los
mates agarre también las bombillas, porque las dos van a tener el mismo
data-especialidad. Voy a tener que acotarlo con el id de la sección.

Con el visor: no tengo la foto grande de todos los productos. Los que no
la tengan van a mostrar la imagen rota. Tendría que resolver que en ese
caso muestre la del catálogo.

Con los filtros: si los pego arriba con position sticky y pongo top: 0, el
header me los va a tapar, porque el header también es sticky. El top tiene
que ser la altura del header. Y en el celular, donde los filtros van
arriba a todo lo ancho, pegarlos no tiene sentido.

**Por qué necesito JavaScript:** el CSS puede mostrar y esconder cosas con
:hover, pero no puede cambiar el src de una imagen según cuál tarjeta
toqué. Eso necesita JS. Los filtros pegados, en cambio, son CSS puro:
position: sticky no lleva nada de JS.

**Lo que voy a borrar:** producto.html, porque quedó redundante. Entre el
video, las categorías de abajo del video y los filtros, ya se llega a
todos los productos. También sale "Productos" del menú.
Voy a hacer tres cosas: darle ficha propia a las bombillas, que al tocar
la foto de una ficha se abra la imagen en grande, y que los filtros de la
izquierda acompañen el scroll en vez de quedarse arriba.

**Qué creo que va a pasar:** las bombillas van a necesitar su propia ficha
porque los datos son otros (alpaca, cabezal, filtro) y no los del mate
(cedro, virola). Como el CSS de la ficha está hecho con clases y no con
id, si le pongo las mismas clases a la ficha nueva el estilo lo va a
agarrar solo y no voy a tener que escribir CSS.

**Qué creo que puede salir mal:** que el selector que abre la ficha de los
mates agarre también las bombillas, porque las dos van a tener el mismo
data-especialidad. Voy a tener que acotarlo con el id de la sección.

Con el visor: no tengo la foto grande de todos los productos. Los que no
la tengan van a mostrar la imagen rota. Tendría que resolver que en ese
caso muestre la del catálogo.

Con los filtros: si los pego arriba con position sticky y pongo top: 0, el
header me los va a tapar, porque el header también es sticky. El top tiene
que ser la altura del header. Y en el celular, donde los filtros van
arriba a todo lo ancho, pegarlos no tiene sentido.

**Por qué necesito JavaScript:** el CSS puede mostrar y esconder cosas con
:hover, pero no puede cambiar el src de una imagen según cuál tarjeta
toqué. Eso necesita JS. Los filtros pegados, en cambio, son CSS puro:
position: sticky no lleva nada de JS.

**Lo que voy a borrar:** producto.html, porque quedó redundante. Entre el
video, las categorías de abajo del video y los filtros, ya se llega a
todos los productos. También sale "Productos" del menú.

# prediccion 18/10


1. Los for ya están bien puestos en las tres páginas, los revisé uno por
   uno. Lo que falta es lo que acompaña a esa relación, no la relación.
2. En contacto uso <br> para bajar el input abajo del label. Eso es
   maquetar con HTML. La clase .campo ya está hecha en el CSS y hace lo
   mismo con flex-direction: column, así que no voy a tener que escribir
   CSS nuevo para contacto.
3. Al envolver los campos de admin en un fieldset creo que se me va a
   desarmar el panel, porque .form-panel es un grid y los campos van a
   dejar de ser hijos directos de ese grid. El fieldset va a pasar a ser
   el único hijo y los campos se van a apilar. Lo voy a tener que
   arreglar poniéndole al fieldset grid-column 1 / -1 y su propia
   definición de columnas, igual que hice en el carrito.
4. El fieldset trae un borde y un margen propios del navegador. Si no los
   reseteo se va a ver una caja gris que no es de la tienda.
5. Al ponerle required a los campos del login, el navegador va a validar
   antes de que corra mi JavaScript. Así que si aprieto Entrar con los
   campos vacíos no voy a ver mi mensaje de "todavía no funciona": voy a
   ver el cartel del navegador. No está roto, es el orden en que pasan
   las cosas.
6. Si cambio los id para prefijarlos, tengo que cambiar el for en el
   mismo movimiento. Si cambio uno solo rompo la asociación y queda peor
   que antes. Van de a pares.
7. El select de categoría no tiene estilo propio: la regla del CSS dice
   input, textarea y el select quedó afuera. Va a seguir viéndose gris
   hasta que le escriba su regla.

**Cómo lo voy a verificar:** haciendo clic en el texto del label, no en el
campo. Si el cursor salta al input, la asociación funciona. Y apretando
Tab para ver que el foco se vea.

# prediccion 18/10 (segunda parte)

Predicción: meterle JavaScript al carrito con lo que vimos en clase, para
que el total salga de una cuenta y no esté escrito a mano.

Antes de hacerlo pienso que:

1. Hoy el subtotal, el total y las cuotas están escritos a mano en el
   HTML. Si cambio un precio tengo que acordarme de cambiarlos en cuatro
   lugares y seguro me olvido de alguno.
2. Voy a necesitar que los productos sean un array de objetos en JS, con
   precio y cantidad, para poder hacer cuentas con ellos.
3. reduce me sirve para el total porque suma todo en un solo número. El
   valor inicial 0 no es opcional: si el carrito queda vacío y no lo
   pongo, reduce da error en vez de dar cero.
4. find me sirve para los botones + y -, porque necesito UN producto, no
   una lista. Si usara filter me devolvería un array de un elemento y
   tendría que sacarlo con [0].
5. filter me sirve para Eliminar, porque me devuelve todos los que NO son
   el que borro.
6. Creo que me voy a chocar con const: si declaro el array con const no
   voy a poder reasignarlo con el resultado del filter. Voy a tener que
   vaciarlo y volver a llenarlo, o usar let.
7. Si solo borro la tarjeta de la pantalla y no la saco del array, el
   total va a seguir mostrando el precio de un producto que ya no está.
   El dato manda, la pantalla es el reflejo.
8. Las cuotas van a quedar con decimales feos cuando el total no sea
   divisible por 3.

# prediccion 25/10

Predicción: sacar el JavaScript de adentro del HTML y ponerlo en
archivos .js separados, como los tiene el profe en su repo.

Antes de hacerlo pienso que:
1. Hoy tengo JavaScript escrito adentro del HTML en tres páginas:
   carrito.html, index.html y login.html. Cada vez que quiero tocar el
   JS tengo que bajar hasta el final de un archivo de 600 líneas
   buscando entre etiquetas.
2. Con un .js aparte, VS Code me va a avisar de errores de JavaScript
   que adentro del HTML no me marca igual.
3. Creo que NO conviene un solo archivo compartido por las tres
   páginas. El código del carrito busca #subtotal, y en index.html eso
   no existe: querySelector devolvería null y al pedirle .textContent
   el navegador tiraría error. Un archivo por página evita eso.
4. La etiqueta con src va al final del body, en el mismo lugar donde
   estaba el script. Si la pusiera en el head, el JS correría antes de
   que existan los elementos y no encontraría nada.
5. El código es exactamente el mismo: lo estoy mudando, no
   reescribiendo. Si algo deja de andar es porque me equivoqué en la
   ruta del src o porque corté de más al copiar.
6. Esto no se ve en la página. Si todo salió bien, el carrito, el
   carrusel y la ficha de producto tienen que funcionar igual que
   antes.
7. Lo necesito para la clase que viene: fetch y async/await van a vivir
   en estos archivos, no adentro del HTML.
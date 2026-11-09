// ===== Configuracion de Supabase =====
// La anon key es publica a proposito: lo que protege los datos son las
// politicas de RLS, no esconder esta clave.
const URL_SUPABASE = 'https://aeitezfpbptudmgmjvnw.supabase.co';
const KEY_SUPABASE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaXRlemZwYnB0dWRtZ21qdm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5NjIwNTEsImV4cCI6MjEwODUzODA1MX0.Oajx4tN_iXOprWIcKPIMHJXkEqFtBO5vEQjO4bs0Ar0';

const cabeceras = {
  apikey: KEY_SUPABASE,
  Authorization: 'Bearer ' + KEY_SUPABASE
};

// ===== Elementos de la pagina =====
const lista = document.querySelector('#lista-productos');
const avisoAdmin = document.querySelector('#aviso-admin');
const formulario = document.querySelector('#form-producto');
const botonAgregar = document.querySelector('#boton-agregar');

const formatearPrecio = (n) => '$' + n.toLocaleString('es-AR');

// ===== Mensaje dentro de la lista (cargando, vacia o error) =====
const mostrarMensajeEnLista = (texto) => {
  lista.innerHTML = '';
  const item = document.createElement('li');
  item.className = 'admin-item-mensaje';
  item.textContent = texto;
  lista.appendChild(item);
};

// ===== Convierte UN producto en UN <li> de la lista =====
const crearItem = (producto) => {
  const item = document.createElement('li');
  item.className = 'admin-item';

  const foto = document.createElement('img');
  foto.className = 'admin-miniatura';
  foto.src = producto.foto;
  foto.alt = producto.nombre;
  // Son 35 fotos: con lazy el navegador baja solo las que se ven en pantalla.
  foto.loading = 'lazy';

  const datos = document.createElement('div');

  const nombre = document.createElement('h3');
  nombre.textContent = producto.nombre;

  // Armo el detalle de a partes porque no todos los productos tienen
  // especialidad y color. Si los pegara siempre, a un termo le quedaria
  // "termos · Coleman ·  · Stock: 4" con un hueco en el medio.
  let texto = producto.categoria;
  if (producto.especialidad) {
    texto += ' · ' + producto.especialidad;
  }
  if (producto.color) {
    texto += ' · ' + producto.color;
  }
  texto += ' · Stock: ' + producto.stock;

  const detalle = document.createElement('p');
  detalle.className = 'admin-detalle';
  detalle.textContent = texto;

  datos.append(nombre, detalle);

  const precio = document.createElement('p');
  precio.className = 'admin-precio';
  precio.textContent = formatearPrecio(producto.precio_final);

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'eliminar';
  boton.textContent = 'Eliminar';
  // La funcion de flecha "recuerda" este producto: cada boton sabe que id
  // borrar sin tener que guardarlo en un atributo del HTML.
  boton.addEventListener('click', () => eliminarProducto(producto));

  item.append(foto, datos, precio, boton);
  return item;
};

// ===== Trae los productos (GET) y los pinta =====
const traerProductos = async () => {
  mostrarMensajeEnLista('Cargando productos...');

  try {
    const respuesta = await fetch(
      URL_SUPABASE + '/rest/v1/productos?select=*&order=id.asc',
      { headers: cabeceras }
    );

    // fetch NO falla solo por un 404 o un 500: hay que mirarlo a mano.
    if (!respuesta.ok) {
      throw new Error('HTTP ' + respuesta.status);
    }

    const productos = await respuesta.json();

    if (productos.length === 0) {
      mostrarMensajeEnLista('Todavía no hay productos cargados.');
      return;
    }

    lista.innerHTML = '';

    // map transforma: entran objetos, salen elementos <li>.
    const items = productos.map(crearItem);
    items.forEach((item) => lista.appendChild(item));

  } catch (error) {
    mostrarMensajeEnLista('No se pudieron cargar los productos: ' + error.message);
  }
};

// ===== Borra un producto (DELETE) =====
const eliminarProducto = async (producto) => {
  // confirm devuelve true si toca Aceptar y false si toca Cancelar.
  // Borrar no se puede deshacer, asi que si cancela no hago nada.
  const seguro = confirm('¿Eliminar "' + producto.nombre + '"? No se puede deshacer.');
  if (!seguro) {
    return;
  }

  avisoAdmin.textContent = 'Eliminando...';

  try {
    // ?id=eq.14 significa "donde id es igual a 14". Sin ese filtro el
    // DELETE apuntaria a toda la tabla.
    const respuesta = await fetch(
      URL_SUPABASE + '/rest/v1/productos?id=eq.' + producto.id,
      {
        method: 'DELETE',
        headers: {
          ...cabeceras,
          // Sin Prefer, DELETE responde 204 vacio y no puedo saber si
          // borro algo. Con return=representation me devuelve las filas
          // que borro de verdad.
          Prefer: 'return=representation'
        }
      }
    );

    if (!respuesta.ok) {
      const detalle = await respuesta.text();
      throw new Error('HTTP ' + respuesta.status + ' - ' + detalle);
    }

    const borrados = await respuesta.json();

    // Si el RLS no deja borrar, Supabase NO da error: responde bien pero
    // con un array vacio. Este chequeo es el que lo detecta.
    if (borrados.length === 0) {
      throw new Error('la base no borró nada. ¿Está la política de DELETE?');
    }

    avisoAdmin.textContent = 'Producto eliminado: ' + borrados[0].nombre;
    traerProductos();

  } catch (error) {
    avisoAdmin.textContent = 'No se pudo eliminar: ' + error.message;
  }
};

// ===== Abrir y cerrar el formulario =====
// Una sola funcion para las dos cosas: toggle con true agrega la clase,
// con false la saca. Asi el boton y el form nunca quedan desparejos.
const mostrarFormulario = (abrir) => {
  formulario.classList.toggle('abierto', abrir);
  botonAgregar.textContent = abrir ? '× Cerrar' : '+ Agregar producto';
  botonAgregar.setAttribute('aria-expanded', abrir);

  if (abrir) {
    // Llevo el cursor al primer campo para poder escribir de una.
    document.querySelector('#producto-nombre').focus();
  }
};

botonAgregar.addEventListener('click', () => {
  mostrarFormulario(!formulario.classList.contains('abierto'));
});

// ===== Crear un producto nuevo (POST) =====
formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  // Los value de los inputs son texto, incluso los de type="number".
  // Las columnas int8 necesitan numeros de verdad: por eso Number().
  const nuevo = {
    nombre:       document.querySelector('#producto-nombre').value,
    categoria:    document.querySelector('#producto-categoria').value,
    especialidad: document.querySelector('#producto-especialidad').value,
    // Si el color queda vacio guardo null, como los productos sin color.
    color:        document.querySelector('#producto-color').value || null,
    descripcion:  document.querySelector('#producto-descripcion').value,
    precio_lista: Number(document.querySelector('#producto-precio-lista').value),
    precio_final: Number(document.querySelector('#producto-precio-final').value),
    stock:        Number(document.querySelector('#producto-stock').value),
    foto:         document.querySelector('#producto-foto').value
  };

  avisoAdmin.textContent = 'Guardando...';

  try {
    const respuesta = await fetch(URL_SUPABASE + '/rest/v1/productos', {
      method: 'POST',
      headers: {
        ...cabeceras,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify(nuevo)
    });

    if (!respuesta.ok) {
      const detalle = await respuesta.text();
      throw new Error('HTTP ' + respuesta.status + ' - ' + detalle);
    }

    const creados = await respuesta.json();
    avisoAdmin.textContent = 'Producto guardado: ' + creados[0].nombre;

    formulario.reset();
    mostrarFormulario(false);
    traerProductos();

  } catch (error) {
    // Si falla dejo el form abierto y con los datos, asi no hay que
    // escribir todo de nuevo.
    avisoAdmin.textContent = 'No se pudo guardar: ' + error.message;
  }
});

// Arranca: pinta la lista al abrir la pagina.
traerProductos();
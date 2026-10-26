// ===== Configuracion de Supabase =====
// La anon key es publica a proposito: lo que protege los datos son las
// politicas de RLS, no esconder esta clave.
const URL_SUPABASE = 'https://aeitezfpbptudmgmjvnw.supabase.co';
const KEY_SUPABASE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaXRlemZwYnB0dWRtZ21qdm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5NjIwNTEsImV4cCI6MjEwODUzODA1MX0.Oajx4tN_iXOprWIcKPIMHJXkEqFtBO5vEQjO4bs0Ar0';

const cabeceras = {
  apikey: KEY_SUPABASE,
  Authorization: 'Bearer ' + KEY_SUPABASE
};

const formatearPrecio = (n) => '$' + n.toLocaleString('es-AR');

// ===== Convierte UN producto en UNA fila de la tabla =====
const crearFila = (producto) => {
  const fila = document.createElement('tr');

  const celdaNombre = document.createElement('td');
  celdaNombre.textContent = producto.nombre;

  const celdaCategoria = document.createElement('td');
  celdaCategoria.textContent = producto.categoria;

  const celdaPrecio = document.createElement('td');
  celdaPrecio.textContent = formatearPrecio(producto.precio_final);

  const celdaStock = document.createElement('td');
  celdaStock.textContent = producto.stock;

  const celdaAcciones = document.createElement('td');
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'eliminar';
  boton.textContent = 'Eliminar';
  celdaAcciones.appendChild(boton);

  fila.append(celdaNombre, celdaCategoria, celdaPrecio, celdaStock, celdaAcciones);
  return fila;
};

// ===== Trae los productos y los pinta =====
const traerProductos = async () => {
  const cuerpo = document.querySelector('#tabla-productos');

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

    cuerpo.innerHTML = '';

    // map transforma: entran objetos, salen elementos <tr>.
    const filas = productos.map(crearFila);
    filas.forEach((fila) => cuerpo.appendChild(fila));

  } catch (error) {
    cuerpo.innerHTML = '';
    const fila = document.createElement('tr');
    const celda = document.createElement('td');
    celda.colSpan = 5;
    celda.textContent = 'No se pudieron cargar los productos: ' + error.message;
    fila.appendChild(celda);
    cuerpo.appendChild(fila);
  }
};

traerProductos();

// ===== Crear un producto nuevo (POST) =====
const formulario = document.querySelector('.form-panel');
const avisoGuardado = document.querySelector('#aviso-guardado');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  // Los value de los inputs son texto, incluso los de type="number".
  // Las columnas int8 necesitan numeros de verdad: por eso Number().
  const nuevo = {
    nombre:       document.querySelector('#producto-nombre').value,
    categoria:    document.querySelector('#producto-categoria').value,
    descripcion:  document.querySelector('#producto-descripcion').value,
    precio_lista: Number(document.querySelector('#producto-precio-lista').value),
    precio_final: Number(document.querySelector('#producto-precio-final').value),
    stock:        Number(document.querySelector('#producto-stock').value),
    foto:         document.querySelector('#producto-foto').value
  };

  avisoGuardado.textContent = 'Guardando...';

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
    avisoGuardado.textContent = 'Producto guardado: ' + creados[0].nombre;

    formulario.reset();
    traerProductos();

  } catch (error) {
    avisoGuardado.textContent = 'No se pudo guardar: ' + error.message;
  }
});
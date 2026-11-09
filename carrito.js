// ===== Pagina del carrito =====
// Los productos ya no estan escritos aca: salen de localStorage con
// leerCarrito(), que vive en carrito-guardado.js.

const formatearPrecio = (n) => '$' + n.toLocaleString('es-AR');

const lista = document.querySelector('.carrito-lista');
const botonFinalizar = document.querySelector('.resumen .boton-comprar');

// ===== Cambiar la cantidad con + y - =====
const cambiarCantidad = (id, cambio) => {
  const carrito = leerCarrito();

  // find devuelve el PRIMER producto cuyo id coincide. Uno solo, no un array.
  const item = carrito.find((p) => p.id === id);

  // No baja de 1: para sacarlo del todo esta el boton Eliminar.
  if (item.cantidad + cambio < 1) {
    return;
  }

  item.cantidad = item.cantidad + cambio;

  // El dato manda: primero guardo, despues vuelvo a pintar todo.
  guardarCarrito(carrito);
  pintarCarrito();
};

// ===== Sacar un producto =====
const eliminarDelCarrito = (id) => {
  // filter devuelve un array NUEVO con todos los que NO son el que borro.
  const quedan = leerCarrito().filter((p) => p.id !== id);

  guardarCarrito(quedan);
  pintarCarrito();
};

// ===== Convierte UN producto del carrito en UNA tarjeta =====
const crearItem = (item) => {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'item-carrito';

  const foto = document.createElement('img');
  foto.src = item.foto;
  foto.alt = item.nombre;

  // --- Nombre, detalle y botones de cantidad ---
  const datos = document.createElement('div');
  datos.className = 'item-datos';

  const nombre = document.createElement('h3');
  nombre.textContent = item.nombre;

  const detalle = document.createElement('p');
  detalle.className = 'item-detalle';
  detalle.textContent = item.detalle;

  const cantidad = document.createElement('div');
  cantidad.className = 'cantidad';

  const menos = document.createElement('button');
  menos.type = 'button';
  menos.setAttribute('aria-label', 'Quitar uno');
  menos.textContent = '−';
  menos.addEventListener('click', () => cambiarCantidad(item.id, -1));

  const numero = document.createElement('span');
  numero.textContent = item.cantidad;

  const mas = document.createElement('button');
  mas.type = 'button';
  mas.setAttribute('aria-label', 'Agregar uno');
  mas.textContent = '+';
  mas.addEventListener('click', () => cambiarCantidad(item.id, 1));

  cantidad.append(menos, numero, mas);
  datos.append(nombre, detalle, cantidad);

  // --- Precio y Eliminar ---
  const zonaPrecio = document.createElement('div');
  zonaPrecio.className = 'item-precio';

  const precio = document.createElement('p');
  precio.className = 'precio';
  precio.textContent = formatearPrecio(item.precio * item.cantidad);

  const eliminar = document.createElement('button');
  eliminar.type = 'button';
  eliminar.className = 'eliminar';
  eliminar.textContent = 'Eliminar';
  eliminar.addEventListener('click', () => eliminarDelCarrito(item.id));

  zonaPrecio.append(precio, eliminar);

  tarjeta.append(foto, datos, zonaPrecio);
  return tarjeta;
};

// ===== Pinta la lista y hace las cuentas del resumen =====
const pintarCarrito = () => {
  const carrito = leerCarrito();

  lista.innerHTML = '';

  if (carrito.length === 0) {
    const vacio = document.createElement('p');
    vacio.className = 'carrito-vacio';
    vacio.textContent = 'Tu carrito está vacío. ';

    const volver = document.createElement('a');
    volver.href = 'index.html';
    volver.textContent = 'Ver productos';

    vacio.appendChild(volver);
    lista.appendChild(vacio);
  } else {
    // map transforma: entran objetos, salen elementos <article>.
    carrito.map(crearItem).forEach((tarjeta) => lista.appendChild(tarjeta));
  }

  // El valor inicial 0 no es opcional: con el carrito vacio, reduce sin
  // valor inicial tira error en vez de dar cero.
  const total = carrito.reduce((acumulado, p) => acumulado + p.precio * p.cantidad, 0);
  const unidades = carrito.reduce((acumulado, p) => acumulado + p.cantidad, 0);

  document.querySelector('#subtotal').textContent = formatearPrecio(total);
  document.querySelector('#total').textContent = formatearPrecio(total);
  // Redondeo para arriba, igual que en la tienda.
  document.querySelector('.resumen .cuotas').textContent =
    '3 cuotas sin interés de ' + formatearPrecio(Math.ceil(total / 3));
  document.querySelector('.carrito-cantidad').textContent =
    unidades === 1 ? '1 producto' : unidades + ' productos';

  // Sin productos no hay nada que comprar.
  botonFinalizar.disabled = carrito.length === 0;
};

pintarCarrito();
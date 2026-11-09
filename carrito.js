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


// ===== Pago simulado =====
// No hay banco de verdad: setTimeout espera unos segundos para que se
// sienta como que "algo" esta procesando, y despues aprueba siempre.

const fondoPago = document.querySelector('#fondo-pago');
const fichaPago = fondoPago.querySelector('.ficha-pago');
const formPago = document.querySelector('#form-pago');
const estadoPago = document.querySelector('#estado-pago');
const botonPagar = formPago.querySelector('button[type="submit"]');
const zonaDireccion = document.querySelector('#zona-direccion');
const selectCuotas = document.querySelector('#pago-cuotas');

// Mientras "el banco" procesa no dejo cerrar la ventana: si la cierro a
// la mitad, el carrito se vaciaria igual sin que la persona vea el aviso.
let procesando = false;

// Atajo para leer un campo por su id, sin espacios de mas a los costados.
const valor = (id) => document.querySelector('#' + id).value.trim();

const calcularTotal = () =>
  leerCarrito().reduce((acumulado, p) => acumulado + p.precio * p.cantidad, 0);

// ===== Envio a domicilio o retiro en el local =====
const actualizarEntrega = () => {
  const esRetiro = document.querySelector('#entrega-retiro').checked;

  // La clase muestra u oculta la direccion y el aviso de retiro (CSS).
  formPago.classList.toggle('retiro', esRetiro);

  // Ocultarla no alcanza: sus campos son required y el navegador no
  // dejaria pagar. Un fieldset disabled los saca de la validacion.
  zonaDireccion.disabled = esRetiro;
};

document.querySelectorAll('input[name="entrega"]').forEach((opcion) => {
  opcion.addEventListener('change', actualizarEntrega);
});

// ===== Abrir y cerrar la ventana =====
const abrirPago = () => {
  const total = calcularTotal();
  document.querySelector('#pago-total').textContent = formatearPrecio(total);

  // Si ya se pago una vez, la ventana arranca de nuevo desde el formulario.
  fichaPago.classList.remove('aprobado');
  formPago.reset();
  estadoPago.textContent = '';

  // reset() vuelve a marcar "Envio a domicilio": acomodo la direccion.
  actualizarEntrega();

  // Las opciones de cuotas muestran cuanto se paga con el total de hoy.
  selectCuotas.options[0].textContent = '1 pago de ' + formatearPrecio(total);
  selectCuotas.options[1].textContent =
    '3 cuotas sin interés de ' + formatearPrecio(Math.ceil(total / 3));

  fondoPago.classList.add('abierta');
  document.body.style.overflow = 'hidden';
};

const cerrarPago = () => {
  if (procesando) {
    return;
  }
  fondoPago.classList.remove('abierta');
  document.body.style.overflow = '';
};

botonFinalizar.addEventListener('click', abrirPago);
fondoPago.querySelector('.cerrar-ficha').addEventListener('click', cerrarPago);

// Clic en lo oscuro de afuera tambien cierra, como en las fichas de la tienda.
fondoPago.addEventListener('click', (evento) => {
  if (evento.target === fondoPago) cerrarPago();
});

document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') cerrarPago();
});

// ===== Comprobante =====
// Una linea <li> con un titulo en negrita y el dato al lado.
const agregarLinea = (lista, titulo, texto) => {
  const linea = document.createElement('li');
  const fuerte = document.createElement('strong');
  fuerte.textContent = titulo + ': ';
  linea.append(fuerte, texto);
  lista.appendChild(linea);
};

const armarComprobante = (total) => {
  const lista = document.querySelector('#comprobante');
  lista.innerHTML = '';

  agregarLinea(lista, 'Comprador', valor('comprador-nombre') + ' (DNI ' + valor('comprador-dni') + ')');
  agregarLinea(lista, 'Contacto', valor('comprador-email') + ' · ' + valor('comprador-telefono'));

  if (document.querySelector('#entrega-retiro').checked) {
    agregarLinea(lista, 'Entrega', 'Retiro en el local, te avisamos por email');
  } else {
    // El piso es opcional: solo lo sumo si escribieron algo.
    let direccion = valor('envio-calle') + ' ' + valor('envio-numero');
    if (valor('envio-piso')) {
      direccion += ', ' + valor('envio-piso');
    }
    direccion += ' · ' + valor('envio-ciudad') + ', ' + valor('envio-provincia') +
      ' (CP ' + valor('envio-cp') + ')';
    agregarLinea(lista, 'Envío a', direccion);
  }

  // De la tarjeta muestro solo los ultimos 4 numeros, como los tickets reales.
  const ultimos = valor('pago-numero').slice(-4);
  const cuotas = selectCuotas.value === '3'
    ? '3 cuotas de ' + formatearPrecio(Math.ceil(total / 3))
    : '1 pago';
  agregarLinea(lista, 'Pago', 'Tarjeta terminada en ' + ultimos + ', ' + cuotas);

  agregarLinea(lista, 'Total', formatearPrecio(total));
};

// ===== Pagar =====
formPago.addEventListener('submit', (evento) => {
  // Si llegamos aca, el navegador ya reviso los required y los pattern:
  // con algun campo mal, el submit ni siquiera se dispara.
  evento.preventDefault();

  procesando = true;
  botonPagar.disabled = true;
  estadoPago.textContent = 'Procesando el pago...';

  setTimeout(() => {
    // Date.now() son los milisegundos desde 1970: cambia todo el tiempo,
    // asi que sus ultimos 6 numeros sirven como numero de pedido.
    const numeroPedido = 'MO-' + String(Date.now()).slice(-6);
    document.querySelector('#numero-pedido').textContent = numeroPedido;

    // El comprobante se arma ANTES de vaciar el carrito: despues el total ya seria 0.
    armarComprobante(calcularTotal());

    // Pago hecho: el carrito queda vacio, en localStorage y en pantalla.
    guardarCarrito([]);
    pintarCarrito();

    fichaPago.classList.add('aprobado');
    procesando = false;
    botonPagar.disabled = false;
  }, 2000);
});

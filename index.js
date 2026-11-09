// ===== Configuracion de Supabase =====
// La misma URL y la misma anon key que en admin.js. La tienda solo lee
// (GET): lo que la protege es el RLS, no esconder la clave.
const URL_SUPABASE = 'https://aeitezfpbptudmgmjvnw.supabase.co';
const KEY_SUPABASE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlaXRlemZwYnB0dWRtZ21qdm53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5NjIwNTEsImV4cCI6MjEwODUzODA1MX0.Oajx4tN_iXOprWIcKPIMHJXkEqFtBO5vEQjO4bs0Ar0';

const cabeceras = {
  apikey: KEY_SUPABASE,
  Authorization: 'Bearer ' + KEY_SUPABASE
};

const formatearPrecio = (n) => '$' + n.toLocaleString('es-AR');

// ===== Flechas del carrusel =====
// Envuelven a la grilla, no a las tarjetas. Por eso pueden armarse antes
// de que lleguen los productos: las tarjetas se meten despues adentro.
document.querySelectorAll('.grilla').forEach(function (grilla) {
  const marco = document.createElement('div');
  marco.className = 'marco-carrusel';
  grilla.parentNode.insertBefore(marco, grilla);
  marco.appendChild(grilla);

  [['izq', '\u2039', -300, 'Ver productos anteriores'],
   ['der', '\u203A',  300, 'Ver más productos']].forEach(function (f) {
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'flecha flecha-' + f[0];
    boton.textContent = f[1];
    boton.setAttribute('aria-label', f[3]);
    boton.addEventListener('click', function () {
      grilla.scrollBy({ left: f[2], behavior: 'smooth' });
    });
    marco.appendChild(boton);
  });
});

// ===== Fichas de producto =====
// Que ficha abre cada categoria. Yerbas y termos no tienen ficha propia,
// asi que no estan en la lista y sus tarjetas no abren nada.
const fichasPorCategoria = {
  'mates-madera': document.getElementById('fondo-ficha'),
  'bombillas-alpaca': document.getElementById('fondo-ficha-bombilla')
};

// Antes habia dos bloques casi iguales, uno para mates y otro para
// bombillas. Lo unico que cambiaba era la ficha: ahora llega por parametro.
const abrirFicha = (fondo, tarjeta) => {
  const nombre = tarjeta.querySelector('h3').textContent;
  const foto = fondo.querySelector('.ficha-foto');

  foto.src = tarjeta.querySelector('img').src;
  foto.alt = nombre;
  foto.dataset.ampliada = tarjeta.dataset.ampliada || '';

  fondo.querySelector('.ficha-titulo').textContent = nombre;
  fondo.querySelector('.ficha-precio').textContent = tarjeta.querySelector('.precio').textContent;
  fondo.querySelector('.ficha-especialidad').textContent = tarjeta.dataset.especialidad || '';

  // Solo la ficha del mate tiene .ficha-color (la bombilla dice "Plateado"
  // fijo). Si no lo chequeo, en la bombilla querySelector da null y se rompe.
  const color = fondo.querySelector('.ficha-color');
  if (color) {
    color.textContent = tarjeta.dataset.color || '';
  }

  fondo.classList.add('abierta');
  document.body.style.overflow = 'hidden';
};

function cerrarFicha() {
  document.querySelectorAll('.fondo-ficha.abierta').forEach(function (fondo) {
    fondo.classList.remove('abierta');
  });
  document.body.style.overflow = '';
}

document.querySelectorAll('.fondo-ficha').forEach(function (fondo) {
  fondo.querySelector('.cerrar-ficha').addEventListener('click', cerrarFicha);

  fondo.addEventListener('click', function (evento) {
    if (evento.target === fondo) cerrarFicha();
  });
});

// ===== Visor de la foto grande =====
const fondoVisor = document.getElementById('fondo-visor');
const visorFoto = fondoVisor.querySelector('.visor-foto');

// Si la foto grande todavia no existe, el navegador dispara 'error'
// y mostramos la del catalogo en su lugar. Asi el visor abre siempre.
visorFoto.addEventListener('error', function () {
  const respaldo = visorFoto.dataset.respaldo;
  if (respaldo && visorFoto.src !== respaldo) visorFoto.src = respaldo;
});

document.querySelectorAll('.fondo-ficha .ficha-foto').forEach(function (foto) {
  foto.addEventListener('click', function () {
    visorFoto.dataset.respaldo = foto.src;
    visorFoto.alt = foto.alt;
    visorFoto.src = foto.dataset.ampliada || foto.src;

    fondoVisor.classList.add('abierta');
  });
});

function cerrarVisor() {
  fondoVisor.classList.remove('abierta');
}

fondoVisor.querySelector('.cerrar-visor').addEventListener('click', cerrarVisor);

fondoVisor.addEventListener('click', function (evento) {
  if (evento.target === fondoVisor) cerrarVisor();
});

// Escape cierra primero la foto grande; recien despues la ficha.
document.addEventListener('keydown', function (evento) {
  if (evento.key !== 'Escape') return;

  if (fondoVisor.classList.contains('abierta')) {
    cerrarVisor();
  } else {
    cerrarFicha();
  }
});

// ===== Convierte UN producto en UNA tarjeta <article> =====
const crearTarjeta = (producto) => {
  const tarjeta = document.createElement('article');

  // Los data-* son los mismos que antes estaban escritos en el HTML:
  // la ficha y el visor los leen de ahi. Solo los pongo si hay dato,
  // porque dataset.color = null guardaria el texto "null".
  if (producto.especialidad) {
    tarjeta.dataset.especialidad = producto.especialidad;
  }
  if (producto.color) {
    tarjeta.dataset.color = producto.color;
  }
  if (producto.foto_grande) {
    tarjeta.dataset.ampliada = producto.foto_grande;
  }

  const foto = document.createElement('img');
  foto.src = producto.foto;
  foto.alt = producto.nombre;
  foto.loading = 'lazy';

  const titulo = document.createElement('h3');
  titulo.textContent = producto.nombre;

  tarjeta.append(foto, titulo);

  // El precio tachado va solo si hay descuento. El cartel de OFERTA sale
  // solo con el CSS (article:has(.precio-anterior)), no hay que tocarlo.
  if (producto.precio_lista > producto.precio_final) {
    const anterior = document.createElement('p');
    anterior.className = 'precio-anterior';
    anterior.textContent = formatearPrecio(producto.precio_lista);
    tarjeta.appendChild(anterior);
  }

  const precio = document.createElement('p');
  precio.className = 'precio';
  precio.textContent = formatearPrecio(producto.precio_final);

  // Redondeo para arriba: con 3 cuotas de 22.666 faltarian 2 pesos.
  const cuotas = document.createElement('p');
  cuotas.className = 'cuotas';
  cuotas.textContent = '3 cuotas sin interés de ' + formatearPrecio(Math.ceil(producto.precio_final / 3));

  // Ahora es un <button> y no un <a>: no lleva a otra pagina, va a hacer
  // algo aca mismo. Lo que hace lo agregamos en el paso del carrito.
  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'boton-comprar';
  boton.textContent = 'Agregar al carrito';

  tarjeta.append(precio, cuotas, boton);

  // Solo las tarjetas con ficha escuchan el clic.
  const fondo = fichasPorCategoria[producto.categoria];
  if (fondo) {
    tarjeta.addEventListener('click', (evento) => {
      // El clic en el boton no tiene que abrir la ficha.
      if (evento.target.closest('.boton-comprar')) return;
      abrirFicha(fondo, tarjeta);
    });
  }

  return tarjeta;
};

// ===== Trae los productos (GET) y los reparte por seccion =====
const cargarCatalogo = async () => {
  const aviso = document.querySelector('#aviso-catalogo');
  aviso.textContent = 'Cargando productos...';

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

    // Cada section tiene de id el mismo texto que la columna categoria
    // (mates-madera, yerbas...). Asi se cual producto va en cual grilla.
    document.querySelectorAll('.catalogo section').forEach((seccion) => {
      const grilla = seccion.querySelector('.grilla');
      // Mates de calabaza no tiene grilla (dice "Proximamente"): la salteo.
      if (!grilla) return;

      const deEstaSeccion = productos.filter((producto) => producto.categoria === seccion.id);
      deEstaSeccion.map(crearTarjeta).forEach((tarjeta) => grilla.appendChild(tarjeta));
    });

    aviso.textContent = '';

  } catch (error) {
    aviso.textContent = 'No se pudieron cargar los productos: ' + error.message;
  }
};

cargarCatalogo();
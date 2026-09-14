/* ===== Carrito de Mates_Oliver ===== */

/* El carrito se guarda en el navegador con localStorage, asi no se pierde
   al cambiar de pagina ni al cerrar el navegador. */
const CLAVE = "carrito-mates-oliver";

function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch (error) {
    return [];
  }
}

function guardarCarrito(items) {
  localStorage.setItem(CLAVE, JSON.stringify(items));
}

function agregarProducto(nombre, precio) {
  const items = leerCarrito();
  const yaEsta = items.find(function (p) { return p.nombre === nombre; });

  if (yaEsta) {
    yaEsta.cantidad = yaEsta.cantidad + 1;
  } else {
    items.push({ nombre: nombre, precio: precio, cantidad: 1 });
  }

  guardarCarrito(items);
}

function eliminarProducto(nombre) {
  const items = leerCarrito().filter(function (p) { return p.nombre !== nombre; });
  guardarCarrito(items);
}

function contarProductos() {
  let total = 0;
  leerCarrito().forEach(function (p) { total = total + p.cantidad; });
  return total;
}

function mostrarPrecio(precio) {
  if (precio === null) {
    return "Consultar precio";
  }
  return "$" + precio;
}

/* ===== Contador al lado de "Carrito" en el menu ===== */
function actualizarContador() {
  const cantidad = contarProductos();

  document.querySelectorAll('header nav a[href="carrito.html"]').forEach(function (link) {
    if (cantidad > 0) {
      link.textContent = "Carrito (" + cantidad + ")";
    } else {
      link.textContent = "Carrito";
    }
  });
}

/* ===== Botones "Agregar al carrito" ===== */
function prepararBotonesAgregar() {
  document.querySelectorAll(".agregar").forEach(function (boton) {
    boton.addEventListener("click", function () {
      const nombre = boton.dataset.nombre;
      const precio = boton.dataset.precio ? Number(boton.dataset.precio) : null;

      agregarProducto(nombre, precio);
      actualizarContador();

      /* Aviso corto para que se note que hizo algo */
      boton.textContent = "Agregado";
      boton.classList.add("agregado");

      setTimeout(function () {
        boton.textContent = "Agregar al carrito";
        boton.classList.remove("agregado");
      }, 1200);
    });
  });
}

/* ===== Tabla de la pagina del carrito ===== */
function dibujarCarrito() {
  const cuerpo = document.querySelector("#carrito-cuerpo");
  if (!cuerpo) {
    return; /* No estamos en carrito.html */
  }

  const contenedorTabla = document.querySelector(".tabla-scroll");
  const parrafoTotal = document.querySelector("#carrito-total");
  const avisoVacio = document.querySelector("#carrito-vacio");
  const items = leerCarrito();

  cuerpo.textContent = ""; /* siempre vaciar antes de volver a dibujar */

  if (items.length === 0) {
    contenedorTabla.hidden = true;
    parrafoTotal.hidden = true;
    avisoVacio.hidden = false;
    return;
  }

  contenedorTabla.hidden = false;
  parrafoTotal.hidden = false;
  avisoVacio.hidden = true;

  let total = 0;
  let faltanPrecios = false;

  items.forEach(function (p) {
    if (p.precio === null) {
      faltanPrecios = true;
    } else {
      total = total + p.precio * p.cantidad;
    }

    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = p.nombre;

    const celdaCantidad = document.createElement("td");
    celdaCantidad.textContent = p.cantidad;

    const celdaPrecio = document.createElement("td");
    celdaPrecio.textContent = mostrarPrecio(p.precio);

    const celdaAccion = document.createElement("td");
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "eliminar";
    boton.textContent = "Eliminar";
    boton.addEventListener("click", function () {
      eliminarProducto(p.nombre);
      dibujarCarrito();
      actualizarContador();
    });
    celdaAccion.appendChild(boton);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCantidad);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaAccion);
    cuerpo.appendChild(fila);
  });

  parrafoTotal.textContent = "Total: $" + total;
  if (faltanPrecios) {
    parrafoTotal.textContent += " (hay productos a consultar)";
  }
}

/* ===== Arranque ===== */
document.addEventListener("DOMContentLoaded", function () {
  actualizarContador();
  prepararBotonesAgregar();
  dibujarCarrito();
});

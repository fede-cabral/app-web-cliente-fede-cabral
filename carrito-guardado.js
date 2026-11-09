// ===== Carrito guardado en el navegador (localStorage) =====
// Este archivo lo cargan todas las paginas de la tienda ANTES de su
// propio .js. Asi index.js y carrito.js usan las mismas tres funciones
// y el numerito del header se ve en todas las pestañas.

// El nombre con el que se guarda en localStorage. Con un nombre propio
// no se pisa con lo que guarde otra pagina en el mismo localhost.
const CLAVE_CARRITO = 'carrito-mates-oliver';

// localStorage solo guarda texto. Por eso al leer hay que convertir
// el texto de vuelta en un array con JSON.parse.
const leerCarrito = () => {
  const guardado = localStorage.getItem(CLAVE_CARRITO);

  // La primera vez no hay nada guardado: getItem devuelve null.
  if (!guardado) {
    return [];
  }

  try {
    return JSON.parse(guardado);
  } catch (error) {
    // Si alguien lo edito a mano y quedo roto, arrancamos de cero
    // en vez de que se caiga toda la pagina.
    return [];
  }
};

// Y al guardar, al reves: el array pasa a texto con JSON.stringify.
const guardarCarrito = (carrito) => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContador();
};

// El numerito del header cuenta unidades, no productos distintos:
// 2 mates iguales son 2.
const actualizarContador = () => {
  const unidades = leerCarrito().reduce((acumulado, item) => acumulado + item.cantidad, 0);

  document.querySelectorAll('.carrito-numero').forEach((numero) => {
    numero.textContent = unidades;
  });
};

// Al abrir cualquier pagina, el numero arranca con lo que ya estaba guardado.
actualizarContador();
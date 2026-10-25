    // El carrito en JavaScript: cada producto es un objeto con sus datos.
    const productos = [
      { id: 1, nombre: 'Mate Comando claro',          precio: 68000, cantidad: 1 },
      { id: 2, nombre: 'Bombilla Alpaca paracaidista', precio: 55000, cantidad: 1 }
    ];

    const formatearPrecio = (n) => '$' + n.toLocaleString('es-AR');

    // Ahora la cuenta va adentro de una funcion, porque la vamos a necesitar
    // cada vez que cambie una cantidad, no una sola vez al cargar.
    const actualizar = () => {
      const total = productos.reduce((acumulado, p) => acumulado + p.precio * p.cantidad, 0);

      document.querySelector('#subtotal').textContent = formatearPrecio(total);
      document.querySelector('#total').textContent = formatearPrecio(total);
      document.querySelector('.cuotas').textContent =
        '3 cuotas sin interés de ' + formatearPrecio(Math.round(total / 3));
      document.querySelector('.carrito-cantidad').textContent =
        productos.length === 1 ? '1 producto' : productos.length + ' productos';
    };

    // Un escuchador de clicks por cada boton de + y -.
    document.querySelectorAll('.cantidad button').forEach((boton) => {
      boton.addEventListener('click', () => {

        // closest sube desde el boton hasta la tarjeta que lo contiene.
        const tarjeta = boton.closest('.item-carrito');

        // find devuelve el PRIMER producto cuyo id coincide. Uno solo, no un array.
        const producto = productos.find((p) => p.id === Number(tarjeta.dataset.id));

        if (boton.getAttribute('aria-label') === 'Agregar uno') {
          producto.cantidad = producto.cantidad + 1;
        } else if (producto.cantidad > 1) {
          producto.cantidad = producto.cantidad - 1;
        }

        // Actualizamos lo de esta tarjeta...
        tarjeta.querySelector('.cantidad span').textContent = producto.cantidad;
        tarjeta.querySelector('.precio').textContent =
          formatearPrecio(producto.precio * producto.cantidad);

        // ...y volvemos a hacer la cuenta del resumen.
        actualizar();
      });
    });
    // Boton Eliminar: saca el producto del carrito.
    document.querySelectorAll('.eliminar').forEach((boton) => {
      boton.addEventListener('click', () => {

        const tarjeta = boton.closest('.item-carrito');
        const id = Number(tarjeta.dataset.id);

        // filter devuelve un array NUEVO con los que cumplen la condicion.
        // Nos quedamos con todos los que NO son el que estamos borrando.
        const quedan = productos.filter((p) => p.id !== id);

        // Vaciamos el array y le volvemos a meter lo que quedo.
        productos.length = 0;
        quedan.forEach((p) => productos.push(p));

        // Sacamos la tarjeta de la pantalla y rehacemos la cuenta.
        tarjeta.remove();
        actualizar();
      });
    });
    actualizar();

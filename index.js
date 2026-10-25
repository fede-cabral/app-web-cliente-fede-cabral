
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

  const fondoFicha = document.getElementById('fondo-ficha');

 document.querySelectorAll('#mates-madera article[data-especialidad]').forEach(function (tarjeta) {
    tarjeta.addEventListener('click', function (evento) {
      if (evento.target.closest('.boton-comprar')) return;

      const nombre = tarjeta.querySelector('h3').textContent;

      fondoFicha.querySelector('.ficha-foto').src = tarjeta.querySelector('img').src;
      fondoFicha.querySelector('.ficha-foto').alt = nombre;
      fondoFicha.querySelector('.ficha-titulo').textContent = nombre;
      fondoFicha.querySelector('.ficha-precio').textContent = tarjeta.querySelector('.precio').textContent;
      fondoFicha.querySelector('.ficha-color').textContent = tarjeta.dataset.color;
      fondoFicha.querySelector('.ficha-especialidad').textContent = tarjeta.dataset.especialidad;
      fondoFicha.querySelector('.ficha-foto').dataset.ampliada = tarjeta.dataset.ampliada || '';

      fondoFicha.classList.add('abierta');
      document.body.style.overflow = 'hidden';
    });
  });

    const fondoFichaBombilla = document.getElementById('fondo-ficha-bombilla');

  document.querySelectorAll('#bombillas-alpaca article[data-especialidad]').forEach(function (tarjeta) {
    tarjeta.addEventListener('click', function (evento) {
      if (evento.target.closest('.boton-comprar')) return;

      const nombre = tarjeta.querySelector('h3').textContent;

      fondoFichaBombilla.querySelector('.ficha-foto').src = tarjeta.querySelector('img').src;
      fondoFichaBombilla.querySelector('.ficha-foto').alt = nombre;
      fondoFichaBombilla.querySelector('.ficha-titulo').textContent = nombre;
      fondoFichaBombilla.querySelector('.ficha-precio').textContent = tarjeta.querySelector('.precio').textContent;
      fondoFichaBombilla.querySelector('.ficha-especialidad').textContent = tarjeta.dataset.especialidad;
      fondoFichaBombilla.querySelector('.ficha-foto').dataset.ampliada = tarjeta.dataset.ampliada || '';

      fondoFichaBombilla.classList.add('abierta');
      document.body.style.overflow = 'hidden';
    });
  });
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
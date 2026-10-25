    // Todavia no hay servidor: frenamos el envio y avisamos.
    document.querySelector('.form-sesion').addEventListener('submit', function (evento) {
      evento.preventDefault();
      document.querySelector('.aviso-sesion').textContent =
        'El ingreso todavía no funciona. Falta conectar el servidor.';
    });
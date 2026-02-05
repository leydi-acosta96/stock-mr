const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const codigoIngresado = document.getElementById("codigoUsuario").value.trim();
  const error = document.getElementById("errorLogin");
  error.textContent = "";

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      console.log("DATA COMPLETA:", data);

      const lista = data.usuarios; // 👈 AJUSTAR SI EL NOMBRE CAMBIA

      if (!lista) {
        error.textContent = "Error: hoja usuarios no encontrada";
        return;
      }

      const usuario = lista.find(u => u.codigo === codigoIngresado);

      if (!usuario) {
        error.textContent = "Código inválido";
        return;
      }

      sessionStorage.setItem("usuario", JSON.stringify({
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol,
        codigo: usuario.codigo
      }));

      if (usuario.rol === "admin") {
        window.location.href = "dashboard_admin.html";
      } else if (usuario.rol === "emprendedora") {
        window.location.href = "productos.html";
      } else {
        window.location.href = "ventas.html";
      }
    })
    .catch(err => {
      console.error(err);
      error.textContent = "Error de conexión";
    });
});

const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const codigoIngresado = document.getElementById("codigoUsuario").value.trim();
  const error = document.getElementById("errorLogin");
  error.textContent = "";

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {

      console.log("RESPUESTA SHEETY:", data);

      const listaUsuarios = data.usuarios;

      if (!listaUsuarios) {
        error.textContent = "Error: no se encontró la hoja usuarios";
        return;
      }

      const usuario = listaUsuarios.find(
        u => u.codigoAcceso === codigoIngresado
      );

      if (!usuario) {
        error.textContent = "Código inválido";
        return;
      }

      // ✅ GUARDAMOS SESIÓN
      sessionStorage.setItem("usuario", JSON.stringify({
        id: usuario.id,
        nombre: usuario.nombreUsuario,
        rol: usuario.rol,
        codigo: usuario.codigoAcceso
      }));

      // 🚀 REDIRECCIÓN POR ROL
      if (usuario.rol === "admin") {
        window.location.href = "dashboard_admin.html";
      } else if (usuario.rol === "emprendedora") {
        window.location.href = "productos.html";
      } else if (usuario.rol === "vendedora") {
        window.location.href = "ventas.html";
      }

    })
    .catch(err => {
      console.error(err);
      error.textContent = "Error de conexión con el sistema";
    });
});

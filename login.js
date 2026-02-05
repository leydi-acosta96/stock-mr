const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();

    fetch(API_URL, {
      headers: {
        "Authorization": "Bearer mr12#"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Usuarios:", data.usuarios);

        const usuario = data.usuarios.find(
          u => u.codigoAcceso === codigo
        );

        if (!usuario) {
          alert("Código inválido");
          return;
        }

        // Guardar sesión
        sessionStorage.setItem("usuario", JSON.stringify(usuario));

        // Redirigir según rol
        if (usuario.rol === "admin") {
          window.location.href = "dashboard_admin.html";
        } else if (usuario.rol === "emprendedora") {
          window.location.href = "dashboard_emprendedora.html";
        } else if (usuario.rol === "vendedora") {
          window.location.href = "dashboard_vendedora.html";
        } else {
          alert("Rol no reconocido");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error de conexión con el sistema");
      });
  });

});

// Botón volver
function volverInicio() {
  window.location.href = "index.html";
}

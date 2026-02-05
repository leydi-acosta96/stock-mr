const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const usuarioInput = document.getElementById("usuario").value.trim();
  const rolInput = document.getElementById("rol").value;
  const destino = localStorage.getItem("destino");

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const usuario = data.usuarios.find(u =>
        u.usuario === usuarioInput &&
        u.rol === rolInput &&
        u.estado === "Activo"
      );

      if (!usuario) {
        alert("Credenciales inválidas o usuario inactivo");
        return;
      }

      // Guardar sesión
      localStorage.setItem("rol", usuario.rol);
      localStorage.setItem("usuario", usuario.usuario);

      // Redirección según rol y acción
      redirigir(usuario.rol, destino);
    });
});

function redirigir(rol, destino) {
  if (destino === "emprendedoras" && rol === "admin") {
    window.location.href = "emprendedoras.html";
  }
  else if (destino === "productos" && (rol === "admin" || rol === "emprendedora")) {
    window.location.href = "productos.html";
  }
  else if (destino === "ventas") {
    window.location.href = "ventas.html";
  }
  else if (destino === "reportes" && rol === "admin") {
    window.location.href = "reportes.html";
  }
  else {
    alert("No tienes permiso para acceder a esta sección");
    window.location.href = "index.html";
  }
}

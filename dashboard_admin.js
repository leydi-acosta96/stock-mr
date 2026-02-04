const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario || usuario.rol !== "admin") {
  alert("Acceso no autorizado");
  window.location.href = "login.html";
}

document.getElementById("bienvenidaAdmin").textContent =
  `Bienvenida, ${usuario.nombre} (Administrador)`;

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

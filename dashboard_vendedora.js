// Recuperar sesión
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

// Validar acceso
if (!usuario || usuario.rol !== "vendedora") {
  alert("Acceso no autorizado");
  window.location.href = "login.html";
}

// Mostrar bienvenida
document.getElementById("bienvenidaVendedora").textContent =
  `Hola ${usuario.nombre} — Vendedora`;

// Cerrar sesión
function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario || usuario.rol !== "emprendedora") {
  alert("Acceso no autorizado");
  window.location.href = "login.html";
}

document.getElementById("bienvenidaEmprendedora").textContent =
  `Hola ${usuario.nombre}`;

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

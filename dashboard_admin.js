const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario || usuario.rol !== "admin") {
  alert("Acceso restringido");
  window.location.href = "index.html";
}

document.getElementById("nombreAdmin").textContent = usuario.nombreUsuario;

function ir(pagina) {
  window.location.href = pagina;
}

function cerrarSesion() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

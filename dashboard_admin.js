// Obtener usuario desde sessionStorage
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

// Validar acceso
if (!usuario || usuario.rol !== "admin") {
  alert("Acceso restringido");
  window.location.href = "index.html";
}

// Mostrar nombre del administrador si existe el elemento
const nombreAdmin = document.getElementById("nombreAdmin");
if (nombreAdmin && usuario) {
  nombreAdmin.textContent = usuario.nombreUsuario;
}

// Cerrar sesión
const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });
}

// Cambiar secciones del dashboard
const botones = document.querySelectorAll(".sidebar button");
const secciones = document.querySelectorAll(".section");

botones.forEach(boton => {
  boton.addEventListener("click", () => {

    // Quitar clase active a todos los botones
    botones.forEach(btn => btn.classList.remove("active"));
    boton.classList.add("active");

    // Ocultar todas las secciones
    secciones.forEach(sec => sec.classList.remove("active"));

    // Mostrar sección seleccionada
    const id = boton.getAttribute("data-section");
    const seccionActiva = document.getElementById(id);

    if (seccionActiva) {
      seccionActiva.classList.add("active");
    }

  });
});

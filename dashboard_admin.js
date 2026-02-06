// ===============================
// DASHBOARD ADMINISTRADOR
// ===============================

// Obtener usuario desde la sesión
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

// 🔒 Validación de acceso
if (!usuario || usuario.rol !== "admin") {
  alert("Acceso restringido");
  window.location.href = "index.html";
}

// Mostrar nombre del administrador
const nombreAdmin = document.getElementById("nombreAdmin");
if (nombreAdmin) {
  nombreAdmin.textContent = `👋 ${usuario.nombreUsuario}`;
}

// Cerrar sesión
const btnLogout = document.getElementById("btnLogout");
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });
}

// Navegación del menú lateral
const botonesMenu = document.querySelectorAll(".sidebar button");
const secciones = document.querySelectorAll(".section");

botonesMenu.forEach(boton => {
  boton.addEventListener("click", () => {
    const target = boton.dataset.section;

    // Quitar estado activo de todos los botones
    botonesMenu.forEach(b => b.classList.remove("active"));
    boton.classList.add("active");

    // Ocultar todas las secciones
    secciones.forEach(sec => sec.classList.remove("active"));

    // Mostrar la sección seleccionada
    const seccionActiva = document.getElementById(target);
    if (seccionActiva) {
      seccionActiva.classList.add("active");
    }
  });
});

// Activar por defecto el botón Inicio
document.querySelector('.sidebar button[data-section="inicio"]')?.classList.add("active");

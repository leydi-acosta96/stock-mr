const usuario = JSON.parse(sessionStorage.getItem("usuario"));

// 🔒 Seguridad real
if (!usuario || usuario.rol !== "admin") {
  alert("Acceso restringido");
  window.location.href = "index.html";
}

// Mostrar nombre del admin
document.getElementById("nombreAdmin").textContent =
  `👋 ${usuario.nombreUsuario}`;

// 🔹 Cerrar sesión
document.getElementById("btnLogout").addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});

// 🔹 Navegación del menú lateral
const botonesMenu = document.querySelectorAll(".sidebar button");
const secciones = document.querySelectorAll(".section");

botonesMenu.forEach(boton => {
  boton.addEventListener("click", () => {
    const target = boton.dataset.section;

    secciones.forEach(sec => sec.classList.remove("active"));

    document.getElementById(target).classList.add("active");
  });
});

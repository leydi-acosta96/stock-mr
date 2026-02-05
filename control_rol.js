const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario) {
  // Si no hay sesión, oculta todo
  document.querySelectorAll("button").forEach(btn => btn.style.display = "none");
} else {
  const rol = usuario.rol;

  // ADMIN
  if (rol === "admin") {
    // ve todo
  }

  // EMPRENDEDORA
  if (rol === "emprendedora") {
    document.getElementById("btnEmprendedoras")?.remove();
    document.getElementById("btnReportes")?.remove();
  }

  // VENDEDORA
  if (rol === "vendedora") {
    document.getElementById("btnEmprendedoras")?.remove();
    document.getElementById("btnProductos")?.remove();
    document.getElementById("btnReportes")?.remove();
  }
}

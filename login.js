const rol = usuario.rol; // admin, emprendedora, vendedora
const destino = localStorage.getItem("destino");

if (destino === "productos" && (rol === "admin" || rol === "emprendedora")) {
  window.location.href = "productos.html";
}
else if (destino === "reportes" && rol === "admin") {
  window.location.href = "reportes.html";
}
else {
  alert("No tienes permiso para acceder a esta sección");
}

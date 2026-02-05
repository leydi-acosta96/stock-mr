// Obtener usuario de la sesión
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

// Referencias a botones
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");

const btnEmprendedoras = document.getElementById("btnEmprendedoras");
const btnProductos = document.getElementById("btnProductos");
const btnVentas = document.getElementById("btnVentas");
const btnReportes = document.getElementById("btnReportes");

const mensajePermiso = document.getElementById("mensajePermiso");

// 🔹 ESTADO INICIAL: ocultar todo
if (btnEmprendedoras) btnEmprendedoras.style.display = "none";
if (btnProductos) btnProductos.style.display = "none";
if (btnVentas) btnVentas.style.display = "none";
if (btnReportes) btnReportes.style.display = "none";
if (btnLogout) btnLogout.style.display = "none";

// 🔹 SI NO HAY SESIÓN
if (!usuario) {
  if (btnLogin) btnLogin.style.display = "inline-block";
  if (mensajePermiso) {
    mensajePermiso.textContent = "Inicia sesión para acceder al sistema.";
  }
  console.log("Sin sesión activa");
  return;
}

// 🔹 SI HAY SESIÓN
if (btnLogin) btnLogin.style.display = "none";
if (btnLogout) btnLogout.style.display = "inline-block";

mensajePermiso.textContent = `Bienvenida/o ${usuario.nombreUsuario}`;

// 🔹 ROLES
switch (usuario.rol) {
  case "admin":
    btnEmprendedoras.style.display = "inline-block";
    btnProductos.style.display = "inline-block";
    btnVentas.style.display = "inline-block";
    btnReportes.style.display = "inline-block";
    break;

  case "emprendedora":
    btnProductos.style.display = "inline-block";
    btnVentas.style.display = "inline-block";
    mensajePermiso.textContent += " (Emprendedora)";
    break;

  case "vendedora":
    btnVentas.style.display = "inline-block";
    mensajePermiso.textContent += " (Vendedora)";
    break;

  default:
    mensajePermiso.textContent = "Rol no reconocido";
}

// 🔹 CERRAR SESIÓN
btnLogout.addEventListener("click", () => {
  sessionStorage.clear();
  window.location.href = "index.html";
});

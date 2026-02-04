const API_USUARIOS = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const mensajeAccion = document.getElementById("mensajeAccion");
  const errorLogin = document.getElementById("errorLogin");

  // 1️⃣ Obtener acción solicitada desde index
  const accion = localStorage.getItem("accionSistema");

  // Mensajes según acción
  const mensajes = {
    emprendedoras: "Acceso solo para ADMINISTRADOR",
    productos: "Acceso para EMPRENDEDORA o ADMIN",
    ventas: "Acceso para VENDEDORA, EMPRENDEDORA o ADMIN",
    reportes: "Acceso exclusivo para ADMINISTRADOR"
  };

  if (accion && mensajes[accion]) {
    mensajeAccion.textContent = mensajes[accion];
  }

  // 2️⃣ Submit del login
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorLogin.textContent = "";

    const codigo = document.getElementById("codigo").value.trim();

    if (!codigo) {
      errorLogin.textContent = "Debe ingresar un código";
      return;
    }

    try {
      const res = await fetch(API_USUARIOS);
      const data = await res.json();

      const usuario = data.usuarios.find(u => u.codigo === codigo);

      if (!usuario) {
        errorLogin.textContent = "Código no válido";
        return;
      }

      // 3️⃣ Validar permisos según acción
      if (!tienePermiso(usuario.rol, accion)) {
        errorLogin.textContent = "No tiene permisos para esta acción";
        return;
      }

      // 4️⃣ Guardar sesión
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

      // 5️⃣ Redirección
      redirigir(accion);

    } catch (error) {
      console.error(error);
      errorLogin.textContent = "Error al validar el acceso";
    }
  });
});

// 🔐 PERMISOS
function tienePermiso(rol, accion) {

  const permisos = {
    emprendedoras: ["admin"],
    productos: ["admin", "emprendedora"],
    ventas: ["admin", "emprendedora", "vendedora"],
    reportes: ["admin"]
  };

  return permisos[accion]?.includes(rol);
}

// 🔀 REDIRECCIONES
function redirigir(accion) {

  const rutas = {
    emprendedoras: "emprendedoras.html",
    productos: "productos.html",
    ventas: "ventas.html",
    reportes: "reportes.html"
  };

  window.location.href = rutas[accion];
}

// 🔙 Volver
function volverInicio() {
  window.location.href = "index.html";
}

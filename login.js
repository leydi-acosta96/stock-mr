const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const codigo = document.getElementById("codigoAcceso").value.trim();
  const mensaje = document.getElementById("mensajeLogin");

  if (!codigo) {
    mensaje.textContent = "Ingrese el código de acceso";
    return;
  }

  fetch(API_URL, {
    headers: {
      "Authorization": "Bearer mr12#"
    }
  })
    .then(res => res.json())
    .then(data => {
      const usuario = data.usuarios.find(
        u => u.codigoAcceso === codigo && u.estado === "Activo"
      );

      if (!usuario) {
        mensaje.textContent = "Código inválido o usuario inactivo";
        return;
      }

      // 👉 Guardamos sesión
      localStorage.setItem("usuario", JSON.stringify({
        id: usuario.id,
        rol: usuario.rol,
        emprendedora_id: usuario.emprendedora_id || null
      }));

      // 👉 Redirección por rol
      if (usuario.rol === "admin") {
        window.location.href = "dashboard_admin.html";
      } 
      else if (usuario.rol === "emprendedora") {
        window.location.href = "dashboard_emprendedora.html";
      } 
      else if (usuario.rol === "vendedora") {
        window.location.href = "dashboard_vendedora.html";
      }
    })
    .catch(err => {
      console.error(err);
      mensaje.textContent = "Error al conectar con el servidor";
    });
});

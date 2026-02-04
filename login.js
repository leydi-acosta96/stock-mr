const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const codigo = document.getElementById("codigoAcceso").value.trim();

  if (!codigo) {
    alert("Ingrese el código de acceso");
    return;
  }

  fetch(API_URL, {
    headers: {
      "Authorization": "Bearer mr12#"
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }
      return res.json();
    })
    .then(data => {
      console.log("DATA SHEETY:", data);

      const usuario = data.usuarios.find(
        u => u.codigoAcceso === codigo
      );

      if (!usuario) {
        alert("Código inválido");
        return;
      }

      sessionStorage.setItem("usuario", JSON.stringify({
        id: usuario.id,
        nombre: usuario.nombreUsuario,
        rol: usuario.rol
      }));

      // Redirección por rol
      if (usuario.rol === "admin") {
        window.location.href = "dashboard_admin.html";
      } else if (usuario.rol === "emprendedora") {
        window.location.href = "dashboard_emprendedora.html";
      } else if (usuario.rol === "vendedora") {
        window.location.href = "dashboard_vendedora.html";
      } else {
        alert("Rol no reconocido");
      }
    })
    .catch(err => {
      console.error("ERROR FETCH:", err);
      alert("Error de conexión con el sistema");
    });
});

const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const codigo = document.getElementById("codigoAcceso").value.trim();

  fetch(API_URL, {
    headers: {
      "Authorization": "Bearer mr12#"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("Usuarios:", data.usuarios);

      const usuario = data.usuarios.find(
        u => u.codigoAcceso === codigo
      );

      if (!usuario) {
        alert("Código inválido");
        return;
      }

      sessionStorage.setItem("usuario", JSON.stringify(usuario));

      switch (usuario.rol) {
        case "admin":
          window.location.href = "dashboard_admin.html";
          break;
        case "emprendedora":
          window.location.href = "dashboard_emprendedora.html";
          break;
        case "vendedora":
          window.location.href = "dashboard_vendedora.html";
          break;
        default:
          alert("Rol no reconocido");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error de conexión con el sistema");
    });
});

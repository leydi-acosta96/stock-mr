const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

document.getElementById("formLogin").addEventListener("submit", function (e) {
  e.preventDefault();

  const codigo = document.getElementById("codigoAcceso").value.trim();

  fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer mr12#"
    }
  })
    .then(res => {
      console.log("STATUS:", res.status);
      if (!res.ok) throw new Error("Error HTTP");
      return res.json();
    })
    .then(data => {
      console.log("DATA:", data);

      const usuario = data.usuarios.find(
        u => u.codigoAcceso === codigo
      );

      if (!usuario) {
        alert("Código inválido");
        return;
      }

      sessionStorage.setItem("usuario", JSON.stringify(usuario));

      if (usuario.rol === "admin") {
        window.location.href = "dashboard_admin.html";
      } else if (usuario.rol === "emprendedora") {
        window.location.href = "dashboard_emprendedora.html";
      } else if (usuario.rol === "vendedora") {
        window.location.href = "dashboard_vendedora.html";
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error de conexión con el sistema");
    });
});

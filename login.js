document.addEventListener("DOMContentLoaded", () => {

  const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      console.log("RESPUESTA COMPLETA DE SHEETY:", data);
      alert("Mira la consola (F12)");
    })
    .catch(err => {
      console.error("ERROR FETCH:", err);
      alert("Error de conexión");
    });

});

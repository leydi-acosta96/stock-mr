document.addEventListener("DOMContentLoaded", () => {

  const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras";
  const form = document.getElementById("formEmprendedora");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      emprendedora: {   // 👈 SINGULAR (CLAVE)
        id: document.getElementById("idEmprendedora").value,
        nombreEmprendedora: document.getElementById("nombreEmprendedora").value,
        nombreEmprendimiento: document.getElementById("nombreEmprendimiento").value,
        contactoEmprendedora: document.getElementById("contactoEmprendedora").value,
        instagramEmprendedora: document.getElementById("instagramEmprendedora").value,
        correoEmprendedora: document.getElementById("correoEmprendedora").value,
        estadoEmprendedora: document.getElementById("estadoEmprendedora").value
      }
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer mr12#"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resp => {
      console.log("RESPUESTA SHEETY:", resp);
      alert("Emprendedora registrada correctamente");
      form.reset();
    })
    .catch(err => {
      console.error("ERROR:", err);
      alert("Error al guardar");
    });
  });

});

function volverInicio() {
  window.location.href = "index.html";
}

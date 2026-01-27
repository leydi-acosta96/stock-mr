document.addEventListener("DOMContentLoaded", () => {

  const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras";
  const form = document.getElementById("formEmprendedora");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      emprendedora: {
        id: document.getElementById("idEmprendedora").value.trim(),
        nombre_emprendedora: document.getElementById("nombreEmprendedora").value.trim(),
        nombre_emprendimiento: document.getElementById("nombreEmprendimiento").value.trim(),
        contacto: document.getElementById("contactoEmprendedora").value.trim(),
        estado: document.getElementById("estadoEmprendedora").value
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
    .then(() => {
      alert("Emprendedora registrada correctamente");
      form.reset();
    })
    .catch(err => console.error("Error:", err));
  });

});

function volverInicio() {
  window.location.href = "index.html";
}

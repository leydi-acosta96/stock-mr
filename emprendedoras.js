document.addEventListener("DOMContentLoaded", () => {

  const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras";
  const form = document.getElementById("formEmprendedora");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreEmprendedora").value.trim();
    const contacto = document.getElementById("contactoEmprendedora").value.trim();

    if (!nombre) {
      alert("El nombre es obligatorio");
      return;
    }

    const data = {
      emprendedora: {
        nombreEmprendedora: nombre, // 🔥 CLAVE
        contacto: contacto,
        estado: "Activo"
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
      console.log("GUARDADO:", resp);
      alert("Emprendedora registrada correctamente");
      form.reset();
    })
    .catch(err => console.error("ERROR:", err));
  });

});

function volverInicio() {
  window.location.href = "index.html";
}

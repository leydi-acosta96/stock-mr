const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras";

const form = document.getElementById("formEmprendedora");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    emprendedora: {
      nombre_emprendedora: document.getElementById("nombreEmprendedora").value,
      contacto: document.getElementById("contactoEmprendedora").value,
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
  .then(res => {
    console.log("STATUS:", res.status);
    return res.json();
  })
  .then(resp => {
    console.log("RESPUESTA:", resp);
    alert("Emprendedora guardada");
    form.reset();
  })
  .catch(err => console.error("ERROR:", err));
});

function volverInicio() {
  window.location.href = "index.html";
}

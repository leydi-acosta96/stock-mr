const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer mr12#"
};

const formEmprendedora = document.getElementById("formEmprendedora");

if (formEmprendedora) {
  formEmprendedora.addEventListener("submit", function (e) {
    e.preventDefault();

    const emprendedora = {
      emprendedora: {
        nombre_emprendedora: document.getElementById("nombreEmprendedora").value,
        contacto: document.getElementById("contactoEmprendedora").value,
        estado: "Activo"
      }
    };

    fetch(`${API_URL}/emprendedoras`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(emprendedora)
    })
      .then(res => res.json())
      .then(() => {
        alert("Emprendedora registrada correctamente");
        formEmprendedora.reset();
      })
      .catch(error => console.error("Error:", error));
  });
}

function volverInicio() {
  window.location.href = "index.html";
}

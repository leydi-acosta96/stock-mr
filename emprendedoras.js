const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer mr12#"
};

const formEmprendedora = document.getElementById("formEmprendedora");

if (formEmprendedora) {
  formEmprendedora.addEventListener("submit", async function (e) {
    e.preventDefault();

    const payload = {
      emprendedoras: {
        nombre_emprendedora: document.getElementById("nombreEmprendedora").value,
        contacto: document.getElementById("contactoEmprendedora").value,
        estado: "Activo"
      }
    };

    try {
      const res = await fetch(`${API_URL}/emprendedoras`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(payload)
      });

      console.log("STATUS:", res.status);

      const data = await res.json();
      console.log("RESPUESTA:", data);

      if (res.ok) {
        alert("Emprendedora registrada correctamente");
        formEmprendedora.reset();
      } else {
        alert("Error al guardar. Revisa la consola.");
      }

    } catch (error) {
      console.error("ERROR DE RED:", error);
    }
  });
}

function volverInicio() {
  window.location.href = "index.html";
}

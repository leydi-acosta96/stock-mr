const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras";

document.getElementById("formEmprendedora").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    emprendedora: {
      cedulaEmprendedora: document.getElementById("cedulaEmprendedora").value,
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resp => {
    console.log("GUARDADO:", resp);
    alert("Emprendedora registrada correctamente");
    e.target.reset();
  })
  .catch(err => console.error("ERROR:", err));
});

document.getElementById("btnVolver").addEventListener("click", () => {
  window.location.href = "index.html";
});

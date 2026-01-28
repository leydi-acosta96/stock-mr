document.getElementById("formEmprendedora").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    emprendedora: {
      id: document.getElementById("idEmprendedora").value,
      nombreEmprendedora: document.getElementById("nombreEmprendedora").value,
      nombreEmprendimiento: document.getElementById("nombreEmprendimiento").value,
      contactoEmprendedora: document.getElementById("contactoEmprendedora").value,
      instagramEmprendedora: document.getElementById("instagramEmprendedora").value,
      correoEmprendedora: document.getElementById("correoEmprendedora").value,
      estadoEmprendedora: document.getElementById("estadoEmprendedora").value
    }
  };

  fetch("AQUÍ_TU_URL_REAL_DE_SHEETY", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    console.log("Guardado:", data);
    alert("Registro guardado ✅");
  })
  .catch(err => {
    console.error("ERROR:", err);
  });
});

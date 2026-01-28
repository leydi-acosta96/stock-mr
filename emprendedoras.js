const form = document.getElementById("formEmprendedora");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Capturar valores
  const id = document.getElementById("idEmprendedora").value.trim();
  const nombreEmprendedora = document.getElementById("nombreEmprendedora").value.trim();
  const nombreEmprendimiento = document.getElementById("nombreEmprendimiento").value.trim();
  const contactoEmprendedora = document.getElementById("contactoEmprendedora").value.trim();
  const instagramEmprendedora = document.getElementById("instagramEmprendedora").value.trim();
  const correoEmprendedora = document.getElementById("correoEmprendedora").value.trim();
  const estadoEmprendedora = document.getElementById("estadoEmprendedora").value;

  // Validación básica
  if (!id || !nombreEmprendedora || !nombreEmprendimiento) {
    alert("Por favor completa los campos obligatorios");
    return;
  }

  // Objeto para Sheety
  const data = {
    emprendedora: {
      id: id,
      nombreEmprendedora: nombreEmprendedora,
      nombreEmprendimiento: nombreEmprendimiento,
      contactoEmprendedora: contactoEmprendedora,
      instagramEmprendedora: instagramEmprendedora,
      correoEmprendedora: correoEmprendedora,
      estadoEmprendedora: estadoEmprendedora
    }
  };

  // ⚠️ Reemplaza esta URL con la tuya de Sheety
  fetch("https://api.sheety.co/TU_USUARIO/TU_PROYECTO/emprendedoras", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      alert("Emprendedora registrada correctamente ✅");
      form.reset();
      console.log(result);
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Ocurrió un error al guardar la información ❌");
    });
});

const API_BASE = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer mr12#"
};

const selectEmprendedora = document.getElementById("emprendedoraId");

// 🔹 Cargar emprendedoras en el select
function cargarEmprendedoras() {
  fetch(`${API_BASE}/emprendedoras`, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      selectEmprendedora.innerHTML = '<option value="">Seleccione emprendedora</option>';

      data.emprendedoras.forEach(emp => {
        const option = document.createElement("option");
        option.value = emp.id; // ID REAL
        option.textContent = `${emp.nombreEmprendedora} - ${emp.nombreEmprendimiento}`;
        selectEmprendedora.appendChild(option);
      });
    })
    .catch(err => console.error("Error cargando emprendedoras:", err));
}

document.addEventListener("DOMContentLoaded", cargarEmprendedoras);

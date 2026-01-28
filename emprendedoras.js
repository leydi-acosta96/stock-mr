const URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras";

const form = document.getElementById("formEmprendedora");
const tabla = document.getElementById("tablaEmprendedoras");

/* =========================
   REGISTRAR EMPRENDEDORA
========================= */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    emprendedora: {
      cedulaEmprendedora: document.getElementById("cedulaEmprendedora").value.trim(),
      nombreEmprendedora: document.getElementById("nombreEmprendedora").value.trim(),
      nombreEmprendimiento: document.getElementById("nombreEmprendimiento").value.trim(),
      contactoEmprendedora: document.getElementById("contactoEmprendedora").value.trim(),
      instagramEmprendedora: document.getElementById("instagramEmprendedora").value.trim(),
      correoEmprendedora: document.getElementById("correoEmprendedora").value.trim(),
      estadoEmprendedora: document.getElementById("estadoEmprendedora").value
    }
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => {
    alert("Emprendedora registrada correctamente ✅");
    form.reset();
    cargarEmprendedoras();
  })
  .catch(err => {
    console.error(err);
    alert("Error al guardar ❌");
  });
});

/* =========================
   VOLVER AL INICIO
========================= */
document.getElementById("btnVolver").addEventListener("click", () => {
  window.location.href = "index.html";
});

/* =========================
   LISTAR EMPRENDEDORAS
========================= */
function cargarEmprendedoras() {
  fetch(URL)
    .then(res => res.json())
    .then(data => mostrarEmprendedoras(data.emprendedoras));
}

function mostrarEmprendedoras(lista) {
  tabla.innerHTML = "";

  lista.forEach(e => {
    tabla.innerHTML += `
      <tr>
        <td>${e.cedulaEmprendedora}</td>
        <td>${e.nombreEmprendedora}</td>
        <td>${e.nombreEmprendimiento}</td>
        <td>${e.estadoEmprendedora}</td>
        <td>
          <select onchange="cambiarEstado(${e.id}, this.value)">
            <option value="Activo" ${e.estadoEmprendedora === "Activo" ? "selected" : ""}>Activo</option>
            <option value="Inactivo" ${e.estadoEmprendedora === "Inactivo" ? "selected" : ""}>Inactivo</option>
          </select>
        </td>
      </tr>
    `;
  });
}

/* =========================
   CAMBIAR ESTADO (PATCH)
========================= */
function cambiarEstado(sheetyId, nuevoEstado) {

  fetch(`${URL}/${sheetyId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emprendedora: { estadoEmprendedora: nuevoEstado }
    })
  })
  .then(res => res.json())
  .then(() => {
    alert("Estado actualizado ✅");
  })
  .catch(err => {
    console.error(err);
    alert("Error al actualizar ❌");
  });
}

/* =========================
   CARGA INICIAL
========================= */
cargarEmprendedoras();

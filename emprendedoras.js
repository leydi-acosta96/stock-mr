const URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras";
const tabla = document.getElementById("tablaEmprendedoras");

/* =====================
   CARGAR EMPRENDEDORAS
===================== */
function cargarEmprendedoras() {
  fetch(URL)
    .then(res => res.json())
    .then(data => {
      tabla.innerHTML = "";

      data.emprendedoras.forEach(e => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td>${e.cedulaEmprendedora}</td>
          <td>${e.nombreEmprendedora}</td>
          <td>${e.nombreEmprendimiento}</td>
          <td>${e.estadoEmprendedora}</td>
          <td></td>
        `;

        const tdSelect = fila.children[4];

        const select = document.createElement("select");
        select.innerHTML = `
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        `;
        select.value = e.estadoEmprendedora;

        select.addEventListener("change", () => {
          cambiarEstado(e.id, select.value);
        });

        tdSelect.appendChild(select);
        tabla.appendChild(fila);
      });
    });
}

/* =====================
   CAMBIAR ESTADO
===================== */
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
    cargarEmprendedoras();
  })
  .catch(err => {
    console.error(err);
    alert("Error al actualizar ❌");
  });
}

/* =====================
   REGISTRAR EMPRENDEDORA
===================== */
document.getElementById("formEmprendedora").addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    emprendedora: {
      cedulaEmprendedora: document.getElementById("cedulaEmprendedora").value,
      nombreEmprendedora: document.getElementById("nombreEmprendedora").value,
      nombreEmprendimiento: document.getElementById("nombreEmprendimiento").value,
      estadoEmprendedora: document.getElementById("estadoEmprendedora").value
    }
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(() => {
    e.target.reset();
    cargarEmprendedoras();
  });
});

/* =====================
   INICIO
===================== */
cargarEmprendedoras();

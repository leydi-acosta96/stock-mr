const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario || usuario.rol !== "admin") {
  alert("Acceso restringido. Solo el administrador puede ingresar aquí.");
  window.location.href = "index.html";
}

const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras";

/* =============================
   CARGAR EMPRENDEDORAS
============================= */
function cargarEmprendedoras() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tablaEmprendedoras");
      tabla.innerHTML = "";

      data.emprendedoras.forEach(e => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td>${e.cedulaEmprendedora}</td>
          <td>${e.nombreEmprendedora}</td>
          <td>${e.nombreEmprendimiento}</td>
          <td>${e.estadoEmprendedora}</td>
          <td>
            <button onclick="editarEmprendedora(${e.id})">Editar</button>
          </td>
        `;

        tabla.appendChild(fila);
      });
    })
    .catch(err => console.error("Error cargando emprendedoras:", err));
}

/* =============================
   EDITAR EMPRENDEDORA
============================= */
function editarEmprendedora(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then(data => {
      const e = data.emprendedora;

      document.getElementById("idEmprendedora").value = e.id;
      document.getElementById("cedulaEmprendedora").value = e.cedulaEmprendedora;
      document.getElementById("nombreEmprendedora").value = e.nombreEmprendedora;
      document.getElementById("nombreEmprendimiento").value = e.nombreEmprendimiento;
      document.getElementById("contactoEmprendedora").value = e.contactoEmprendedora;
      document.getElementById("instagramEmprendedora").value = e.instagramEmprendedora;
      document.getElementById("correoEmprendedora").value = e.correoEmprendedora;
      document.getElementById("estadoEmprendedora").value = e.estadoEmprendedora;

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* =============================
   GUARDAR / ACTUALIZAR
============================= */
document.getElementById("formEmprendedora").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("idEmprendedora").value;

  const payload = {
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

  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? "PUT" : "POST";

  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer mr12#"
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(() => {
    alert(id ? "Emprendedora actualizada" : "Emprendedora registrada");
    e.target.reset();
    document.getElementById("idEmprendedora").value = "";
    cargarEmprendedoras();
  })
  .catch(err => console.error("Error guardando:", err));
});

/* =============================
   VOLVER
============================= */
function volverInicio() {
  window.location.href = "index.html";
}

/* =============================
   INICIAL
============================= */
cargarEmprendedoras();

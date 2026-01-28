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

  // 
  fetch("https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras", {
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

document.getElementById("btnVolver").addEventListener("click", () => {
  window.location.href = "index.html";
});
// Listar de emprendedoras 

fetch("https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/emprendedoras")
  .then(res => res.json())
  .then(data => {
    mostrarEmprendedoras(data.emprendedoras);
  });

function mostrarEmprendedoras(lista) {
  const tabla = document.getElementById("tablaEmprendedoras");
  tabla.innerHTML = "";

  lista.forEach(e => {
    tabla.innerHTML += `
      <tr>
        <td>${e.id}</td>
        <td>${e.nombreEmprendedora}</td>
        <td>${e.nombreEmprendimiento}</td>
        <td>${e.estadoEmprendedora}</td>
        <td>
          <button onclick="cambiarEstado(${e.id})">Cambiar estado</button>
        </td>
      </tr>
    `;
  });
}

// cambiar estado de emprendedoras

function cambiarEstado(sheetyId) {

  const nuevoEstado = prompt("Escribe el nuevo estado: Activo o Inactivo");

  if (!nuevoEstado) return;

  fetch(`TU_URL_DE_SHEETY/emprendedoras/${sheetyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emprendedora: {
        estadoEmprendedora: nuevoEstado
      }
    })
  })
  .then(res => res.json())
  .then(() => {
    alert("Estado actualizado ✅");
    location.reload();
  })
  .catch(err => {
    console.error(err);
    alert("Error al actualizar ❌");
  });
}



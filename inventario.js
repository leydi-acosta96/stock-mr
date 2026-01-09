const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Authorization": "Bearer TU_TOKEN"
};

const tablaInventario = document.getElementById("tablaInventario");

function cargarInventario() {
  fetch(`${API_URL}/productos`, {
    headers: HEADERS
  })
    .then(res => res.json())
    .then(data => {
      tablaInventario.innerHTML = "";

      data.productos.forEach(p => {
        const fila = `
          <tr>
            <td>${p.nombre_producto}</td>
            <td>${p.categoria}</td>
            <td>${p.emprendedora_id}</td>
            <td>${p.stock}</td>
            <td>${p.estado}</td>
          </tr>
        `;
        tablaInventario.innerHTML += fila;
      });
    });
}

if (tablaInventario) {
  cargarInventario();
}


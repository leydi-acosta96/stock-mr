const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario || usuario.rol !== "admin") {
  alert("Los reportes son solo para el administrador.");
  window.location.href = "index.html";
}

const API_BASE = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Authorization": "Bearer mr12#"
};

/*********************************
 * REPORTE VENTAS POR FECHA
 *********************************/
function generarReporteVentas() {
  const inicio = document.getElementById("fechaInicio").value;
  const fin = document.getElementById("fechaFin").value;
  const tbody = document.getElementById("tablaVentas");
  tbody.innerHTML = "";

  fetch(`${API_BASE}/ventas`, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      let totalPeriodo = 0;

      data.ventas.forEach(v => {
        if (v.fechaVenta >= inicio && v.fechaVenta <= fin) {
          totalPeriodo += Number(v.total);

          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${v.fechaVenta}</td>
            <td>${v.codigoProducto}</td>
            <td>${v.cantidad}</td>
            <td>${v.canalVenta}</td>
            <td>$${v.total}</td>
          `;
          tbody.appendChild(tr);
        }
      });

      const trTotal = document.createElement("tr");
      trTotal.innerHTML = `
        <td colspan="4"><strong>Total</strong></td>
        <td><strong>$${totalPeriodo.toFixed(2)}</strong></td>
      `;
      tbody.appendChild(trTotal);
    });
}

/*********************************
 * REPORTE VENTAS POR EMPRENDEDORA
 *********************************/
function cargarVentasPorEmprendedora() {
  const tbody = document.getElementById("tablaEmprendedoras");

  Promise.all([
    fetch(`${API_BASE}/ventas`, { headers: HEADERS }).then(r => r.json()),
    fetch(`${API_BASE}/emprendedoras`, { headers: HEADERS }).then(r => r.json())
  ])
  .then(([ventasData, empData]) => {
    const resumen = {};

    ventasData.ventas.forEach(v => {
      resumen[v.emprendedoraId] =
        (resumen[v.emprendedoraId] || 0) + Number(v.total);
    });

    empData.emprendedoras.forEach(e => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${e.nombreEmprendedora}</td>
        <td>$${(resumen[e.id] || 0).toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });
  });
}

/*********************************
 * REPORTE INVENTARIO
 *********************************/
function cargarInventario() {
  const tbody = document.getElementById("tablaInventario");

  fetch(`${API_BASE}/productos`, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      data.productos.forEach(p => {
        let estado = "OK";
        if (p.stock <= 2) estado = "⚠ Bajo";
        if (p.stock === 0) estado = "❌ Sin stock";

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${p.codigoProducto}</td>
          <td>${p.nombreProducto}</td>
          <td>${p.stock}</td>
          <td>${estado}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}

/*********************************
 * INICIO
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
  cargarVentasPorEmprendedora();
  cargarInventario();
});


/* =============================
   VOLVER
============================= */
function volverInicio() {
  window.location.href = "index.html";
}

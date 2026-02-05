const usuario = JSON.parse(sessionStorage.getItem("usuario"));

if (!usuario || !["admin", "emprendedora", "vendedora"].includes(usuario.rol)) {
  alert("Debes iniciar sesión para registrar ventas.");
  window.location.href = "login.html";
}

const API_BASE = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer mr12#"
};

const selectProducto = document.getElementById("productoVenta");
const formVenta = document.getElementById("formVenta");

/*********************************
 * CARGAR PRODUCTOS
 *********************************/
function cargarProductos() {
  fetch(`${API_BASE}/productos`, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      selectProducto.innerHTML = '<option value="">Seleccione producto</option>';

      data.productos.forEach(p => {
        if (p.stock > 0) {
          const option = document.createElement("option");
          option.value = p.id;
          option.dataset.stock = p.stock;
          option.dataset.precio = p.precioProducto;
          option.dataset.codigo = p.codigoProducto;
          option.dataset.emprendedora = p.emprendedoraId;
          option.textContent = `${p.codigoProducto} - ${p.nombreProducto} (Stock: ${p.stock})`;
          selectProducto.appendChild(option);
        }
      });
    })
    .catch(err => console.error("Error cargando productos:", err));
}

/*********************************
 * REGISTRAR VENTA
 *********************************/
formVenta.addEventListener("submit", e => {
  e.preventDefault();

  const option = selectProducto.selectedOptions[0];
  const productoId = option.value;
  const cantidad = parseInt(document.getElementById("cantidadVenta").value);
  const stockActual = parseInt(option.dataset.stock);
  const precio = parseFloat(option.dataset.precio);

  if (cantidad > stockActual) {
    alert("Stock insuficiente");
    return;
  }

  const nuevaCantidad = stockActual - cantidad;

  // 1️⃣ Registrar venta
  const venta = {
    venta: {
      productoId: productoId,
      codigoProducto: option.dataset.codigo,
      cantidad: cantidad,
      canalVenta: document.getElementById("canalVenta").value,
      fechaVenta: new Date().toISOString().split("T")[0],
      emprendedoraId: option.dataset.emprendedora,
      total: (cantidad * precio).toFixed(2)
    }
  };

  fetch(`${API_BASE}/ventas`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(venta)
  })
  .then(() => {
    // 2️⃣ Actualizar stock del producto
    return fetch(`${API_BASE}/productos/${productoId}`, {
      method: "PUT",
      headers: HEADERS,
      body: JSON.stringify({
        producto: { stock: nuevaCantidad }
      })
    });
  })
  .then(() => {
    alert("Venta registrada correctamente");
    formVenta.reset();
    cargarProductos();
  })
  .catch(err => console.error("Error registrando venta:", err));
});

/*********************************
 * INICIO
 *********************************/
document.addEventListener("DOMContentLoaded", cargarProductos);

// ===============================
// CONFIGURACIÓN GENERAL
// ===============================
const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";

const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer mr12#"
};

// ===============================
// ELEMENTOS DEL DOM
// ===============================
const formVenta = document.getElementById("formVenta");
const selectProducto = document.getElementById("productoVenta");
const inputCantidad = document.getElementById("cantidadVenta");
const selectCanal = document.getElementById("canalVenta");

// ===============================
// CARGAR PRODUCTOS EN SELECT
// ===============================
function cargarProductosVenta() {
  fetch(`${API_URL}/productos`, {
    headers: HEADERS
  })
    .then(res => res.json())
    .then(data => {
      selectProducto.innerHTML = "";

      data.productos.forEach(p => {
        if (p.estado === "Activo") {
          const option = document.createElement("option");
          option.value = p.id;
          option.textContent = `${p.nombre_producto} (Stock: ${p.stock})`;
          selectProducto.appendChild(option);
        }
      });
    })
    .catch(error => console.error("Error al cargar productos:", error));
}

// Ejecutar carga si existe el select
if (selectProducto) {
  cargarProductosVenta();
}

// ===============================
// REGISTRAR VENTA
// ===============================
if (formVenta) {
  formVenta.addEventListener("submit", function (e) {
    e.preventDefault();

    const productoId = selectProducto.value;
    const cantidad = parseInt(inputCantidad.value);
    const canal = selectCanal.value;

    if (!productoId || !cantidad) {
      alert("Debe seleccionar un producto y cantidad");
      return;
    }

    // 1️⃣ Obtener producto actual
    fetch(`${API_URL}/productos/${productoId}`, {
      headers: HEADERS
    })
      .then(res => res.json())
      .then(data => {
        const producto = data.producto;

        // Validar stock
        if (cantidad > producto.stock) {
          alert("Stock insuficiente");
          return;
        }

        const nuevoStock = producto.stock - cantidad;
        const totalVenta = cantidad * producto.precio;

        // 2️⃣ Registrar venta
        fetch(`${API_URL}/ventas`, {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify({
            venta: {
              producto_id: productoId,
              cantidad: cantidad,
              canal_venta: canal,
              total: totalVenta,
              fecha: new Date().toISOString().split("T")[0]
            }
          })
        });

        // 3️⃣ Actualizar stock del producto
        fetch(`${API_URL}/productos/${productoId}`, {
          method: "PUT",
          headers: HEADERS,
          body: JSON.stringify({
            producto: {
              stock: nuevoStock
            }
          })
        });

        alert("Venta registrada correctamente");
        formVenta.reset();

        // Recargar productos e inventario
        cargarProductosVenta();
      })
      .catch(error => console.error("Error en el proceso de venta:", error));
  });
}

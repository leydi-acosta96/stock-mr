const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer mr12#"
};

const formVenta = document.getElementById("formVenta");

if (formVenta) {
  formVenta.addEventListener("submit", function (e) {
    e.preventDefault();

    const productoId = document.getElementById("productoVenta").value;
    const cantidad = parseInt(document.getElementById("cantidadVenta").value);
    const canal = document.getElementById("canalVenta").value;

    // 1️⃣ Obtener producto actual
    fetch(`${API_URL}/productos/${productoId}`, {
      headers: HEADERS
    })
      .then(res => res.json())
      .then(data => {
        const producto = data.producto;
        const nuevoStock = producto.stock - cantidad;

        // 2️⃣ Registrar venta
        fetch(`${API_URL}/ventas`, {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify({
            venta: {
              producto_id: productoId,
              cantidad: cantidad,
              canal_venta: canal,
              total: cantidad * producto.precio
            }
          })
        });

        // 3️⃣ Actualizar stock
        fetch(`${API_URL}/productos/${productoId}`, {
          method: "PUT",
          headers: HEADERS,
          body: JSON.stringify({
            producto: { stock: nuevoStock }
          })
        });

        alert("Venta registrada correctamente");
        formVenta.reset();
      });
  });
}

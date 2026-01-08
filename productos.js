document.getElementById("formProducto").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    producto: {
      nombre_producto: nombre.value,
      categoria: categoria.value,
      precio: precio.value,
      stock: stock.value,
      estado: "Activo",
      emprendedora_id: 1
    }
  };

  fetch("https://api.sheety.co/tuProyecto/inventario/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer TU_TOKEN"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(() => alert("Producto registrado"));
});

const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer TU_TOKEN"
};

const formProducto = document.getElementById("formProducto");

if (formProducto) {
  formProducto.addEventListener("submit", function (e) {
    e.preventDefault();

    const producto = {
      producto: {
        nombre_producto: document.getElementById("nombreProducto").value,
        categoria: document.getElementById("categoriaProducto").value,
        precio: document.getElementById("precioProducto").value,
        stock: document.getElementById("stockProducto").value,
        emprendedora_id: document.getElementById("emprendedora").value,
        estado: "Activo"
      }
    };

    fetch(`${API_URL}/productos`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(producto)
    })
      .then(res => res.json())
      .then(() => {
        alert("Producto registrado correctamente");
        formProducto.reset();
      })
      .catch(error => console.error("Error:", error));
  });
}

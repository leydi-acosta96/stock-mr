const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer mr12#"
};

const formProducto = document.getElementById("formProducto");

// 🔤 Generar prefijo por categoría
function obtenerPrefijo(categoria) {
  return categoria.substring(0, 3).toUpperCase();
}

// 🆔 Generar código automático
async function generarCodigoProducto(categoria) {
  const res = await fetch(`${API_URL}/productos`, { headers: HEADERS });
  const data = await res.json();

  const productosCategoria = data.productos.filter(
    p => p.categoria.toLowerCase() === categoria.toLowerCase()
  );

  const correlativo = productosCategoria.length + 1;
  const correlativoFormateado = correlativo.toString().padStart(3, "0");

  return `${obtenerPrefijo(categoria)}-${correlativoFormateado}`;
}

if (formProducto) {
  formProducto.addEventListener("submit", async function (e) {
    e.preventDefault();

    const categoria = document.getElementById("categoriaProducto").value;

    if (!categoria) {
      alert("Debe ingresar una categoría");
      return;
    }

    // 🆔 generar ID
    const codigoProducto = await generarCodigoProducto(categoria);

    const producto = {
      producto: {
        id: codigoProducto,
        nombre_producto: document.getElementById("nombreProducto").value,
        categoria: categoria,
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
        alert(`Producto registrado con código ${codigoProducto}`);
        formProducto.reset();
      })
      .catch(error => console.error("Error:", error));
  });
}

// 🔙 Volver al inicio
function volverInicio() {
  window.location.href = "index.html";
}

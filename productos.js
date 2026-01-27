const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer mr12#"
};

const formProducto = document.getElementById("formProducto");
const categoriaInput = document.getElementById("categoriaProducto");
const codigoInput = document.getElementById("codigoProducto");

// 🔤 Prefijo según categoría
function obtenerPrefijo(categoria) {
  return categoria.substring(0, 3).toUpperCase();
}

// 🆔 Generar código automático
async function generarCodigoProducto(categoria) {
  if (!categoria) return;

  const res = await fetch(`${API_URL}/productos`, { headers: HEADERS });
  const data = await res.json();

  const productosCategoria = data.productos.filter(
    p => p.categoria.toLowerCase() === categoria.toLowerCase()
  );

  const correlativo = productosCategoria.length + 1;
  const correlativoFormateado = correlativo.toString().padStart(3, "0");

  const codigo = `${obtenerPrefijo(categoria)}-${correlativoFormateado}`;
  codigoInput.value = codigo;
}

// 🔄 Generar código cuando se escribe la categoría
categoriaInput.addEventListener("blur", () => {
  generarCodigoProducto(categoriaInput.value);
});

// 📦 Guardar producto
formProducto.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!codigoInput.value) {
    alert("Debe seleccionar una categoría válida");
    return;
  }

  const producto = {
    producto: {
      id: codigoInput.value,
      nombre_producto: document.getElementById("nombreProducto").value,
      categoria: categoriaInput.value,
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
      alert(`Producto registrado con código ${codigoInput.value}`);
      formProducto.reset();
      codigoInput.value = "";
    })
    .catch(error => console.error("Error:", error));
});

// 🔙 Volver al inicio
function volverInicio() {
  window.location.href = "index.html";
}

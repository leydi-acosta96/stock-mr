/*********************************
 * CONFIGURACIÓN GENERAL
 *********************************/
const API_BASE = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer mr12#"
};

/*********************************
 * ELEMENTOS DEL DOM
 *********************************/
const formProducto = document.getElementById("formProducto");
const selectCategoria = document.getElementById("categoriaProducto");
const inputCodigo = document.getElementById("codigoProducto");
const selectEmprendedora = document.getElementById("emprendedoraId");

/*********************************
 * MAPEO CATEGORÍA → PREFIJO
 *********************************/
const categoriasCodigo = {
  "Accesorios": "ACC",
  "Ropa": "ROP",
  "Cosmetica": "COS",
  "Vestidos de baño": "VDB"
};

/*********************************
 * CARGAR EMPRENDEDORAS
 *********************************/
function cargarEmprendedoras() {
  fetch(`${API_BASE}/emprendedoras`, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      selectEmprendedora.innerHTML = '<option value="">Seleccione emprendedora</option>';

      data.emprendedoras.forEach(emp => {
        const option = document.createElement("option");
        option.value = emp.id; // ID real de Sheety
        option.textContent = `${emp.nombreEmprendedora} - ${emp.nombreEmprendimiento}`;
        selectEmprendedora.appendChild(option);
      });
    })
    .catch(err => console.error("Error cargando emprendedoras:", err));
}

/*********************************
 * GENERAR CÓDIGO DE PRODUCTO
 *********************************/
function generarCodigoProducto() {
  const categoria = selectCategoria.value;

  if (!categoria) {
    inputCodigo.value = "";
    return;
  }

  const prefijo = categoriasCodigo[categoria];

  fetch(`${API_BASE}/productos`, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      const productosCategoria = data.productos.filter(
        p => p.categoriaProducto === categoria
      );

      const consecutivo = productosCategoria.length + 1;
      const numero = String(consecutivo).padStart(3, "0");

      inputCodigo.value = `${prefijo}-${numero}`;
    })
    .catch(err => console.error("Error generando código:", err));
}

/*********************************
 * GUARDAR PRODUCTO
 *********************************/
formProducto.addEventListener("submit", e => {
  e.preventDefault();

  const data = {
    producto: {
      codigoProducto: inputCodigo.value,
      nombreProducto: document.getElementById("nombreProducto").value,
      categoriaProducto: selectCategoria.value,
      precioProducto: document.getElementById("precioProducto").value,
      stock: document.getElementById("stockProducto").value,
      emprendedoraId: selectEmprendedora.value,
      estadoProducto: "Activo"
    }
  };

  fetch(`${API_BASE}/productos`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(() => {
      alert("Producto registrado correctamente");
      formProducto.reset();
      inputCodigo.value = "";
    })
    .catch(err => console.error("Error al guardar producto:", err));
});

/*********************************
 * EVENTOS INICIALES
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
  cargarEmprendedoras();
});

selectCategoria.addEventListener("change", generarCodigoProducto);


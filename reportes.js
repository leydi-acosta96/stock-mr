const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr";
const HEADERS = {
  "Authorization": "Bearer mr12#"
};

// Productos con bajo stock
function productosBajoStock(limite = 5) {
  fetch(`${API_URL}/productos`, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      const bajos = data.productos.filter(p => p.stock <= limite);
      console.log("Productos con bajo stock:", bajos);
    });
}

// Ventas por canal
function ventasPorCanal(canal) {
  fetch(`${API_URL}/ventas`, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      const ventas = data.ventas.filter(v => v.canal_venta === canal);
      console.log(`Ventas por ${canal}:`, ventas);
    });
}

const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";


// Mostrar formulario
function mostrarFormularioUsuario() {
  document.getElementById("formUsuario").style.display = "block";
}


// Generar código
function generarCodigo(rol) {

  let prefijo = rol === "vendedora" ? "VEND" : "EMP";
  const numero = Math.floor(100 + Math.random() * 900);

  return prefijo + numero;
}


// Crear usuario
document.getElementById("formUsuario").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreUsuarioNuevo").value.trim();
  const rol = document.getElementById("rolNuevo").value;

  const codigo = generarCodigo(rol);

  const nuevoUsuario = {
    usuario: {
      codigoAcceso: codigo,
      nombreUsuario: nombre,
      rol: rol
    }
  };

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer mr12#"
    },
    body: JSON.stringify(nuevoUsuario)
  })
  .then(() => {
    alert("Usuario creado - Código: " + codigo);
    document.getElementById("formUsuario").reset();
    cargarUsuarios();
  });
});


// Cargar usuarios
function cargarUsuarios() {

  fetch(API_URL, {
    headers: { "Authorization": "Bearer mr12#" }
  })
  .then(res => res.json())
  .then(data => {

    const tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = "";

    data.usuarios.forEach(u => {

      tabla.innerHTML += `
        <tr>
          <td>${u.nombreUsuario}</td>
          <td>${u.rol}</td>
          <td>
            ${u.codigoAcceso}
            <button onclick="copiarCodigo('${u.codigoAcceso}')">📋</button>
          </td>
          <td>
            <button onclick="editarUsuario(${u.id}, '${u.nombreUsuario}', '${u.rol}')">✏️</button>
            <button onclick="eliminarUsuario(${u.id})">🗑️</button>
          </td>
        </tr>
      `;

    });

  });
}


// Copiar código
function copiarCodigo(codigo) {
  navigator.clipboard.writeText(codigo);
  alert("Código copiado: " + codigo);
}


// Eliminar usuario
function eliminarUsuario(id) {

  if (!confirm("¿Eliminar usuario?")) return;

  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer mr12#"
    }
  })
  .then(() => {
    cargarUsuarios();
  });
}


// Editar usuario
function editarUsuario(id, nombre, rol) {

  const nuevoNombre = prompt("Editar nombre:", nombre);
  if (!nuevoNombre) return;

  const nuevoRol = prompt("Editar rol (admin, emprendedora, vendedora):", rol);
  if (!nuevoRol) return;

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer mr12#"
    },
    body: JSON.stringify({
      usuario: {
        nombreUsuario: nuevoNombre,
        rol: nuevoRol
      }
    })
  })
  .then(() => cargarUsuarios());
}


// Buscar usuario
function buscarUsuario() {

  const texto = document.getElementById("buscarUsuario").value.toLowerCase();
  const filas = document.querySelectorAll("#tablaUsuarios tr");

  filas.forEach(fila => {
    fila.style.display = fila.textContent.toLowerCase().includes(texto)
      ? ""
      : "none";
  });

}


// Filtrar por rol
function filtrarRol() {

  const rol = document.getElementById("filtroRol").value;
  const filas = document.querySelectorAll("#tablaUsuarios tr");

  filas.forEach(fila => {

    if (!rol) {
      fila.style.display = "";
      return;
    }

    fila.style.display = fila.textContent.includes(rol)
      ? ""
      : "none";

  });

}


// Cargar al iniciar
document.addEventListener("DOMContentLoaded", cargarUsuarios);

const API_URL = "https://api.sheety.co/301327363ae1c8d017800bb4566af87c/bdMr/usuarios";

// Mostrar formulario
function mostrarFormularioUsuario() {
  document.getElementById("formUsuario").style.display = "block";
}

// Generar código automático
function generarCodigo(rol) {

  let prefijo = "";

  if (rol === "vendedora") {
    prefijo = "VEND";
  } else if (rol === "emprendedora") {
    prefijo = "EMP";
  }

  const numero = Math.floor(100 + Math.random() * 900);

  return prefijo + numero;
}


// Guardar usuario nuevo
document.getElementById("formUsuario").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreUsuarioNuevo").value.trim();
  const rol = document.getElementById("rolNuevo").value;

  if (!nombre || !rol) {
    alert("Completa los campos");
    return;
  }

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
  .then(res => res.json())
  .then(data => {

    alert("Usuario creado correctamente\nCódigo: " + codigo);

    document.getElementById("formUsuario").reset();
    document.getElementById("formUsuario").style.display = "none";

    cargarUsuarios();
  })
  .catch(err => {
    console.error(err);
    alert("Error al crear usuario");
  });

});


// Cargar usuarios en tabla
function cargarUsuarios() {

  fetch(API_URL, {
    headers: {
      "Authorization": "Bearer mr12#"
    }
  })
  .then(res => res.json())
  .then(data => {

    const tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = "";

    data.usuarios.forEach(usuario => {

      const fila = `
        <tr>
          <td>${usuario.nombreUsuario}</td>
          <td>${usuario.rol}</td>
          <td>${usuario.codigoAcceso}</td>
        </tr>
      `;

      tabla.innerHTML += fila;

    });

  })
  .catch(err => {
    console.error(err);
    alert("Error cargando usuarios");
  });

}


// Cargar al iniciar
document.addEventListener("DOMContentLoaded", cargarUsuarios);

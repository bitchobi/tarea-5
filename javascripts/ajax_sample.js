let indiceActual = 0; // Variable para seguir el índice actual de los datos
let datos = []; // Variable para almacenar los datos recuperados de ajax.json

// Obtener referencias a los elementos del DOM
const boton = document.getElementById("btn");
const titulo = document.getElementById("title");
const contenido = document.getElementById("content");
const video = document.getElementById("video");

function obtenerDatos() {
  // Función para recuperar los datos de ajax.json
  const xhr = new XMLHttpRequest(); // Crear una nueva solicitud XMLHttpRequest
  xhr.onreadystatechange = function () {
    // Función que se llama cada vez que cambia el estado de la solicitud
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Verificar que la solicitud se completó exitosamente
      datos = JSON.parse(xhr.responseText); // Parsear la respuesta JSON y almacenarla en la variable datos
      actualizarVideo(); // Llamar a la función para actualizar el video con los nuevos datos
    }
  };
  xhr.open("GET", "ajax.json"); // Configurar la solicitud para obtener ajax.json
  xhr.send(); // Enviar la solicitud
}

function actualizarVideo() {
  // Función para actualizar el contenido del video
  if (datos.length === 0) {
    // Si no hay datos, intentar recuperarlos
    obtenerDatos();
    return; // Salir de la función para esperar la recuperación de datos
  }
  const nuevoDato = datos[indiceActual]; // Obtener el dato correspondiente al índice actual
  titulo.textContent = nuevoDato.title; // Actualizar el título con el nuevo dato
  contenido.textContent = nuevoDato.content; // Actualizar el contenido con el nuevo dato
  video.src = nuevoDato.url; // Actualizar la URL del video de YouTube con el nuevo dato
}

// Agregar un evento click al botón
boton.addEventListener("click", function () {
  // Incrementar el índice actual o resetearlo a cero si llega a 2
  indiceActual = (indiceActual + 1) % 3; // Utilizar el operador módulo para crear un bucle de 0 a 2
  actualizarVideo(); // Llamar a la función para actualizar el video
});

window.onload = actualizarVideo; // Llamar a la función para actualizar el video cuando se cargue la página

// Declaramos un array vacío para guardar la información de las personas
let personas = [];

// Función para agregar una persona al array
function agregarPersona() {
  let nombre = prompt("Ingresa el nombre de la persona:");
  let edad = prompt("Ingresa la edad de la persona:");
  let persona = { nombre: nombre, edad: edad }; // Creamos un objeto con la información de la persona
  personas.push(persona); // Agregamos el objeto al array de personas
}

// Función para mostrar la información de una persona
function mostrarPersona(persona) {
  alert("Nombre: " + persona.nombre + "\nEdad: " + persona.edad);
}

// Ciclo principal
let opcion = "";

while (opcion !== "3") {
  opcion = prompt("¿Qué deseas hacer? \n1. Agregar personas \n2. Ver personas \n3. Salir");

  switch (opcion) {
    case "1":
      let cantidadPersonas = prompt("¿Cuántas personas quieres agregar?");
      for (let i = 0; i < cantidadPersonas; i++) {
        agregarPersona();
      }
      break;

    case "2":
      // Usamos el método map para crear un nuevo array con la información de cada persona
      let informacionPersonas = personas.map(function (persona) {
        return "Nombre: " + persona.nombre + ", Edad: " + persona.edad;
      });

      // Ciclo para mostrar la información de cada persona
      for (let i = 0; i < informacionPersonas.length; i++) {
        mostrarPersona(personas[i]);
      }
      break;

    case "3":
      alert("¡Hasta luego!");
      break;

    default:
      alert("Opción no válida. Por favor ingresa '1', '2' o '3'.");
      break;
  }
}

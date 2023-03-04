const form = document.querySelector('form');
const listaPersonas = document.querySelector('#lista-personas');
const botonReiniciar = document.querySelector('#reiniciar');


// Función para agregar una persona a la lista
function agregarPersona(evento) {
  evento.preventDefault();

  const nombre = document.querySelector('#nombre').value;
  const edad = parseInt(document.querySelector('#edad').value);
  const email = document.querySelector('#email').value;

  // Crear un objeto de persona con los datos ingresados
  const persona = { nombre, edad, email };

  // Agregar el objeto de persona al array de personas en session storage
  let personas = [];
  if (localStorage.getItem('personas')) {
    personas = JSON.parse(localStorage.getItem('personas'));
  }
  personas.push(persona);
  localStorage.setItem('personas', JSON.stringify(personas));

  // Actualizar la vista de la lista
  actualizarListaPersonas();

  // Limpiar los campos del formulario
  document.querySelector('#nombre').value = '';
  document.querySelector('#edad').value = '';
  document.querySelector('#email').value = '';
}

// Función para actualizar la vista de la lista de personas
function actualizarListaPersonas() {
  listaPersonas.innerHTML = '';

  // Obtener el array de personas desde session storage
  let personas = [];
  if (localStorage.getItem('personas')) {
    personas = JSON.parse(localStorage.getItem('personas'));
  }

  // Recorrer el array de personas y agregar cada una a la lista
  personas.forEach((persona, indice) => {
    const li = document.createElement('li');

    const nombre = document.createElement('h2');
    nombre.textContent = persona.nombre;
    li.appendChild(nombre);

    const edad = document.createElement('p');
    edad.textContent = `Edad: ${persona.edad}`;
    li.appendChild(edad);

    const email = document.createElement('p');
    email.textContent = `Email: ${persona.email}`;
    li.appendChild(email);

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
      // Eliminar el objeto de persona correspondiente del array en localStorage
      personas.splice(indice, 1);
      localStorage.setItem('personas', JSON.stringify(personas));

      // Actualizar la vista de la lista
      actualizarListaPersonas();
    });
    li.appendChild(botonEliminar);

    listaPersonas.appendChild(li);
  });
}

// Función para reiniciar la lista de personas
function reiniciarListaPersonas() {
  // Eliminar el array de personas de session storage
  localStorage.removeItem('personas');

  // Actualizar la vista de la lista
  actualizarListaPersonas();
}

// Cargar la lista de personas al cargar la página
actualizarListaPersonas();

// Agregar event listener para el botón de agregar persona
form.addEventListener('submit', agregarPersona);

// Agregar event listener para el botón de reiniciar lista de personas
botonReiniciar.addEventListener('click', reiniciarListaPersonas);

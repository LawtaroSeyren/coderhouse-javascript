// Definición de constantes con los selectores del formulario
const regionSelect = document.getElementById("formRegion");
const pokemonSelect = document.getElementById("formPkmn")
const listaEntrenadores = document.getElementById("listaEntrenadores");
const form = document.getElementById("formulario");

//Deshabilito el selector de Pokémon
pokemonSelect.disabled = true;

//Creo una función que voy a usar más adelante para convertir en mayúscula la primera letra del nombre de los Pokémon 
function capitalizar(nombre) {
    return nombre[0].toUpperCase() + nombre.slice(1);
  }

//Eventlistener para cuando el usuario elija una región en el formulario
regionSelect.addEventListener("change", abrirMenuPokemon);


function abrirMenuPokemon()  {
    const nombreRegion = regionSelect.value;
    let url;

    //Dependiendo del valor de cada opcion del desplegable, cambiará el contenido de url por una que se utilizará después
    switch (nombreRegion) {
        case 'Kanto':
            url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
        break;
        case 'Johto':
            url = 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=100';
        break;
        case 'Hoenn':
            url = 'https://pokeapi.co/api/v2/pokemon?offset=251&limit=135';
        break;
        case 'Sinnoh':
            url = 'https://pokeapi.co/api/v2/pokemon?offset=386&limit=107';
        break;
        case 'Unova':
            url = 'https://pokeapi.co/api/v2/pokemon?offset=493&limit=155';
        break;
        case 'Kalos':
            url = 'https://pokeapi.co/api/v2/pokemon?offset=648&limit=73';
        break;
        case 'Alola':
            url = 'https://pokeapi.co/api/v2/pokemon?offset=721&limit=88';
        break;
        case 'Galar':
            url = 'https://pokeapi.co/api/v2/pokemon?offset=809&limit=97';
        break;
        default:
            pokemonSelect.disabled = true; // Deshabilitar el select de Pokémon si eligen la "región" predefinida
            pokemonSelect.innerHTML = "<option value='' selected>Selecciona un Pokémon</option>" //Si ya eligieron un Pokémon de la lista, pero luego cambian de region y seleccionan la opción predefinida, el menú de Pokémon también volverá a su estado predefinido 
        return;
    }

    //Petición fetch para recibir el nombre de los pokemon dependiendo de la región elegida:
    fetch(url) //La url de la API seleccionada anteriormente
    
    .then(response => response.json()) //Que la respuesta recibida se convierta a json
    .then(data => {
        pokemonSelect.disabled = false; //Habilito select de Pokémon
        pokemonSelect.innerHTML = "<option value='' selected>Selecciona un Pokémon</option>"; //A pesar de habilitarlo, la opción que figura en primer lugar es la predefinida.
            
            
        for (const objetoPkmn of data.results) { 
            const option = document.createElement("option"); //Creo etiqueta option
            let nombrePkmn = objetoPkmn.name;  //Obtengo variable con el nombre del Pokémon
            let nuevoNombrePkmn = capitalizar (nombrePkmn); // Cambio la primera letra por mayúscula
            option.value = nombrePkmn; //Lo que se guarda como value: el nombre normal, que luego sera empleado en otro fetch
            option.textContent = nuevoNombrePkmn; //Lo que lee el usuario: el nombre con mayúscula
            pokemonSelect.appendChild(option); //Añado la opcion al select de Pokémon
        }
    })
}

//////////////////////////////////

// GUARDADO DE DATOS /////////////

//////////////////////////////////

//Clase entrenador
class Entrenador {
    constructor(nombre, edad, region, pokemonElegido) {
      this.nombre = nombre;
      this.edad = edad; //Se guarda un valor de edad a pesar de que en el formulario se pide una fecha ya que se hará una operación más adelante
      this.region = region;
      this.pokemonElegido = pokemonElegido;
    }
}

//Creo array de entrenadores donde se van a guardar los usuarios que se registren en el formulario
let entrenadores = []; 

//Reviso el storage, y si hay entrenadores guardados, restauro la sesión
if (localStorage.getItem('entrenadores')) {
    entrenadores = JSON.parse(localStorage.getItem('entrenadores')) 
}

//Resultado de clickear en el botón "Agregar entrenador":
form.addEventListener("submit", registrarEntrenador);

function registrarEntrenador(evento) {
    evento.preventDefault();

    //Obtengo valores del formulario
    let nombreEntrenador = document.getElementById("nombreEntrenador").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let regionElegida = document.getElementById("formRegion").value;
    let pokemonElegido = document.getElementById("formPkmn").value;

    //Función con librería moment.js para calcular la edad, restando la fecha actual con la fecha de nacimiento ingresada por el usuario
    function convertirFecha() {
        let hoy = moment();
        let edad = hoy.diff(fechaNacimiento,"years");
        return edad;
    }

    let edadEntrenador = convertirFecha();

    //Construyo un objeto de clase Entrenador con todos los valores del formulario, y la edad calculada recién
    let nuevoEntrenador = new Entrenador(nombreEntrenador, edadEntrenador, regionElegida, pokemonElegido, );

    //Agrego el entrenador al array
    entrenadores.push(nuevoEntrenador);

    //Guardo en storage
    localStorage.setItem('entrenadores', JSON.stringify(entrenadores));

    //Reset del formulario
    formulario.reset();

    //Llamo a función que va a mostrar los datos ingresados en pantalla
    mostrarEntrenadores();
};

function mostrarEntrenadores() {
    

    listaEntrenadores.innerHTML = '';

    let entrenadores = [];

    if (localStorage.getItem('entrenadores')) {
        entrenadores = JSON.parse(localStorage.getItem('entrenadores'));
    }

    //Bucle para mostrar cada objeto del array
    entrenadores.forEach((persona, indice) => { //indice me va a servir para borrar elementos individualmente
        
        //Div en donde figurarán los datos, con clase modificable en css
        const nuevoEntrenador = document.createElement('div');
        nuevoEntrenador.classList.add("claseEntrenador");

        fetch(`https://pokeapi.co/api/v2/pokemon/${persona.pokemonElegido.toLowerCase()}`)
        .then((response) => response.json())
        .then((data) => {
            //Obtengo url de la imagen del Pokémon y su número de ID
            const imgSrc = data.sprites.front_default;
            const numID = data.id;

            //Creo el div infoPokemon, con su propia clase
            const infoPokemon = document.createElement("div");
            infoPokemon.classList.add("infoPokemon");

            //Span que incluye el ID del Pokémon
            const idPokemon = document.createElement("span");
            idPokemon.classList.add("idPokemon");
            idPokemon.textContent = `#${numID}`

            //Span que incluye el nombre del Pokémon
            const nombrePokemon = document.createElement("span")
            nombrePokemon.classList.add("nombrePokemon");
            nombrePokemon.textContent = `${capitalizar(persona.pokemonElegido)}`

            //Creo un img src con la url de la imagen, le asigno clase
            const imagenPokemon = document.createElement("img");
            imagenPokemon.src = imgSrc;
            imagenPokemon.classList.add("rounded", "mx-auto", "d-block", "imgPokemon");
                
            //Agrego todo el contenido al div infoPokemon creado recien
            infoPokemon.appendChild(imagenPokemon);

            infoPokemon.appendChild(idPokemon);
                
            infoPokemon.appendChild(nombrePokemon);

            //Agrego todo ese div, al div padre nuevoEntrenador
            nuevoEntrenador.appendChild(infoPokemon);

            //Creo un nuevo div con la data del entrenador
            const infoEntrenador = document.createElement("div");
            const tituloEntrenador = document.createElement('h3');
            tituloEntrenador.classList.add("tituloEntrenador");
            const regionEntrenador = document.createElement('h5');        
            infoEntrenador.classList.add("divEntrenador")
            tituloEntrenador.textContent = `${persona.nombre}, ${persona.edad} años`;
            infoEntrenador.appendChild(tituloEntrenador);

            //Le doy una clase general a la region que compartira cualquiera de las regiones
            regionEntrenador.classList.add("regionBloque")
                
            //Una clase única para cada una de las regiones que cambiará el color con el que se visualizará
            switch (persona.region) {
                case "Kanto":
                    regionEntrenador.classList.add("verde")                
                break;
                case "Johto":
                    regionEntrenador.classList.add("naranja")                
                break;
                case "Hoenn":
                    regionEntrenador.classList.add("rojo")                
                break;
                case "Sinnoh":
                    regionEntrenador.classList.add("azul")                
                break;
                case "Unova":
                    regionEntrenador.classList.add("violeta")                
                break;
                case "Kalos":
                    regionEntrenador.classList.add("rosa")                
                break;
                case "Alola":
                    regionEntrenador.classList.add("celeste")                
                break;
                case "Galar":
                    regionEntrenador.classList.add("gris")                
                break;
            }
        
            //Agrego la región a la data del entrenador
            regionEntrenador.textContent = `${persona.region.toUpperCase()}`;
            infoEntrenador.appendChild(regionEntrenador);
            nuevoEntrenador.appendChild(infoEntrenador);

            //Creo un botón para eliminar el entrenador agregado de la lista y del storage
            const botonEliminar = document.createElement('button');
            botonEliminar.classList.add("botonEliminar")
            botonEliminar.textContent = 'X';
            botonEliminar.addEventListener('click', () => {
                // Eliminar el objeto del entrenador del array a partir de su indice con splice
                entrenadores.splice(indice, 1);
                localStorage.setItem('entrenadores', JSON.stringify(entrenadores));
                    
                // Actualizar la vista de la lista
                mostrarEntrenadores();
            });

        nuevoEntrenador.appendChild(botonEliminar)

        //Sumo todo el div completo a su div padre que muestra a todos los entrenadores con sus pokemon
        listaEntrenadores.appendChild(nuevoEntrenador);

        })
    })
}


mostrarEntrenadores();
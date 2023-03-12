const regionSelect = document.getElementById('region');
regionSelect.addEventListener('change', cargarPokemon);

function cargarPokemon() {
    const region = regionSelect.value;
    let url;
    switch (region) {
      case 'kanto':
        url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
        break;
      case 'johto':
        url = 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=100';
        break;
      case 'hoenn':
        url = 'https://pokeapi.co/api/v2/pokemon?offset=251&limit=135';
        break;
      case 'sinnoh':
        url = 'https://pokeapi.co/api/v2/pokemon?offset=386&limit=107';
        break;
      case 'unova':
        url = 'https://pokeapi.co/api/v2/pokemon?offset=493&limit=155';
        break;
      case 'kalos':
        url = 'https://pokeapi.co/api/v2/pokemon?offset=648&limit=73';
        break;
      case 'alola':
        url = 'https://pokeapi.co/api/v2/pokemon?offset=721&limit=88';
        break;
      case 'galar':
        url = 'https://pokeapi.co/api/v2/pokemon?offset=809&limit=97';
        break;
      default:
        return;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const pokemonSelect = document.getElementById('pokemon');
        pokemonSelect.innerHTML = '';
        for (const pokemon of data.results) {
          const option = document.createElement('option');
          option.value = pokemon.name;
          option.textContent = pokemon.name;
          pokemonSelect.appendChild(option);
        }
      });
  }
  
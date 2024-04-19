
// Função de API para acessar informações do Pokemon
function puxarPokemonAPI(pokemonAPIurl, callback){
    fetch(pokemonAPIurl)
    .then(response => response.json())
    .then(data => {
        var pokemon = {
            nome: data.name,
            numero: data.order,
            sprite: data.sprites.front_default,
            tipos: data.types
        };
        callback(pokemon);   
    })
    .catch(error => {
        console.log('Ocorreu um erro: ', error);
    })
}

// Função de API para acessar informações do Pokedex
function puxarPokedexAPI(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2&offset=0')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            puxarPokemonAPI(pokemon.url, (pokemon) => {
                console.log(pokemon.nome);
            });
        });
    })
    .catch(error => {
        console.log('Ocorreu um erro: ', error);
    })
}

puxarPokedexAPI()


// Função de API para acessar a lista da Pokedex
async function gerarListaPokedexAPI(limit,offset){
    const resultado = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const resultadoJSON = await resultado.json();
    return resultadoJSON;
}

// Função de API para acessar informações do Pokemon
async function pegaDadosAPI(pokemonURL){
    const resultado = await fetch(pokemonURL);
    const resultadoJSON = await resultado.json();
    return resultadoJSON;
}

// Injetar código HTML da Pokedex
async function criarPokedex(limit,offset){
    gerarListaPokedexAPI(limit,offset).then(async (resposta)=>{
        for (const element of resposta.results) {
            await pegaDadosAPI(element.url).then((pokemon)=>{

                // Preparando o HTML do tipo do Pokemon
                var tipoHTML = '';
                pokemon.types.forEach((tipos)=>{
                    tipoHTML = tipoHTML +  `
                        <div>
                            <img src="contents/img/pokemonType/${tipos.type.name}.png" alt="">
                            <span>${(tipos.type.name).charAt(0).toUpperCase()+(tipos.type.name).slice(1)}</span>
                        </div>
                    `;
                });
                
                //Criando o box do Pokemon
                listaPokedex = document.getElementById('lista_pokedex');
                novoPokemon = document.createElement('div');
                novoPokemon.setAttribute("id",pokemon.name)
                novoPokemon.innerHTML =
                `<div id="caixa_pokemon" class="cantos_arredondados_pokedex caixa_pokemon" style="background-color:${corBackgroundTipoPokemon(pokemon.types[0].type.name)}">
                    <div id="cabecalho_pokemon" class="cabecalho_pokemon">
                        <span>${(pokemon.name).charAt(0).toUpperCase()+(pokemon.name).slice(1)}</span>
                        <span>#${(pokemon.id).toString().padStart(3,"0")}</span>
                    </div>
                    <div id="info_pokemon" class="info_pokemon">
                        <div id="tipo_pokemon" class="tipo_pokemon">
                            ${tipoHTML}
                        </div>
                        <div id="imagem_pokemon" class="imagem_pokemon">
                            <img src="${pokemon.sprites.front_default}" alt="">
                        </div>
                    </div>
                </div>`;

                listaPokedex.appendChild(novoPokemon);
            })
        }
    });
}

// Função Cor do Tipo do Pokemon

function corBackgroundTipoPokemon(tipo){
    const cores = {
        'grass': '#38bf4b',
        'fire': '#ff9741',
        'water': '#3692dc',
        'bug': '#a8b820',
        'dark': '#705848',
        'dragon': '#7038f8',
        'electric': '#f8d030',
        'fairy': '#ee99ac',
        'fighting': '#c03028',
        'flying': '#a890f0',
        'ghost': '#705898',
        'ground': '#e0c068',
        'ice': '#98d8d8',
        'normal': '#a8a878',
        'poison': '#a040a0',
        'psychic': '#f85888',
        'rock': '#b8a038',
        'steel': '#b8b8d0',
    };
    return cores[tipo] || '#939393';
}

criarPokedex(20,0);

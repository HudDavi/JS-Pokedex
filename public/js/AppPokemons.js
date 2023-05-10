import pokeApi from './ApiPokemons.js';

const list = document.getElementById('list')
const button = document.getElementById('button')

const maxRecords = 600
const limit = 20
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="item ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        list.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

button.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)
        button.parentElement.removeChild(button)
    } else {
        loadPokemonItens(offset, limit)
    }
})
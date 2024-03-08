
/*pokemon x nombre*/
async function obtenerDetallesPokemon(name){
    const url=`https://pokeapi.co/api/v2/pokemon/${name}`
    try {
       const respuesta=await fetch(url);
       const data=await respuesta.json();
        return data;
    } catch (error) {``
        console.error();
    }
}

obtenerDetallesPokemon('bulbasaur')
.then(data=>console.log(data))
.catch(error => console.error());

/*Habilidades pokemon*/
async function obtenerHabilidades(name) {
    try {
        const datosPokemon = await obtenerDetallesPokemon(name);
        const habilidades = datosPokemon.abilities.map(habilidad => habilidad.ability.name);
        return habilidades;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener habilidades');
    }
}
obtenerHabilidades('bulbasaur')
    .then(habilidades => console.log(habilidades))
    .catch(error => console.error(error));

/*tipo de pokemon*/
async function tipoPokemon(tipo) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
        const data = await response.json();
        return data.pokemon.map(pokemon => pokemon.pokemon.name);
    } catch (error) {
        console.error(error);
    }
}

tipoPokemon('water')
    .then(pokemon => console.log(pokemon))
    .catch(error => console.error(error));



/*Lista poquemones*/

async function obtenerPokemon50(){
    const response= await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`)
    const data=await response.json();
    const listaPokemon=data.results.map(entry=>entry.name)
    return listaPokemon;
}
obtenerPokemon50()
.then (listaPokemon=>console.log(listaPokemon))
.catch(error=>console.error(error));


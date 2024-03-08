async function obtenerPokemonYEvolucion(nombrePokemon) {
    try {
        const respuestaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`);
        const datosPokemon = await respuestaPokemon.json();
        
        const tipoPokemon = datosPokemon.types[0].type.name;

        const urlEspecie = datosPokemon.species.url;
        const respuestaEspecie = await fetch(urlEspecie);
        const datosEspecie = await respuestaEspecie.json();
        const urlCadenaEvolucion = datosEspecie.evolution_chain.url;

        const respuestaCadenaEvolucion = await fetch(urlCadenaEvolucion);
        const datosCadenaEvolucion = await respuestaCadenaEvolucion.json();

        const detallesPokemon = {
            nombre: nombrePokemon,
            tipo: tipoPokemon,
        };

        const detallesEvolucion = {
            nombre: datosCadenaEvolucion.chain.species.name,
            url: datosCadenaEvolucion.chain.species.url,
        };

        const respuestaEvolucion = await fetch(detallesEvolucion.url);
        const datosEvolucion = await respuestaEvolucion.json();

        if (datosEvolucion.types && datosEvolucion.types.length > 0) {
            detallesEvolucion.tipo = datosEvolucion.types[0].type.name;
        } else {
            detallesEvolucion.tipo = "Desconocido";
        }

        return { pokemon: detallesPokemon, evolucion: detallesEvolucion };
    } catch (error) {
        console.error("Ocurrió un error:", error.message);
        throw error;
    }
}

// Ejemplo de uso:
obtenerPokemonYEvolucion("pikachu")
    .then(data => console.log(data))
    .catch(error => console.error(error));

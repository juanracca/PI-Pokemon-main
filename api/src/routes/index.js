const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const { Pokemon, Type } = require('../db');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {

    const apiUrl1 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40');
    let  data1 =  await Promise.all(apiUrl1.data.results.map(async el => {
        let dataPokemon = await axios.get(el.url);
        let pokemons = {
            name: el.name,
            id: dataPokemon.data.id,
            image: dataPokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            types: dataPokemon.data.types.map(poke => poke.type.name),
        };

        return pokemons;

    }));

    return data1;

};

const getDbInfo = async () => {

    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
};

const getAllPokemons = async () => {

    const pokemonsApi = await getApiInfo();
    const pokemonsDb = await getDbInfo();
    const allPokemons = pokemonsApi.concat(pokemonsDb);

    return allPokemons;

};

router.get('/pokemons', async (req, res) => {
    const name = req.query.name;
    let pokemons = await getAllPokemons();

    if(name){
        let pokemonName = await pokemons.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(400).send('Pokemon was not found!');
    } else {
        res.status(200).send(pokemons)
    };
});

router.get('/pokemons/:id', async (req, res) => {

    const id = req.params.id;

    if(id.length > 3){
        const pokemonsTotal = await getAllPokemons();
        const pokemonId = await pokemonsTotal.filter(el => el.id === id);
        console.log(pokemonId)
        pokemonId.length ?
        res.status(200).send(pokemonId[0]) :
        res.status(400).send('Pokemon not found');
    };
    const pokemonDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = pokemonDetail.data;
    const pokemonData = {
        name: pokemon.name,
        id: pokemon.id,
        image: pokemon.sprites.versions['generation-v']['black-white'].animated.front_default,
        height: pokemon.height,
        weight: pokemon.weight,
        types: pokemon.types.map(poke => poke.type.name),
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
    };
    console.log(pokemonData)
    res.status(200).send(pokemonData);
});

router.get('/types', async (req, res) => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    const typesApiNames = typesApi.data.results.map(el => el.name);

    typesApiNames.forEach(el => {
        Type.findOrCreate({
            where: {name: el}
        });
    });

    const allTypes = await Type.findAll();
    res.status(200).send(allTypes);
});

module.exports = router;

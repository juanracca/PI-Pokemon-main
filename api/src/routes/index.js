const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const { Pokemon, Type } = require('../db');
const e = require('express');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl1 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=9');
    let  data1 =  await Promise.all(apiUrl1.data.results.map(async el => {
        let dataPokemon = await axios.get(el.url);
        let pokemons = {
            name: el.name,
            id: dataPokemon.data.id,
            img: dataPokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            height: dataPokemon.data.height,
            weight: dataPokemon.data.weight,
            types: dataPokemon.data.types.map(poke => poke.type.name),
            stats: dataPokemon.data.stats.map(el => (el.stat.url)),
        };
        
        console.log(pokemons);
        return pokemons;
    }));

    return data1;

    

    // const dataUrl = data1.map(el => await axios.get())
    // IDEA: tengo que sacar el numero de pokemon para poder hacer una request a la url de cada pokemon
    // const namePokemonApi =  await apiUrl1.data.results.map(el => {
    //     return {
    //         name: el.name,
    //         image: el.url
    //     }
    // });
    // const idPokmeonApi = await apiUrl1.data.results.map(el => el.url)
    // sprites.versions.generation-v.black-white.animated.front_default;
    // return idPokmeonApi;
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

router.get('/pokemons', async (req, res) =>{
    const name = req.query.name;
    let pokemons = await getApiInfo();
// console.log(pokemons)
    if(name){
        let pokemonName = await pokemons.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(400).send('Pokemon was not found!');
    } else {
        res.status(200).send(pokemons)
    };
});
console.log(getApiInfo())
module.exports = router;

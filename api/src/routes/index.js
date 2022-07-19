const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const { Pokemon, Type } = require('../db');
const e = require('express');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//PRIMEROS 40 POKEMONES
const getApiInfo40 = async () => {
    const apiUrl1 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40');
    let poData1 = apiUrl1.data.results;
    let  data1 =  await Promise.all(poData1.map(async el => {
        let dataPokemon = await axios.get(el.url);
        let pokemons = {
            name: el.name,
            id: dataPokemon.data.id,
            image: dataPokemon.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            types: dataPokemon.data.types.map(poke => poke.type.name),
            hp: dataPokemon.data.stats[0].base_stat,
            attack: dataPokemon.data.stats[1].base_stat,
            defense: dataPokemon.data.stats[2].base_stat,
            speed: dataPokemon.data.stats[5].base_stat,
            height: dataPokemon.data.height,
            weight: dataPokemon.data.weight,
        };
        console.log(pokemons)
        return pokemons;
    }));   
    return data1;
};
const getDbPokemons = async () => {
    let totalPokemons =  await getApiInfo40();
    console.log(totalPokemons)
    totalPokemons.forEach(element => {
        Pokemon.findOrCreate({
            where: {
                id: element.id,
                name: element.name,
                image: element.image,
                hp: element.hp,
                attack: element.attack,
                defense: element.defense,
                speed: element.speed,
                height: element.height,
                weight: element.weight,
            }
        });
    });
    console.log(Pokemon);
};
//DE 40 A 70 POKEMONES
const getApiInfo70 = async () => {
    const apiUrl2 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=40&limit=30');
    const poData2 = apiUrl2.data.results;
    let data2 = await Promise.all(poData2.map(async el => {
        let dataPokemon2 = await axios.get(el.url);
        let pokemons2 = {
            name: el.name,
            id: dataPokemon2.data.id,
            image: dataPokemon2.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            types: dataPokemon2.data.types.map(poke => poke.type.name),
            hp: dataPokemon2.data.stats[0].base_stat,
            attack: dataPokemon2.data.stats[1].base_stat,
            defense: dataPokemon2.data.stats[2].base_stat,
            speed: dataPokemon2.data.stats[5].base_stat,
            height: dataPokemon2.data.height,
            weight: dataPokemon2.data.weight,
        };
        console.log(pokemons2)
        return pokemons2;
    }));
    return data2;
};
const getDbPokemons2 = async () => {
    let totalPokemons2 =  await getApiInfo70();
    console.log(totalPokemons2)
    totalPokemons2.forEach(element => {
        Pokemon.findOrCreate({
            where: {
                id: element.id,
                name: element.name,
                image: element.image,
                hp: element.hp,
                attack: element.attack,
                defense: element.defense,
                speed: element.speed,
                height: element.height,
                weight: element.weight,
            }
        });
    });
    console.log(Pokemon);
};
//DE 70 A 100 POKEMONES
const getApiInfo100 = async () => {
    const apiUrl3 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=70&limit=30');
    const poData3 = apiUrl3.data.results;
    let data3 = await Promise.all(poData3.map(async el => {
        let dataPokemon3 = await axios.get(el.url);
        let pokemons3 = {
            name: el.name,
            id: dataPokemon3.data.id,
            image: dataPokemon3.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            types: dataPokemon3.data.types.map(poke => poke.type.name),
            hp: dataPokemon3.data.stats[0].base_stat,
            attack: dataPokemon3.data.stats[1].base_stat,
            defense: dataPokemon3.data.stats[2].base_stat,
            speed: dataPokemon3.data.stats[5].base_stat,
            height: dataPokemon3.data.height,
            weight: dataPokemon3.data.weight,
        };
        console.log(pokemons3)
        return pokemons3;
    }));
    return data3;
};
const getDbPokemons3 = async () => {
    let totalPokemons3 =  await getApiInfo100();
    console.log(totalPokemons3)
    totalPokemons3.forEach(element => {
        Pokemon.findOrCreate({
            where: {
                id: element.id,
                name: element.name,
                image: element.image,
                hp: element.hp,
                attack: element.attack,
                defense: element.defense,
                speed: element.speed,
                height: element.height,
                weight: element.weight,
            }
        });
    });
    console.log(Pokemon);
};
// DE 100 A 130 POKEMONES
const getApiInfo125 = async () => {
    const apiUrl4 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=100&limit=25');
    const poData4 = apiUrl4.data.results;
    let data4 = await Promise.all(poData4.map(async el => {
        let dataPokemon4 = await axios.get(el.url);
        let pokemons4 = {
            name: el.name,
            id: dataPokemon4.data.id,
            image: dataPokemon4.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            types: dataPokemon4.data.types.map(poke => poke.type.name),
            hp: dataPokemon4.data.stats[0].base_stat,
            attack: dataPokemon4.data.stats[1].base_stat,
            defense: dataPokemon4.data.stats[2].base_stat,
            speed: dataPokemon4.data.stats[5].base_stat,
            height: dataPokemon4.data.height,
            weight: dataPokemon4.data.weight,
        };
        console.log(pokemons4)
        return pokemons4;
    }));
    return data4;
};
const getDbPokemons4 = async () => {
    let totalPokemons4 =  await getApiInfo125();
    console.log(totalPokemons4)
    totalPokemons4.forEach(element => {
        Pokemon.findOrCreate({
            where: {
                id: element.id,
                name: element.name,
                image: element.image,
                hp: element.hp,
                attack: element.attack,
                defense: element.defense,
                speed: element.speed,
                height: element.height,
                weight: element.weight,
            }
        });
    });
    console.log(Pokemon);
};
// DE 125 A 151 POKEMONES (PRIMERA GENERACION)
const getApiInfo151 = async () => {
    const apiUrl5 = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=125&limit=26');
    const poData5 = apiUrl5.data.results;
    let data5 = await Promise.all(poData5.map(async el => {
        let dataPokemon5 = await axios.get(el.url);
        let pokemons5 = {
            name: el.name,
            id: dataPokemon5.data.id,
            image: dataPokemon5.data.sprites.versions['generation-v']['black-white'].animated.front_default,
            types: dataPokemon5.data.types.map(poke => poke.type.name),
            hp: dataPokemon5.data.stats[0].base_stat,
            attack: dataPokemon5.data.stats[1].base_stat,
            defense: dataPokemon5.data.stats[2].base_stat,
            speed: dataPokemon5.data.stats[5].base_stat,
            height: dataPokemon5.data.height,
            weight: dataPokemon5.data.weight,
        };
        console.log(pokemons5)
        return pokemons5;
    }));
    return data5;
};
const getDbPokemons5 = async () => {
    let totalPokemons5 =  await getApiInfo151();
    console.log(totalPokemons5)
    totalPokemons5.forEach(element => {
        Pokemon.findOrCreate({
            where: {
                id: element.id,
                name: element.name,
                image: element.image,
                hp: element.hp,
                attack: element.attack,
                defense: element.defense,
                speed: element.speed,
                height: element.height,
                weight: element.weight,
            }
        });
    });
    console.log(Pokemon);
};
//--------------------------------------------------------------->


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

router.get('/pokemonsDb', async (req, res) => {

    const dbPokemons = await Pokemon.findAll();
    res.status(200).send(dbPokemons);
    
});

//------------------------------------------------------->

router.get('/pokemons', async (req, res) => {
    const name = req.query.name;
    let pokemons = await getDbPokemons();

    if(name){
        let pokemonName = await pokemons.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName.length ?
        res.status(200).send(pokemonName) :
        res.status(400).send('Pokemon was not found!');
    } else {
        res.status(200).send(pokemons)
    };
});
router.get('/pokemons2', async (req, res) => {
    const name = req.query.name;
    let pokemons2 = await getDbPokemons2();

    if(name){
        let pokemonName2 = await pokemons2.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName2.length ?
        res.status(200).send(pokemonName2) :
        res.status(400).send('Pokemon was not found!');
    } else {
        res.status(200).send(pokemons2)
    };
});
router.get('/pokemons3', async (req, res) => {
    const name = req.query.name;
    let pokemons3 = await getDbPokemons3();

    if(name){
        let pokemonName3 = await pokemons3.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName3.length ?
        res.status(200).send(pokemonName3) :
        res.status(400).send('Pokemon was not found!');
    } else {
        res.status(200).send(pokemons3)
    };
});
router.get('/pokemons4', async (req, res) => {
    const name = req.query.name;
    let pokemons4 = await getDbPokemons4();

    if(name){
        let pokemonName4 = await pokemons4.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName4.length ?
        res.status(200).send(pokemonName4) :
        res.status(400).send('Pokemon was not found!');
    } else {
        res.status(200).send(pokemons4)
    };
});
router.get('/pokemons5', async (req, res) => {
    const name = req.query.name;
    let pokemons5 = await getDbPokemons5();

    if(name){
        let pokemonName5 = await pokemons5.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        pokemonName5.length ?
        res.status(200).send(pokemonName5) :
        res.status(400).send('Pokemon was not found!');
    } else {
        res.status(200).send(pokemons5)
    };
});


//----------------------------------------------------------------->
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

router.post('/pokemon', async (req, res) => {

    let {
        id,
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height, 
        weight,
        type,
    } = req.body;

    try {

        let pokemonCreated = await Pokemon.create({
            id, name, image, hp, attack, defense, speed, height, weight
        });
        let typeDb = await Type.findAll({
            where: { name: type }
        });

        pokemonCreated.addType(typeDb);
        console.log(pokemonCreated)

        res.status(200).send('Pokemon created succesfully!');

    } catch(err) {

        res.status(400).send(err);
    
    };    
});

router.delete('/pokemon/:id', async (req, res) => {
    const id = req.params.id;

    if(!id){
        return res.status(400).send({
            message: 'Can not delete without Pokemon id'
        });
    }; 
    const pokemonDelete = await Pokemon.findOne({
        where: {
            id,
        },
    });
    if(!pokemonDelete){
        return res.status(400).send({
            message: `Can not find the Pokemon whit id ${id}`
        });
    };
    try{
        await pokemonDelete.destroy();
        return res.status(200).send({
            message: `Pokemon whit id ${id} succesfully deleted`
        });
    } catch(er){
        return res.status(400).send({
            message: `Error: ${err.message}`
        });
    };
});

module.exports = router;

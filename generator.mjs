#!/usr/bin/env zx

const data = await fs.readJson("./db.json");

// for (let i = 1; i <= 600; i++) {
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
//   const result = await response.json();

//   const pokemon = {
//     id: result.id,
//     name: result.name,
//     height: result.height,
//     weight: result.weight,
//     stats: result.stats.map(({ stat, base_stat }) => ({
//       name: stat.name,
//       stat: base_stat,
//     })),
//     types: result.types.map(({ type }) => type.name),
//     image: result.sprites.front_default,
//     image_hd: result.sprites.other.dream_world.front_default 
//   }

//   data.pokemons.push(pokemon);
// }

const types = new Set();

data.pokemons = data.pokemons.slice(0, 50);
data.pokemons = data.pokemons.map((pokemon) => {
  const image = pokemon.image.split("/");
  const image_hd = pokemon.image_hd.split("/");

  pokemon.types.forEach((type) => {
    types.add(type);
  });

  return {
    id: pokemon.id,
    name: pokemon.name,
    size: [ pokemon.height, pokemon.width ],
    stats: pokemon.stats.map(({ name, stat }) => ([ name, stat ])),
    types: pokemon.types,
    image: [
      image[image.length -1],
      image_hd[image_hd.length -1],
    ]
  }
}).map(pokemon => {
  const items = [ ...types ];
  const typeId = pokemon.types.map(type => items.indexOf(type));

  pokemon.types = typeId;

  return pokemon;
});

const fTypes = ([...types]).map((type, index) => ({ id: index, name: type }))

await fs.writeJson('./db.test.json', { types: fTypes, ...data });
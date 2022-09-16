#!/usr/bin/env zx

const data = await fs.readJson("./db.json");

for (let i = 1; i <= 600; i++) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
  const result = await response.json();

  const pokemon = {
    id: result.id,
    name: result.name,
    height: result.height,
    weight: result.weight,
    stats: result.stats.map(({ stat, base_stat }) => ({
      name: stat.name,
      stat: base_stat,
    })),
    types: result.types.map(({ type }) => type.name),
    image: result.sprites.front_default,
    image_hd: result.sprites.other.dream_world.front_default 
  }

  data.pokemons.push(pokemon);
}

await fs.writeJson('./db.json', data);
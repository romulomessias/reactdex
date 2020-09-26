import { dataFolder } from "./infra/constants";
import fs from "fs";
import { getPokemonData } from "./services/pokemon/getPokemonDetails";
import { getPokemonList } from "./services/pokemon/getPokemonList";

console.log("Starting");
console.time("all");

getPokemonList().then((pokemon) => {
  let tmpPokemon = [...pokemon];

  const extractData = (max: number, current: number) => {
    if (current >= max) {
      console.log("Finished");
      console.time("all");
      return;
    }

    const it = pokemon[current];
    console.log(it.number, new Date());
    console.time(it.number);
    getPokemonData(it.defaultName).then((data) => {
      tmpPokemon[current] = {
        ...it,
        ...data,
      };

      fs.writeFileSync(
        dataFolder + `/pokemon-details/${it.number}.json`,
        JSON.stringify(tmpPokemon[current], null, 4)
      );

      console.timeEnd(it.number);
      setTimeout(() => {
        extractData(pokemon.length, current + 1);
      }, 500);
    });
  };

  extractData(pokemon.length, 0);
});

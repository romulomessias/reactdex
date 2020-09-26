import { dataFolder } from '../../infra/constants';

import axios from "axios";
import { JSDOM } from "jsdom";
import fs from "fs";

export async function getPokemonList() {
  let pokemon: Array<any> = [];
  const response = await axios.get("https://pokemondb.net/pokedex/national");

  const dom = new JSDOM(response.data);
  const document = dom.window.document;
  const gensIds = [
    "gen-1",
    "gen-2",
    "gen-3",
    "gen-4",
    "gen-5",
    "gen-6",
    "gen-7",
    "gen-8",
  ];

  gensIds.forEach((gen, index) => {
    const genElement = document.getElementById(gen);

    if (genElement) {
      const newPokesmon = extractPokemonList(
        genElement.nextElementSibling,
        index + 1
      );
      pokemon = [...pokemon, ...newPokesmon];
    }
  });

  fs.writeFileSync(dataFolder + "/pokemon.json", JSON.stringify(pokemon));

  return pokemon;
}

function extractPokemonList(element, gen) {
  const elements = [...element.children];
  const pokemon: Array<any> = [];

  elements.forEach((item) => {
    pokemon.push(extractPokemonDataFromElement(item, gen));
  });

  return pokemon;
}

function extractPokemonDataFromElement(item, gen) {
  const [_, dataElement] = [...item.children];

  const [numberElement, br1, nameElement, br2, typesElement] = [
    ...dataElement.children,
  ];
  const [type1Element, type2Element] = [...typesElement.children];
  const types = [];

  const number = numberElement.textContent.replace("#", "");
  const name = nameElement.textContent;
  types.push(type1Element.textContent.toLocaleLowerCase());

  if (type2Element) {
    types.push(type2Element.textContent.toLocaleLowerCase());
  }

  const pokemon = {
    generation: gen,
    number,
    defaultName: name,
    types,
  };
  return pokemon;
}

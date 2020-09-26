import { dataFolder } from "../../infra/constants";
import fs from "fs";
import { DOMWindow, JSDOM } from "jsdom";

export async function getPokemonData(pokemonName: string) {
  const name = pokemonName
    .replace(":", "")
    .replace(".", "")
    .replace(" ", "-")
    .replace("♀", "-f")
    .replace("♂", "-m")
    .replace("'", "")
    .replace(/é/gi, "e");

  const url = `https://pokemondb.net/pokedex/${name}`;
  const path = `${dataFolder}/pages/${name}.html`;

  let data = {};

  try {
    console.time(pokemonName);
    console.log("getting data for ", pokemonName, url);
    let window: DOMWindow;

    if (!fs.existsSync(path)) {
      console.log("fetching page for ", pokemonName);
      let DOM = (await JSDOM.fromURL(url)).window;
      fs.writeFileSync(path, DOM.window.document.documentElement.innerHTML);
      window = DOM.window;
    } else {
      console.log("loading file for ", pokemonName);
      const data = fs.readFileSync(path, "utf8");
      // html = JSON.stringify(data);
      let DOM = await JSDOM.fromFile(path);
      window = DOM.window;
    }

    const { document } = window;

    let formsElements = getPokemonForms(document);
    let formsDetails = {};
    let forms = [];

    const formNameToSlug = (formName: string) => {
      const [first, ...parts] = formName.split(" ");

      return [first.toLowerCase(), ...parts].join("");
    };

    formsElements.forEach((it) => {
      console.log(`\t ${it.name} - ${formNameToSlug(it.name)}`);

      forms.push(it.name);

      let stats = getPokemonStats(it.element);
      let info = getPokemonBasicInfo(it.element);

      formsDetails[formNameToSlug(it.name)] = { name: it.name, stats, info };
    });

    data = {
      forms,
      formsDetails,
    };

    console.timeEnd(pokemonName);
    console.log("finished getting data for ", pokemonName);
    console.log("----");
  } catch (e) {
    console.log("ERROR: getting data for ", pokemonName, url);
    console.error(e);
  }

  return data;
}

interface EntryData {
  name: string;
  element: Element;
}

function getPokemonForms(document: Document) {
  const { nextElementSibling: dexBasics } = document.getElementById(
    "dex-basics"
  );
  const [tabList, tabPanelList] = Array.from(dexBasics.children);

  const formsElements = Array.from(tabList.children);
  const formsDetailsElements = Array.from(tabPanelList.children);

  return formsElements.map((it, index) => {
    let entry: EntryData = {
      name: it.textContent,
      element: formsDetailsElements[index],
    };

    return entry;
  });
}

function getPokemonBasicInfo(document: Element) {
  const [container] = Array.from(document.children);
  const [imgElement, dataElement, trainingContainer] = Array.from(
    container.children
  );

  let info = {};

  let [table] = Array.from(dataElement.getElementsByClassName("vitals-table"));
  if (!table) return {};
  let trs = Array.from(table.getElementsByTagName("tr"));

  function extractRegularData(element: HTMLTableRowElement) {
    const [_, contentElement] = Array.from(element.children);
    return contentElement.textContent;
  }

  function extractRegularType(element: HTMLTableRowElement) {
    const [_, contentElement] = Array.from(element.children);
    const types = Array.from(contentElement.children);
    return types.map((it) => it.textContent.toLowerCase());
  }

  function extractRegularAbilities(element: HTMLTableRowElement) {
    const [_, contentElement] = Array.from(element.children);
    const abilitiesElements = Array.from(contentElement.children);

    function getAbility(element: Element) {
      const [abilityElement] = Array.from(element.children);
      const innerText = element.textContent;

      // console.log(
      //   "\t",
      //   abilityElement.textContent,
      //   innerText.includes("hidden ability")
      // );

      return {
        name: abilityElement.textContent,
        isHidden: innerText.includes("hidden ability"),
      };
    }

    return abilitiesElements
      .filter((it) => it.nodeName.toLowerCase() !== "br")
      .map((it) => getAbility(it));
  }

  let [
    numberElement,
    typeElement,
    speciesElement,
    heightElement,
    weightElement,
    abilitiesElement,
  ] = trs;

  info = {
    number: extractRegularData(numberElement),
    species: extractRegularData(speciesElement),
    height: extractRegularData(heightElement),
    weight: extractRegularData(weightElement),
    types: extractRegularType(typeElement),
    abilities: extractRegularAbilities(abilitiesElement),
  };

  return info;
}

function getPokemonStats(document: Element) {
  const [_, statsElement] = Array.from(document.children);

  let [table] = Array.from(statsElement.getElementsByClassName("vitals-table"));
  if (!table) return {};

  let statNames = ["hp", "attack", "defense", "spAtk", "spDef", "speed"];
  let trs = Array.from(table.getElementsByTagName("tr"));

  function extractStat(element: HTMLTableRowElement, name: string) {
    const [
      nameElement,
      baseValueElement,
      _,
      minElement,
      maxElement,
    ] = Array.from(element.children);

    return {
      [name]: {
        base: baseValueElement.textContent,
        min: minElement.textContent,
        max: maxElement.textContent,
      },
    };
  }

  const stats = trs
    .slice(0, 6)
    .map((it, index) => extractStat(it, statNames[index]))
    .reduce((acc, current) => ({
      ...acc,
      ...current,
    }));

  return stats;
}

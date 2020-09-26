export default interface Pokemon {
  generation: number;
  number: string;
  defaultName: string;
  types: Array<string>;
  forms?: string[];
  formsDetails?: Record<string, PokemonForm>;
}

export interface PokemonForm {
  name: string;
  stats: Stats;
  info: Info;
}

export interface Info {
  number: string;
  species: string;
  height: string;
  weight: string;
  types: string[];
  abilities: Ability[];
}

export interface Ability {
  name: string;
  isHidden: boolean;
}

export interface Stats {
  hp: StatData;
  attack: StatData;
  defense: StatData;
  spAtk: StatData;
  spDef: StatData;
  speed: StatData;
}

export interface StatData {
  base: number;
  min: number;
  max: number;
}
export const PokemonURI: string = "https://pokeapi.co/api/v2/pokemon/";
export const FormURI: string = "https://pokeapi.co/api/v2/pokemon-form/";

export const GET_POKEMON_SUCCESS = "GET_POKEMON_SUCCESS";
export const GET_POKEMON_FAILURE = "GET_POKEMON_FAILURE";
export const GET_POKEMON_LOADING = "GET_POKEMON_LOADING";
export const SWITCH_POKEMON_FORM = "SWITCH_POKEMON_FORM";
export const SWITCH_POKEMON_VARIETY = "SWITCH_POKEMON_VARIETY";

export type PokemonTypeTypes =  'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' | 'unknown' | 'shadow'

export type PokemonGenderType = 'genderless' | 'male' | 'female' | 'both'

export type PokemonAlt = {
  name: string,
  link: string,
  type: PokemonAltOption
}

type PokemonAltOption = 'form' | 'variety'

export interface DefaultPokemonStateI {
  Loading: boolean,
  Failure: boolean,
  Pokemon?: PokemonType,
}

export type PokemonType = {
  id: number,
  name: string,
  sprites: PokemonSprites,
  stats: PokemonStat[],
  types: PokemonTypeTypes[],
  weight: number,
  height: number,
  canAddToParty: boolean,
  flavorTexts: PokemonFlavorText[],
  genderType: PokemonGenderType,
  alts: PokemonAlt[]
}

export type PokemonSprites = {
  back_default: string,
  back_female: string,
  back_shiny: string,
  back_shiny_female: string,
  front_default: string,
  front_female: string,
  front_shiny: string,
  front_shiny_female: string,
  official_artwork: string
}

export type PokemonFlavorText = {
  flavorText: string,
  version: string
}

export type PokemonStat = {
  base: number,
  name: string
}

export type SwitchPokemonFormData = {
  newId: number,
  newName: string,
  newSprites: PokemonSprites,
  newTypes: PokemonType[]
}

export interface GetPokemonSuccess {
  type: typeof GET_POKEMON_SUCCESS,
  payload: PokemonType
}

export interface GetPokemonFailure {
  type: typeof GET_POKEMON_FAILURE,
}

export interface GetPokemonLoading {
  type: typeof GET_POKEMON_LOADING,
}


export type GetPokemonDispatchTypes = GetPokemonSuccess | GetPokemonFailure | GetPokemonLoading 
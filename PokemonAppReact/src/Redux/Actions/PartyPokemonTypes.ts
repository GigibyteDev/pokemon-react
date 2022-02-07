import {PokemonGenderType, PokemonType} from './PokemonTypes';

export const ADD_POKEMON = "ADD_POKEMON";
export const REMOVE_POKEMON = "REMOVE_POKEMON";
export const CLEAR_POKEMON = "CLEAR_POKEMON";

export interface DefaultPartyStateI {
  PartyPokemon: PartyPokemonType[]
}

export type PartyPokemonType = {
  PokemonData: PokemonType,
  gender: PokemonGenderType,
  isShiny: boolean
}

interface AddPokemon {
    type: typeof ADD_POKEMON,
    payload: PartyPokemonType
}

interface RemovePokemon {
  type: typeof REMOVE_POKEMON,
  payload: number
}
interface ClearPokemon {
  type: typeof CLEAR_POKEMON
}

export type PartyPokemonDispatchTypes = AddPokemon | RemovePokemon | ClearPokemon;


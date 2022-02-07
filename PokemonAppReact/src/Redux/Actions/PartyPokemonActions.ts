import {
  PartyPokemonType, 
  PartyPokemonDispatchTypes,
  ADD_POKEMON,
  REMOVE_POKEMON,
  CLEAR_POKEMON
} from './PartyPokemonTypes';

import {
  PokemonGenderType,
  PokemonType
} from './PokemonTypes';
import {Dispatch} from 'redux';

export const AddPartyPokemonAction = (pokemon: PokemonType, gender: PokemonGenderType, isShiny: boolean) => (dispatch: Dispatch<PartyPokemonDispatchTypes>) => {

  dispatch({
    type: ADD_POKEMON,
    payload: {
      PokemonData: pokemon,
      gender: gender,
      isShiny: isShiny
    } as PartyPokemonType
  })
}

export const RemovePartyPokemonAction = (pokedex: number) => (dispatch: Dispatch<PartyPokemonDispatchTypes>) => {
  dispatch({
    type: REMOVE_POKEMON,
    payload: pokedex
  })
}

export const ClearPartyPokemonAction = () => (dispatch: Dispatch<PartyPokemonDispatchTypes>) => {
  dispatch({
    type: CLEAR_POKEMON
  })
}
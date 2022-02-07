import {
  DefaultPartyStateI,
  PartyPokemonDispatchTypes,
  ADD_POKEMON,
  REMOVE_POKEMON,
  CLEAR_POKEMON
} from '../Actions/PartyPokemonTypes';

const defaultState: DefaultPartyStateI = {
  PartyPokemon: []
}

export const PartyReducer = (state: DefaultPartyStateI = defaultState, action: PartyPokemonDispatchTypes): DefaultPartyStateI => {
  switch (action.type){
    case ADD_POKEMON:
      return {
        PartyPokemon: [...state.PartyPokemon, action.payload]
      }
    case REMOVE_POKEMON:
      return {
        PartyPokemon: state.PartyPokemon.filter(pokemon => pokemon.PokemonData.id !== action.payload)
      }
    case CLEAR_POKEMON:
      return defaultState;
    default:
      return state;
  }
}
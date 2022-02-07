import { 
  GET_POKEMON_SUCCESS,
  GET_POKEMON_LOADING,
  GET_POKEMON_FAILURE,
  DefaultPokemonStateI, 
  GetPokemonDispatchTypes, 
} from '../Actions/PokemonTypes';

const defaultState: DefaultPokemonStateI = {
  Loading: false,
  Failure: false,
}

export const PokemonReducer = (state: DefaultPokemonStateI = defaultState, action: GetPokemonDispatchTypes): DefaultPokemonStateI => {
  switch (action.type){
    case GET_POKEMON_SUCCESS:
      return {
        Loading: false,
        Failure: false,
        Pokemon: action.payload
      }
    case GET_POKEMON_LOADING:
      return {
        ...state,
        Loading: true,
      }
    case GET_POKEMON_FAILURE:
      return {
        ...state,
        Loading: false,
        Failure: true,
      }
    default:
      return {
        ...state
      }
  }
}
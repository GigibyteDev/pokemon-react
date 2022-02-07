import {combineReducers} from 'redux';
import { PokemonReducer } from './PokemonReducer';
import { PartyReducer } from './PartyReducer';

export const RootReducer = combineReducers({
  Pokemon: PokemonReducer,
  Party: PartyReducer
})
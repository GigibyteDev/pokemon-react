import {
  GetPokemonDispatchTypes, 
  PokemonType, 
  PokemonAlt,
  PokemonURI,
  FormURI,
  PokemonStat,
  PokemonSprites,
  GET_POKEMON_SUCCESS,
  GET_POKEMON_LOADING,
  GET_POKEMON_FAILURE,
  PokemonFlavorText,
  PokemonGenderType,
} from './PokemonTypes';
import { Dispatch } from 'redux';
import axios from 'axios';

const assignsprites = (data: any): PokemonSprites => {
  return {
    back_default: data.sprites.back_default,
    back_female: data.sprites.back_female,
    back_shiny: data.sprites.back_shiny,
    back_shiny_female: data.sprites.back_shiny_female,
    front_default: data.sprites.front_default,
    front_female: data.sprites.front_female,
    front_shiny: data.sprites.front_shiny,
    front_shiny_female: data.sprites.front_shiny_female,
    official_artwork: data.sprites.other['official-artwork'].front_default 
  }
}
  export const SwitchPokemon = (currentPokemon: PokemonType, newPokemon: PokemonAlt) => async (dispatch:   Dispatch<GetPokemonDispatchTypes>) => {
    try {
      dispatch({
        type: GET_POKEMON_LOADING
      })

      let pokemonFormData = await axios(FormURI + newPokemon.link); 

      let updatedPokemon = {
        ...currentPokemon,
        types: pokemonFormData.data.types.map((type: any) => type.type.name),
        sprites: {
          ...currentPokemon.sprites,
          back_default: pokemonFormData.data.sprites.back_default,
          back_female: pokemonFormData.data.sprites.back_female,
          back_shiny: pokemonFormData.data.sprites.back_shiny,
          back_shiny_female: pokemonFormData.data.sprites.back_shiny_female,
          front_default: pokemonFormData.data.sprites.front_default,
          front_female: pokemonFormData.data.sprites.front_female,
          front_shiny: pokemonFormData.data.sprites.front_shiny,
          front_shiny_female: pokemonFormData.data.sprites.front_shiny_female,
        },
        name: pokemonFormData.data.name,
      } as PokemonType

      dispatch({
        type: GET_POKEMON_SUCCESS,
        payload: updatedPokemon
      })
    }
    catch (e) {
      dispatch({
        type: GET_POKEMON_FAILURE
      })
    }
  }

  export const GetPokemonAction = (pokemonName: string) => async (dispatch: Dispatch<GetPokemonDispatchTypes>) => {
    try{
      dispatch({
        type: GET_POKEMON_LOADING,
      })

      let uriPokemonName = pokemonName.trim().toLowerCase().replace(' ', '-').replace('.', '');

      let res = await axios(PokemonURI + uriPokemonName);
      let speciesData = await axios(res.data.species.url);
      let formData = await axios(res.data.forms[0].url);

      let stats: PokemonStat[] = [];
      
      for(let i = 0; i < 6; i++){
        stats.push({
          base: res.data.stats[`${i}`].base_stat,
          name: res.data.stats[`${i}`].stat.name
        })
      }

      let forms: PokemonAlt[] = speciesData.data.varieties.map((variety: any) => {
        return {
          name: variety.pokemon.name,
          link: variety.pokemon.url.replace(PokemonURI, ''),
          type: 'variety'
        } as PokemonAlt
      })

      let flavorTexts: PokemonFlavorText[] = speciesData.data.flavor_text_entries.filter((text: any) => (text.language.name === 'en')).map((text: any) => ({
        flavorText: text.flavor_text,
        version: text.version.name
      } as PokemonFlavorText ))

      forms.push(...res.data.forms.map((form: any) => {
        return {
          name: form.name.replace('-normal', ''),
          link: form.url.replace(FormURI, ''),
          type: 'form'
        } as PokemonAlt
      }).filter((form: PokemonAlt) => form.name.replace('-normal', '') !== res.data.name))

      forms = forms.filter(form => form.name !== res.data.name || form.type === 'variety' )

      let genderType: PokemonGenderType;

      switch (speciesData.data.gender_rate){
        case -1:
          genderType = 'genderless'
          break;
        case 0:
          genderType = 'male'
          break;
        case 8:
          genderType = 'female'
          break;
        default:
          genderType = 'both'
          break;
      }

      let pokemon: PokemonType = {
        id: res.data.id,
        name: res.data.name,
        sprites: assignsprites(res.data),
        stats: stats,
        types: res.data.types.map((type: any) => type.type.name),
        weight: res.data.weight,
        height: res.data.height,
        canAddToParty: !formData.data.is_battle_only,
        flavorTexts: flavorTexts,
        genderType: genderType,
        alts: forms
      }

      dispatch({
        type: GET_POKEMON_SUCCESS,
        payload: pokemon
      })
    }
    catch (e){
      dispatch({
        type: GET_POKEMON_FAILURE
      })
    }
}
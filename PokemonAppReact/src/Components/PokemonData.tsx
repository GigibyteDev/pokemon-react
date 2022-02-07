import "../Styles/PokemonData.css";
import {useSelector} from 'react-redux';
import { RootDispatchType } from '../Redux/Store/Store';
import { GetPokemonAction, SwitchPokemon } from '../Redux/Actions/PokemonActions';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { CaretLeftSquareFill, CaretRightSquareFill, GenderMale, GenderFemale, GenderAmbiguous, Star, StarFill, ArrowClockwise, ArrowCounterclockwise} from 'react-bootstrap-icons';
import $ from 'jquery';
import TypeIcons from "./TypeIcons";
import { resetAnimation } from "../Helpers/HelperFunctions";
import { AddPartyPokemonAction } from '../Redux/Actions/PartyPokemonActions';
import { PokemonAlt, PokemonGenderType } from "../Redux/Actions/PokemonTypes";

interface PokemonDataI {
  showNotification: Function
}

const PokemonData = (props: PokemonDataI) => {
  const dispatch = useDispatch();
  
  let pokemon = useSelector((state: RootDispatchType) => state.Pokemon);

  let party = useSelector((state: RootDispatchType) => state.Party);
  
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [gender, setGender] = useState<PokemonGenderType>('male');
  const [isFront, setIsFront] = useState<boolean>(true);
  const [imageUri, setImageUri] = useState<string>('');
  const [canSpin, setCanSpin] = useState<boolean>(true);

  const handleNextOnClick = (direction: 'back' | 'forward') => {
    if (pokemon.Pokemon){
      dispatch(GetPokemonAction((pokemon.Pokemon.id + (direction === 'back' ? -1 : 1)).toString()));
    }
  }
  
  const handleOnPokemonSwitch = () => {
    if (pokemon.Pokemon)
    {
      var e = (document.getElementById("pokemonAlts")) as HTMLSelectElement;
      var sel = e.selectedIndex;
      var opt = e.options[sel];
      var CurValue = (opt).value;
      const pokemonAlt = pokemon.Pokemon.alts.filter((alt: PokemonAlt) => alt.name === CurValue)[0]
      if (pokemonAlt.type === 'form'){
        dispatch(SwitchPokemon(pokemon.Pokemon, pokemonAlt));
      }
      else if (pokemonAlt.type === 'variety'){
        dispatch(GetPokemonAction(pokemonAlt.link));
      }
    }
  } 

  const handleShinyOnClick = () => {
    setIsShiny(!isShiny);
  }

  const handleIsMaleOnClick = () => {
    if (pokemon.Pokemon?.genderType === 'both')
    {
      if (gender === 'male'){
        setGender('female');
      }
      else{
        setGender('male');
      }
    }
  }

  const handleIsFront = () => {
    if (canSpin){
      $('#pokemonSprite').removeClass('bounce');
      $('#pokemonSprite').addClass('bounce');
      setIsFront(!isFront);
      let sprite = document.getElementById('pokemonSprite');
      resetAnimation(sprite);
    }
  }

  useEffect(() => {
    if (pokemon.Pokemon)
    {
      const hasFrontFemale: boolean = pokemon.Pokemon.sprites.front_female !== null;
      const hasBackFemale: boolean = pokemon.Pokemon.sprites.back_female !== null;

      if (isShiny){
        if (gender !== 'female' || !hasFrontFemale){
          if (isFront){
            setImageUri(pokemon.Pokemon.sprites.front_shiny);
          }
          else{
            setImageUri(pokemon.Pokemon.sprites.back_shiny);
          }
        }
        else{
          if (isFront){
            setImageUri(pokemon.Pokemon.sprites.front_shiny_female);
          }
          else{
            if (!hasBackFemale){
              setImageUri(pokemon.Pokemon.sprites.back_shiny);
            }
            else{
              setImageUri(pokemon.Pokemon.sprites.back_shiny_female);
            }
          }
        }
      }
      else{
        if (gender !== 'female' || pokemon.Pokemon.sprites.front_female === null){
          if (isFront){
            setImageUri(pokemon.Pokemon.sprites.front_default);
          }
          else{
            setImageUri(pokemon.Pokemon.sprites.back_default);
          }
        }
        else{
          if (isFront){
            setImageUri(pokemon.Pokemon.sprites.front_female);
          }
          else{
            if (!hasBackFemale){
              setImageUri(pokemon.Pokemon.sprites.back_default);
            }
            else{
              setImageUri(pokemon.Pokemon.sprites.back_female);
            }
          }
        }
      }
    }
  }, [isShiny, gender, isFront, pokemon.Pokemon]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (pokemon.Pokemon){
      if (pokemon.Pokemon.sprites.back_default === null){
        setCanSpin(false);
        setIsFront(true);
      }
      else{
        setCanSpin(true);
      }

      if (pokemon.Pokemon.genderType === 'both'){
        if (gender === 'genderless'){
          setGender('male');
        }
      }
      else if (pokemon.Pokemon.genderType === 'male'){
        setGender('male');
      }
      else if (pokemon.Pokemon.genderType === 'female'){
        setGender('female')
      }
      else{
        setGender('genderless')
      }
    }
  }, [pokemon.Pokemon]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddToPartyClick = () => {
    if (party.PartyPokemon.length >= 6){
      props.showNotification('error', 'Party Capacity Reached');
    }
    else if (pokemon.Pokemon){
      dispatch(AddPartyPokemonAction(pokemon.Pokemon, gender, isShiny))
      props.showNotification('success', 'Pokemon Added Successfully');
    }
    else{
      props.showNotification('error', 'Something Went Wrong');
    }
  }

  return (
    <div>
      <div>
        {pokemon.Pokemon && (
          <div className='pokemon-info-wrapper'>
            <div className='pokemon-image-info-wrapper'>
              <div className="party-add-button-wrapper">
                <button hidden={!pokemon.Pokemon.canAddToParty} className="party-add-button" onClick={handleAddToPartyClick}>Add To Party</button>
              </div>
              <div className='pokemon-name-and-id-title'>
                { pokemon.Pokemon.alts.length > 1 ? (
                  <select name="pokemonAlts" className='pokemon-name-label-dropdown' id="pokemonAlts" onChange={handleOnPokemonSwitch} value={pokemon.Pokemon?.name}>
                    { pokemon.Pokemon.alts.map((alt: PokemonAlt) => (
                      <option key={alt.name} value={alt.name}>{alt.name.replaceAll('-', ' ')}</option>
                    ))
                    }
                  </select>
                ) : (
                  <label htmlFor="pokemonAlts" className='pokemon-name-label'>{pokemon.Pokemon.name.replaceAll('-', ' ')}</label>
                )}

              { pokemon.Pokemon.canAddToParty ? (
                <span className='pokemon-id-label'>Pokedex #{pokemon.Pokemon.id}</span>
              ) : (
                <br />
              ) }
              </div>
              <div className="image-and-controls">
                <div className="higher-buttons">
                  { gender === 'genderless' ? (
                    <div className='high-button'>
                      <GenderAmbiguous color='purple'/>
                    </div>
                  ) : (
                    <div className="high-button" onClick={handleIsMaleOnClick}>
                    { gender === 'male' ? (
                      <GenderMale color="blue"/>
                    ) : (
                      <GenderFemale color="red"/>
                    )
                  }
                  </div>  
                  )}
                  
                  <div className="high-button" onClick={handleIsFront}>
                    { isFront ? (
                      <ArrowClockwise />
                    ) : (
                      <ArrowCounterclockwise />
                    )}
                  </div> 
                  <div className="high-button" onClick={handleShinyOnClick}>
                    { isShiny ? (
                      <StarFill color="#ffec83" />
                      ) : (
                      <Star />)
                    }
                  </div> 
                  
                </div>
                <div className="top-layer-info">
                  <CaretLeftSquareFill className="next-icon" onClick={() => handleNextOnClick('back')}/>
                    <img id="pokemonSprite" className="pokemon-sprite" src={imageUri} alt={"pokemon view"}/>
                  
                  <CaretRightSquareFill className="next-icon" onClick={() => handleNextOnClick('forward')}/>
                </div>
              </div>
                <div className="pokemon-physical-stats">
                  <div className="pokemon-physical-stat">
                    <div className="stat-item-label">Weight</div>
                    <div className="stat-item-value">{pokemon.Pokemon.weight / 10} kg</div>
                  </div>
                  <div className="type-icon-container">
                    <TypeIcons types={pokemon.Pokemon.types}/>
                  </div>
                  <div className="pokemon-physical-stat">
                    <div className="stat-item-label">Height</div>
                    <div className="stat-item-value">{pokemon.Pokemon.height / 10} m</div>
                  </div>
                </div>
              <div className="stats-collection">
                {
                  pokemon.Pokemon.stats.map(stat => (
                    <div key={stat.name} className="stat-item">
                      <div className="stat-item-label">{stat.name}</div>
                      <div className="stat-item-value">{stat.base}</div>
                    </div>
                    ))
                  }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PokemonData

import "../Styles/PartyInfo.css";
import { useState, useEffect } from "react";
import { PartyPokemonType } from "../Redux/Actions/PartyPokemonTypes";
import { X } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { RemovePartyPokemonAction } from '../Redux/Actions/PartyPokemonActions';

interface PartyInfoI {
  Pokemon: PartyPokemonType,
  OnInfoClose: Function,
  ShowNotification: Function
}

const PartyInfo = (props: PartyInfoI) => {
  const dispatch = useDispatch();
  const [selectedGame, setSelectedGame] = useState<string>(props.Pokemon.PokemonData.flavorTexts[0].version);
  const [selectedGameDesc, setSelectedGameDesc] = useState<string>(props.Pokemon.PokemonData.flavorTexts[0].flavorText);

  const handleOnGameSwitch = (value: string) => {
    setSelectedGame(value);
    setSelectedGameDesc(props.Pokemon.PokemonData.flavorTexts.filter(text => text.version === value)[0].flavorText);
  }

  const handleOnRemovePokemon = () => {
    dispatch(RemovePartyPokemonAction(props.Pokemon.PokemonData.id))
    props.ShowNotification("info", `${props.Pokemon.PokemonData.name.replaceAll('-', ' ').toLocaleUpperCase()} Removed From Party Successfully!`)
    props.OnInfoClose();
  }

  useEffect(() => {
    setSelectedGame(props.Pokemon.PokemonData.flavorTexts[0].version);
    setSelectedGameDesc(props.Pokemon.PokemonData.flavorTexts[0].flavorText);
    console.log("loop prevention!");
  }, [props.Pokemon.PokemonData.flavorTexts])

  return (
    <>
      { props.Pokemon && (
          <div className="party-info-wrapper">
              <div className="party-info-pokemon-buttons">
                  <button className="party-info-remove-button" onClick={(e) => handleOnRemovePokemon()}>Remove From Party</button>
                  <X className="pokemon-info-close-icon" onClick={(e) => props.OnInfoClose()} />
              </div>
              <div className="party-info-pokemon-name">
                  {props.Pokemon.PokemonData.name.replaceAll('-', ' ')}
              </div>
              <span className="pokemon-info-breakline" />
              <div className="party-info-desc-dropdown-wrapper">
                  <select value={selectedGame} name="flavorTexts" className="pokemon-info-desc-dropdown" id="flavorTexts" onChange={(e) => handleOnGameSwitch(e.target.value)}>
                      { props.Pokemon.PokemonData.flavorTexts.map(text => {
                        return (
                        <option selected={text.version === selectedGame} value={text.version}>{text.version.replace('-', ' ')}</option>
                      )})}
                  </select>
              </div>
              <div className="party-info-desc-text-wrapper">
                  <div className="party-info-desc-text-container">
                      <span className="party-info-desc-text">{selectedGameDesc}</span>
                  </div>
              </div>
              <span className="pokemon-info-breakline" />

              <div className="party-info-stats-wrapper">
                {props.Pokemon.PokemonData.stats.map(stat => {
                  return (
                    <div className="pokemon-info-stat">
                        <div className="pokemon-info-stat-label">{stat.name.replaceAll('-', ' ')}</div>
                        <div className="pokemon-info-stat-value">{stat.base}</div>
                    </div>
                )})}
              </div>
          </div>
      )}
    </>
  );
};

export default PartyInfo;

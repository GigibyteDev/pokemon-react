import '../Styles/Party.css';
import {useState} from 'react';
import PartyCard from './PartyCard';
import { useSelector } from 'react-redux';
import { RootDispatchType } from '../Redux/Store/Store';
import { PartyPokemonType } from '../Redux/Actions/PartyPokemonTypes';

import $ from 'jquery';
import PartyInfo from './PartyInfo';
const Party = () => {
  const party = useSelector((state: RootDispatchType) => state.Party);
  const [infoExpanded, setInfoExpanded] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PartyPokemonType>(party.PartyPokemon[0])
  let iterator: number = 0;

  const handleCardClick = (pokemon: PartyPokemonType) => {
    if (!infoExpanded){
      let partyCardInfo = $('.party-card-info-wrapper');
      partyCardInfo.removeClass('unexpand');
      partyCardInfo.addClass('expand');
      setInfoExpanded(true);
    }
    setSelectedPokemon(pokemon);
  }

  const handleInfoClose = () => {
    if (infoExpanded){
      let partyCardInfo = $('.party-card-info-wrapper');
      partyCardInfo.removeClass('expand');
      partyCardInfo.addClass('unexpand');
      setInfoExpanded(false);
    }
  }

  return (
    <div className="party-view-wrapper">
      { party.PartyPokemon.length > 0 ? (
        <div className="party-not-empty-wrapper">
          <div className="party-cards-wrapper">
            <div className="party-cards-small-wrapper">
              { party.PartyPokemon.map(pokemon => (
                <div key={iterator++} onClick={() => handleCardClick(pokemon)}>
                  <PartyCard Pokemon={pokemon} />
                </div>
                ))
              }
            </div>
          </div>
          <div className="party-card-info-wrapper" onClick={handleInfoClose}>
            <PartyInfo Pokemon={selectedPokemon}/>
          </div> 
        </div>
      ) : (
        <div className="no-pokemon-wrapper">
          <span className="no-pokemon-span">No Pokemon In Party!</span>
        </div>
      )
      }
    </div>
  );
};

export default Party;

import '../Styles/PartyCard.css';
import { PartyPokemonType } from "../Redux/Actions/PartyPokemonTypes";
import {GenderMale, GenderFemale, GenderAmbiguous} from 'react-bootstrap-icons'
import TypeIcons from './TypeIcons';

interface PartyCardI {
  Pokemon: PartyPokemonType,
}

const PartyCard = (props: PartyCardI) => {
  const borderClass: string = props.Pokemon.isShiny ? 'gradient-border' : 'normal-border';
  return (
    <div className={`party-card ` + borderClass}>
      <div className="party-card-header-wrapper">
        <div  className="party-card-gender-icon">
        { props.Pokemon.gender === 'male' ? (
          <GenderMale size={"20"}/>
        ) : props.Pokemon.gender === 'female' ? (
          <GenderFemale size={"20"}/>
        ) : (
          <GenderAmbiguous size={'20'}/>
        )
        }
        </div>
        <div className="party-card-type-icons">
          <TypeIcons types={props.Pokemon.PokemonData.types}
          iconSize={25}/>
        </div>
      </div>
      <div className="party-card-header-name">
          <span className="party-card-header-name-text">{props.Pokemon.PokemonData.name.replaceAll('-', ' ')}</span>
      </div>
      <div className="party-card-image-wrapper">
        <img className="party-card-image" src={props.Pokemon.PokemonData.sprites.official_artwork} alt={props.Pokemon.PokemonData.name} />
      </div>
    </div>
  );
};

export default PartyCard;

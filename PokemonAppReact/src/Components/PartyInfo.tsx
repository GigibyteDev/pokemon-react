import "../Styles/PartyInfo.css";
import { PartyPokemonType } from "../Redux/Actions/PartyPokemonTypes";

interface PartyInfoI {
  Pokemon: PartyPokemonType
}

const PartyInfo = (props: PartyInfoI) => {
  return (
    <div className="party-info-wrapper">
      <div className="party-info-pokemon-name">
        {props.Pokemon.PokemonData.name}
      </div>
    </div>
  );
};

export default PartyInfo;

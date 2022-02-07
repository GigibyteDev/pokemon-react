import {PokemonTypeTypes} from '../Redux/Actions/PokemonTypes';
import '../Styles/TypeIcons.css';

interface TypeIconPropsI {
  types: PokemonTypeTypes[],
  iconSize?: number
}

const TypeIcons = (props: TypeIconPropsI) => {
  let typeIconStyle: React.CSSProperties = {
    width: `${props.iconSize ?? 40}px`
  }
  return (
    <div className="type-icons-list">
      {props.types.map(type => (
          <img key={type} className="type-icon" style={typeIconStyle} src={`../../TypeIcons/${type}.png`} alt={type} />
        ))
      }
    </div>
  );
};

export default TypeIcons;

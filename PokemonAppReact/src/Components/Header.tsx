import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootDispatchType } from '../Redux/Store/Store';

import '../Styles/Header.css';

const Header = () => {
  const partyCount: number = useSelector((state: RootDispatchType) => state.Party.PartyPokemon.length);

  return (
    <div className="pokemon-header">
      <div className="pokemon-header-items">
        <Link to="/" className="header-item">
          <span className="header-item-text">PokeSearch</span>
        </Link>
        <Link to="/party" className="header-item">
          <span className="header-item-text">Party <span className="header-party-count-text">({partyCount})</span></span>
        </Link>
      </div>
    </div>
  )
}

export default Header

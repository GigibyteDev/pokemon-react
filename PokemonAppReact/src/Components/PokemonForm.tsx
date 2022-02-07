import '../Styles/PokemonForm.css';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { RootDispatchType } from '../Redux/Store/Store';
import { Check, X, ArrowRepeat } from 'react-bootstrap-icons';
import { GetPokemonAction } from '../Redux/Actions/PokemonActions';
import PokemonData from './PokemonData';

interface PokemonFormI {
  showNotification: Function
}

const PokemonForm = (props: PokemonFormI) => {
  const dispatch = useDispatch();
  let pokemon = useSelector((state: RootDispatchType) => state.Pokemon);
  let [pokemonName, setPokemonName] = useState<string>('');

  const handleOnClick = () => {
    dispatch(GetPokemonAction(pokemonName))
  }

  useEffect(() => {
      if (pokemon.Pokemon){
        setPokemonName( pokemon.Pokemon?.name.replaceAll('-', ' ') );
      }
      else{
        setPokemonName('');
      }
  }, [pokemon.Pokemon?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="pokemon-form">
        <div className="form-header">
          <input className='pokemon-form-child pokemon-name-input' type="text" value={pokemonName} onChange={(e: any) => setPokemonName(e.target.value)}/>
          <div className="response-icon">
          {
            pokemon.Failure ? (
              <X color="red" size="30px"/>
            ) : 
            pokemon.Loading ? (
              <ArrowRepeat className="rotate-icon" color="blue" size="30px"/>
            ) : 
            pokemon.Pokemon && (
              <Check color="green" size="30px"/>
            )
          }
          </div>
        </div>

        <button className='pokemon-form-child pokemon-name-submit' onClick={handleOnClick}>Gimme that GUY!</button>

        <PokemonData showNotification={props.showNotification}/>

    </div>
  )
}

export default PokemonForm

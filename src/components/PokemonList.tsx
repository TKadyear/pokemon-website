import React  from 'react';
import { NamedAPIResource } from '../types/pokemonApiTypes';
interface PokemonListProps {
  pokemons: NamedAPIResource[];
  onSelect: (pokemon: NamedAPIResource) => void;
  selected?: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onSelect, selected }) => {

  return(
  <aside className="sidemenu">
    <ul className='p-2 grid gap-2'>
      {pokemons.map((p) => (
        <li
          key={p.name}
          className={`p-1 pr-4 rounded ${selected === p.name ? 'bg-red shadow-xs shadow-blue-900' : ''}`}
          onClick={() => onSelect(p)}
        >
          <p className={`item_pokemon_name ${selected === p.name ? 'item_pokemon_name--selected' : ''}`}>
            {p.name}
          </p>
        </li>
      ))}
    </ul>
  </aside>
)
};

export default PokemonList;
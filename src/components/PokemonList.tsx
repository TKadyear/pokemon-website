import React from 'react';
import { PokemonOverviewInterface } from '../types/pokemonApiTypes';
interface PokemonListProps {
  pokemons: PokemonOverviewInterface[];
  onSelect: (pokemon: PokemonOverviewInterface) => void;
  onSearchMore: () => Promise<void>;
  selected?: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onSelect, onSearchMore, selected }) => {
  return (
    <ul className='p-2 grid gap-2'>
      {pokemons.map((p) => (
        <li
          tabIndex={1}
          key={p.name}
          className={`p-1 pr-4 rounded ${selected === p.name ? 'bg-red shadow-xs shadow-blue-900' : ''}`}
          onClick={() => onSelect(p)}
        >
          <p className={`item_pokemon_name ${selected === p.name ? 'item_pokemon_name--selected' : ''}`}>
            {p.name}
          </p>
        </li>
      ))}
      <li
        tabIndex={1}
        className="p-1 pr-4 rounded"
        onClick={() => onSearchMore()}
      >
        <p className="p-2 cursor-pointer font-bold text-white text-center rounded-full bg-red border border-transparent transition-all  hover:bg-red-500">
          See more Pokémons
        </p>
      </li>
    </ul>
  )
};

export default PokemonList;
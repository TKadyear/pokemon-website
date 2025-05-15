import React from 'react';
import { NamedAPIResource } from '../types/pokemonApiTypes';

interface PokemonListProps {
  pokemons: NamedAPIResource[];
  onSelect: (pokemon: NamedAPIResource) => void;
  selected?: string;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onSelect, selected }) => (
  <aside className="w-full md:w-1/4 border-r overflow-auto">
    <ul>
      {pokemons.map((p) => (
        <li
          key={p.name}
          className={`p-2 cursor-pointer ${selected === p.name ? 'bg-gray-200' : ''}`}
          onClick={() => onSelect(p)}
        >
          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
        </li>
      ))}
    </ul>
  </aside>
);

export default PokemonList;
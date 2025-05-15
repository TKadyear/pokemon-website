import React, { useState } from 'react';
import { PokemonOverviewInterface } from '../types/pokemonApiTypes';
import PokemonList from './PokemonList';
interface SidemenuProps {
  pokemons: PokemonOverviewInterface[];
  onSelect: (pokemon: PokemonOverviewInterface) => void;
  onSearchMore: () => Promise<void>;
  selected?: string;
}

const Sidemenu: React.FC<SidemenuProps> = ({ pokemons, onSelect, onSearchMore, selected }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  const handleSelect = (pokemon: PokemonOverviewInterface) => {
    onSelect(pokemon)
    setIsOpen(!isOpen)
  }
  return (
    <>
      <nav className="md:hidden">
        <button className="p-4 " onClick={() => handleClick()}>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </nav>
      <aside className={`sidemenu ${isOpen ? "block" : "hidden"}`}>
        <PokemonList pokemons={pokemons} onSelect={handleSelect} selected={selected} onSearchMore={onSearchMore} />
      </aside>
    </>
  )

};

export default Sidemenu;
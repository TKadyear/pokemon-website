import React from 'react';
import { Pokemon } from '../types/pokemonApiTypes';
interface PokemonDetailsProps {
  pokemon: Pokemon;
  clicks: number;
  onImageClick: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, clicks, onImageClick }) => (
  <section className="p-4 flex-1">
    <h2 className="text-3xl font-bold mb-4">
      {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
    </h2>
    {pokemon.sprites.front_default ? (
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={48}
        height={48}
        className="w-48 h-48 object-contain cursor-pointer"
        onClick={onImageClick}
      />
    ) : (
      <p>No image available</p>
    )}
    <p className="mt-4">Image clicks: {clicks}</p>
  </section>
);

export default PokemonDetails;
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Pokemon } from '../types/pokemonApiTypes';
interface PokemonDetailsProps {
  pokemon: Pokemon;
  clicks: number;
  onImageClick: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, clicks, onImageClick }) => (
  <section className="p-6 flex-1">
    <div className="container_pokemon_details">
      <img
        src={pokemon.sprites.front_default ?? "/images/unknown-pokemon.svg"}
        alt={pokemon.name}
        className="w-64 h-64 m-auto object-contain cursor-pointer"
        onClick={onImageClick}
      />
      <div className="w-full p-2 text-center bg-blue">
    <h2 className="text-3xl font-bold mb-4 capitalize">
      {pokemon.name}
    </h2>
    <p className="mt-4"><strong>Image clicks:</strong> {clicks}</p>
      </div>
    </div>
  </section>
);

export default PokemonDetails;
import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import PokemonList from '../components/PokemonList';
import { NamedAPIResource, PokemonListResponse } from '../types/pokemonApiTypes';

interface HomeProps {
  pokemons: NamedAPIResource[];
}

const Home: React.FC<HomeProps> = ({ pokemons }) => {
  const [selected, setSelected] = useState<NamedAPIResource | null>(null);

  return (
    <div className="flex flex-col md:flex-row h-full">
      <PokemonList
        pokemons={pokemons}
        onSelect={setSelected}
        selected={selected?.name}
      />
      <main className="flex-1 p-4">
        {selected ? (
          <p className="text-xl">Detalles de {selected.name}</p>
        ) : (
          <p className="text-xl">Select a Pokémon</p>
        )}
      </main>
    </div>
  );
};

export default Home;
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data: PokemonListResponse = await res.json();
  return { props: { pokemons: data.results } };
};
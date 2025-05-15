import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import PokemonList from '../components/PokemonList';
import PokemonDetails from '../components/PokemonDetails';
import { NamedAPIResource, PokemonListResponse, Pokemon } from '../types/pokemonApiTypes';

interface HomeProps {
  pokemons: NamedAPIResource[];
}
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data: PokemonListResponse = await res.json();
  return { props: { pokemons: data.results } };
};

const Home: React.FC<HomeProps> = ({ pokemons }) => {
  const [selected, setSelected] = useState<NamedAPIResource | null>(null);
  const [clicks, setClicks] = useState<{ [key: string]: number }>({});
  const [details, setDetails] = useState<Pokemon | null>(null);

  const handleSelect = async (p: NamedAPIResource) => {
    setSelected(p);
    setClicks((prev) => ({ ...prev, [p.name]: prev[p.name] ?? 0 }));
    const res = await fetch(`/api/pokemon/${p.name}`);
    const data: Pokemon = await res.json();
    setDetails(data);
  };

  const handleImageClick = () => {
    if (!details) return;
    setClicks((prev) => ({
      ...prev,
      [details.name]: (prev[details.name] || 0) + 1,
    }));
  };

  return (
    <Layout>
      <PokemonList pokemons={pokemons} onSelect={handleSelect} selected={selected?.name} />
      {details && selected ? (
        <PokemonDetails
          pokemon={details}
          clicks={clicks[selected.name] || 0}
          onImageClick={handleImageClick}
        />
      ) : (
        <div className="p-4 flex-1">
          <p className="text-xl">Select a Pokémon</p>
        </div>
      )}
    </Layout>
  );
};

export default Home;
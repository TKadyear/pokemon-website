import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import PokemonDetails from '../components/PokemonDetails';
import { NamedAPIResource, PokemonListResponse, Pokemon } from '../types/pokemonApiTypes';
import Sidemenu from '@/components/Sidemenu';

interface HomeProps {
  pokemons: NamedAPIResource[];
  nextPage: string | null;
}
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data: PokemonListResponse = await res.json();
  return { props: { pokemons: data.results, nextPage: data.next } };
};

const Home: React.FC<HomeProps> = ({ pokemons, nextPage }) => {
  const [ pokemonList, setPokemonList ] = useState<NamedAPIResource[]>(pokemons)
  const [ nextPagePokemon, setNextPagePokemon ] = useState<string>(nextPage ?? "")
  const [ selected, setSelected ] = useState<NamedAPIResource | null>(null);
  const [ clicks, setClicks ] = useState<{ [ key: string ]: number }>({});
  const [ pokemonSelected, setPokemonSelected ] = useState<Pokemon | null>(null);

  const handleSelect = async (p: NamedAPIResource) => {
    setSelected(p);
    setClicks((prev) => ({ ...prev, [ p.name ]: prev[ p.name ] ?? 0 }));
    const res = await fetch(`/api/pokemon/${p.name}`);
    const pokemonDetails: Pokemon = await res.json();
    console.log(pokemonDetails)
    setPokemonSelected(pokemonDetails);
  };
  const handleSearchMore = async () => {
    if (nextPagePokemon) {
      const res = await fetch(nextPagePokemon);
      const pokemonListUpdated: PokemonListResponse = await res.json();
      const { next, results } = pokemonListUpdated
      setPokemonList([ ...pokemonList, ...results ])
      setNextPagePokemon(next ?? "")
      console.log(pokemonListUpdated)
    }
  }
  const handleImageClick = () => {
    if (!pokemonSelected) return;
    setClicks((prev) => ({
      ...prev,
      [ pokemonSelected.name ]: (prev[ pokemonSelected.name ] || 0) + 1,
    }));
  };

  return (
    <Layout>
      <Sidemenu pokemons={pokemonList} onSearchMore={handleSearchMore} onSelect={handleSelect} selected={selected?.name} />
      <section className="p-6 flex-1">
        {pokemonSelected && selected ? (
          <PokemonDetails
            pokemon={pokemonSelected}
            clicks={clicks[ selected.name ] || 0}
            onImageClick={handleImageClick}
          />
        ) : (
          <div className="container_pokemon_details min-h-36">
            <p className="text-2xl text-center">Select a Pokémon</p>
          </div>
        )}
      </section>

    </Layout>
  );
};

export default Home;
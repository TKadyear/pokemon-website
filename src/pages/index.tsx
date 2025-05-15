import React, { useState } from 'react';
import type { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import PokemonDetails from '../components/PokemonDetails';
import { PokemonOverviewInterface, PokemonListResponseInterface, Pokemon } from '../types/pokemonApiTypes';
import Sidemenu from '@/components/Sidemenu';
import { usePokemonClickReducer } from '@/hooks/usePokemonClickReducer';
import { ActionTypeEnum } from '@/hooks/usePokemonClickReducer';
import ErrorToast from '@/components/ErrorToast';
interface HomeProps {
  pokemons: PokemonOverviewInterface[];
  nextPage: string | null;
}
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data: PokemonListResponseInterface = await res.json();
    return { props: { pokemons: data.results, nextPage: data.next } };
  } catch (e) {
    throw new Error(`Error: ${JSON.stringify(e)}`)
  }
};

const Home: React.FC<HomeProps> = ({ pokemons, nextPage }) => {
  const [ pokemonList, setPokemonList ] = useState<PokemonOverviewInterface[]>(pokemons);
  const [ nextPagePokemon, setNextPagePokemon ] = useState<string>(nextPage ?? "");
  const [ selected, setSelected ] = useState<PokemonOverviewInterface | null>(null);
  const [ pokemonSelected, setPokemonSelected ] = useState<Pokemon | null>(null);
  const [ clicksMap, dispatch ] = usePokemonClickReducer();
  const [ error, setError ] = useState(false);

  const handleSelect = async (p: PokemonOverviewInterface) => {
    try {
      setSelected(p);
      const res = await fetch(`/api/pokemon/${p.name}`);
      const pokemonDetails: Pokemon = await res.json();
      if (!res.ok) {
        setError(true);
        setPokemonSelected(null);
        return;
      }
      setPokemonSelected(pokemonDetails);
    } catch (error) {
      setPokemonSelected(null);
      setError(true);
      console.error(error);
    }
  };
  const handleSearchMore = async () => {
    try {
      if (nextPagePokemon) {
        const res = await fetch(nextPagePokemon);
        const pokemonListUpdated: PokemonListResponseInterface = await res.json();
        const { next, results } = pokemonListUpdated;
        setPokemonList([ ...pokemonList, ...results ]);
        setNextPagePokemon(next ?? "");
      }
    } catch (error) {
      setError(true);
      console.error(error)
    }
  }
  const handleImageClick = () => {
    if (!pokemonSelected) return;
    dispatch({ type: ActionTypeEnum.Increment, name: pokemonSelected.name });
  };

  return (
    <Layout>
      {error && <ErrorToast />}
      <Sidemenu pokemons={pokemonList} onSearchMore={handleSearchMore} onSelect={handleSelect} selected={selected?.name} />
      <section className="p-6 flex-1">
        {pokemonSelected && selected ? (
          <PokemonDetails
            pokemon={pokemonSelected}
            clicks={clicksMap[ selected.name ] || 0}
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
export interface PokemonOverviewInterface {
  name: string;
  url: string;
}

export interface PokemonListResponseInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonOverviewInterface[];
}
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    [key: string]: string | null;
  }
}
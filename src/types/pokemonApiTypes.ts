export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokemonSprites {
  front_default: string | null;
  [key: string]: string | null;
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
}
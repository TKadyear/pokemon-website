import type { NextApiRequest, NextApiResponse } from 'next';
import { Pokemon } from '../../../types/pokemonApiTypes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon | { error: string }>
) {
  const { name } = req.query;

  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid Pokémon name' });
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    if (response.status === 404) {
      return res.status(404).json({ error: 'Pokémon not found' });
    }
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error fetching Pokémon details' });
    }
    const data: Pokemon = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
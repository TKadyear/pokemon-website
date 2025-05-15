import { useReducer } from 'react';

export enum ActionTypeEnum {
  Increment = 'increment',
}
type Action = { type: ActionTypeEnum.Increment; name: string };

type State = PokemonClicksInterface

interface PokemonClicksInterface {
  [ pokemonName: string ]: number
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypeEnum.Increment:
      const newState = { ...state, [ action.name ]: (state[ action.name ] || 0) + 1, }
      return newState;
    default:
      return state;
  }
}


export function usePokemonClickReducer(initialState: State = {}) {
  const [ state, dispatch ] = useReducer(reducer, {});
  return useReducer(reducer, initialState);
}


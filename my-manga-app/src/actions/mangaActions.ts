import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from './ActionTypes.ts';

export const addToFavorites = (manga) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: manga
  };
};

export const removeFromFavorites = (mangaId) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: mangaId
  };
};
export interface Action {
  type: string;
  payload?: any;
}
interface Manga {
  title: string;
  author: string;
}

interface State {
  mangaList: Manga[];
  animeList: any[];
}

const initialState: State = {
  mangaList: [],
  animeList: [],
};

const mangaReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'FETCH_MANGA':
      return {
        ...state,
        mangaList: action.payload,
      };
    default:
      return state;
  }
};

export default mangaReducer;

import * as actionTypes from '../actions/ActionTypes';

interface Manga {
  id: string;
  title: string;
  author: string;
}

interface MangaState {
  mangaList: Manga[];
  selectedManga: Manga | null;
  favorites: Manga[];
}

const initialState: MangaState = {
  mangaList: [],
  selectedManga: null,
  favorites: []
};

const mangaReducer = (state: MangaState = initialState, action: any): MangaState => {
  switch (action.type) {
    case actionTypes.FETCH_MANGA:
      return {
        ...state,
        mangaList: action.payload,
      };
    case actionTypes.ADD_TO_FAVORITES:
      if (!state.favorites.find(manga => manga.id === action.payload.id)) {
        return {
          ...state,
          favorites: [...state.favorites, action.payload]
        };
      }
      return state;
    case actionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(manga => manga.id !== action.payload)
      };
    default:
      return state;
  }
};

export default mangaReducer;

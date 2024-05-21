import { combineReducers } from 'redux';
import userReducer from './userReducer';
import mangaReducer from './mangaReducer';

const rootReducer = combineReducers({
  user: userReducer,
  manga: mangaReducer,
});

export default rootReducer;

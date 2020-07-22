import { combineReducers } from 'redux';
import deckReducer from './deckReducer';
import playerReducer from './playerReducer';

export default combineReducers({ deck: deckReducer, player: playerReducer });

import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import playerReducer from './playerReducer';

export default combineReducers({ game: gameReducer, player: playerReducer });

import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import GameState from './GameState';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  GameState,
  unknown,
  Action<string>
>;

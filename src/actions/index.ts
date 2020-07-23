import { GamePhase } from '../types/GamePhase';
import { SET_GAME_PHASE, SET_GAME_MENU_VISIBILITY } from './types';
import Game, { CreatedPlayer } from '../game';
import { AppThunk } from '../types/AppThunk';
import { GameAction } from '../types/GameAction';

let game: Game;

export const startGame = (players: CreatedPlayer[]): AppThunk => (dispatch) => {
  game = new Game(players);
  dispatch(setGamePhase(GamePhase.Betting));
  dispatch(setGameMenuVisibility(false));
};

export const setGameMenuVisibility = (
  isGameMenuVisible: boolean,
): GameAction => ({
  type: SET_GAME_MENU_VISIBILITY,
  isGameMenuVisible,
});

export const setGamePhase = (phase: GamePhase): GameAction => ({
  type: SET_GAME_PHASE,
  phase,
});

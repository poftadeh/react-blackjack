import { GamePhase } from '../types/GamePhase';
import {
  SET_GAME_PHASE,
  SET_GAME_MENU_VISIBILITY,
  PLAYER_BET,
  UPDATE_PLAYER,
} from './types';
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

export const playerBet = (name: string, amount: number): AppThunk => (
  dispatch,
) => {
  const player = game.findPlayerByName(name);
  player.bet(amount);
  dispatch({ type: UPDATE_PLAYER, player: player.serialize() });
};

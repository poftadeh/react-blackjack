import { GamePhase } from '../types/GamePhase';
import {
  SET_GAME_PHASE,
  SET_GAME_MENU_VISIBILITY,
  UPDATE_PLAYER,
  SET_ACTIVE_PLAYER,
} from './types';
import Game, { CreatedPlayer } from '../game';
import { AppThunk } from '../types/AppThunk';
import { GameAction } from '../types/GameAction';
import { PlayerAction } from '../types/PlayerAction';

let game: Game;

export const startGame = (players: CreatedPlayer[]): AppThunk => (dispatch) => {
  game = new Game(players);
  dispatch(setGamePhase(GamePhase.Betting));
  dispatch(setGameMenuVisibility(false));
  dispatch(setActivePlayer());
};

export const setGameMenuVisibility = (
  isGameMenuVisible: boolean,
): GameAction => ({
  type: SET_GAME_MENU_VISIBILITY,
  isGameMenuVisible,
});

export const setActivePlayer = (): PlayerAction => ({
  type: SET_ACTIVE_PLAYER,
  activePlayer: game.getSerializedActivePlayer(),
});

export const setGamePhase = (phase: GamePhase): GameAction => ({
  type: SET_GAME_PHASE,
  phase,
});

export const bet = (amount: number): AppThunk => (dispatch) => {
  const bettingPlayer = game.getActivePlayerName();
  game.bet(amount);
  dispatch({
    type: UPDATE_PLAYER,
    player: game.findPlayerByName(bettingPlayer).serialize(),
  });
  dispatch(setActivePlayer());
};

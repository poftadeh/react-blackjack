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

export const hit = (): AppThunk => (dispatch) => {
  const hittingPlayer = game.getActivePlayerName();
  game.hit();
  dispatch({
    type: UPDATE_PLAYER,
    player: game.findPlayerByName(hittingPlayer).serialize(),
  });
  dispatch(setActivePlayer());
};

export const stand = (): AppThunk => (dispatch) => {
  const standingPlayer = game.getActivePlayerName();
  game.stand();
  dispatch({
    type: UPDATE_PLAYER,
    player: game.findPlayerByName(standingPlayer).serialize(),
  });
  dispatch(setActivePlayer());
};

export const double = (): AppThunk => (dispatch) => {
  const doublingPlayer = game.getActivePlayerName();
  game.double();
  dispatch({
    type: UPDATE_PLAYER,
    player: game.findPlayerByName(doublingPlayer).serialize(),
  });
  dispatch(setActivePlayer());
};

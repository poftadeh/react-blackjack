import { GamePhase } from '../types/GamePhase';
import {
  SET_GAME_PHASE,
  SET_GAME_MENU_VISIBILITY,
  UPDATE_PLAYER,
  SET_ACTIVE_PLAYER,
  UPDATE_DEALER_HAND,
} from './types';
import Game, { CreatedPlayer } from '../game';
import { AppThunk } from '../types/AppThunk';
import { GameAction } from '../types/GameAction';
import { PlayerAction } from '../types/PlayerAction';
import SerializedPlayer from '../types/SerializedPlayer';

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

export const update = (player: SerializedPlayer): AppThunk => (dispatch) => {
  dispatch({
    type: UPDATE_PLAYER,
    player,
  });
  dispatch(setActivePlayer());
  dispatch(updateDealer());
};

export const bet = (amount: number): AppThunk => (dispatch) => {
  const bettingPlayer = game.bet(amount);
  dispatch(update(bettingPlayer));
};

export const hit = (): AppThunk => (dispatch) => {
  const hittingPlayer = game.hit();
  dispatch(update(hittingPlayer));
};

export const stand = (): AppThunk => (dispatch) => {
  const standingPlayer = game.stand();
  dispatch(update(standingPlayer));
};

export const double = (): AppThunk => (dispatch) => {
  const doublingPlayer = game.double();
  dispatch(update(doublingPlayer));
};

export const updateDealer = (): AppThunk => (dispatch) => {
  const hand = game.getDealer().serializeHand();
  const handValue = game.getDealer().getHandValue();

  dispatch({
    type: UPDATE_DEALER_HAND,
    dealer: { hand, handValue },
  });
};

export const playDealerHand = (): AppThunk => (dispatch) => {
  game.playDealerHand();
  dispatch(updateDealer());
};

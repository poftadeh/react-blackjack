import Deck from '../gameLogic/Deck/Deck';

interface deckState {
  deck: Deck;
}

interface deckAction {
  type: string;
}

const initialState: deckState = {
  deck: new Deck(),
};

export default (state = initialState, action: deckAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

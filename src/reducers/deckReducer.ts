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

export default (state = initialState, action: deckAction): deckState => {
  switch (action.type) {
    default:
      return state;
  }
};

import Card from '..';

describe('Card', () => {
  it('should create a card properly', () => {
    const card = new Card('Ace', 'Hearts');
    expect(card.getName()).toBe('Ace of Hearts');
  });
});

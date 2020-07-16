import Card from '../Card';

describe('Card', () => {
  it('should create a card properly', () => {
    const card = new Card('Hearts', 'Ace');
    expect(card.getName()).toBe('Ace of Hearts');
  });
});

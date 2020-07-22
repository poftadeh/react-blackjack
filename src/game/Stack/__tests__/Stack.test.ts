import Stack from '..';

describe('Stack', () => {
  it('should construct a new stack', () => {
    const stack = new Stack(9000);
    expect(stack.getChips()).toBe(9000);
  });

  it('should add chips', () => {
    const stack = new Stack(100);
    stack.addChips(100);
    expect(stack.getChips()).toBe(200);
  });

  it('should remove chips', () => {
    const stack = new Stack(100);
    stack.removeChips(1000);
    expect(stack.getChips()).toBe(0);
  });
});

export default class Stack {
  private chips = 0;

  constructor(startingChips: number) {
    this.chips = startingChips;
  }

  /**
   * Adds chips to the stack.
   * @param amount
   */
  public addChips(amount: number): void {
    this.chips += amount;
  }

  /**
   * Removes chips from the stack.
   * @param amount
   */
  public removeChips(amount: number): void {
    if (amount >= this.chips) {
      this.chips = 0;
    } else {
      this.chips -= amount;
    }
  }

  /**
   * Returns the stack amount
   */
  public getChips(): number {
    return this.chips;
  }
}

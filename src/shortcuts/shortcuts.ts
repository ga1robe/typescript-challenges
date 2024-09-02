/*
 * Przeprogramowani.ts - https://przeprogramowani.pl/typescript/
 *
 * Shortcuts
 * ------------------
 *
 * Goal: Make sure that everything works fine - it's that simple!
 *
 * Hint: https://www.typescriptlang.org/docs/handbook/classes.html
 */

class Bag {
  constructor(public items: string[]) {}

  lookInside() {
    return this.items;
  }
}

class BrandedBag extends Bag {
  constructor(public logo: string, public brand: string, items: string[]) {
    super(items);
  }

  public checkBrand() {
    return `Brand - ${this.brand}`;
  }
}

export const devBag = new BrandedBag('<P/>', 'Przeprogramowani.pl', [
  'keys',
  'sunglassess',
  'books',
]);

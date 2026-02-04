// This file defines the game state.
// Think of this like the "database" for the game.

export function makeInitialState() {
  return {
    day: 1,
    cashCents: 2000,

    inventory: {
      coffee: 5,
      bagel: 5,
      tea: 5,
    },

    prices: {
      coffee: 300,
      bagel: 250,
      tea: 275,
    },

    cleanliness: 3,
    promoActive: false,

    orderedToday: false,
    lastReport: null,

    log: [],
    gameOver: false,
  };
}

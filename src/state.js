// This file defines the game state.
// Think of this like the "database" for the game.

export function makeInitialState() {
  return {
    day: 1,
    cashCents: 3000, // $30.00
    cleanliness: 60,

    inventory: { coffee: 5, bagel: 5, tea: 5 },
    prices:    { coffee: 300, bagel: 250, tea: 275 },

    promoDaysLeft: 0, // NEW
    orderedToday: false,   // NEW
    gameOver: false,       // NEW
    
    lastReport: null,
    log: ["Welcome to your new shop!"]
  };
}
export function simulateDay(state, event) {
  let revenue = 0;

  // CLEANLINESS MODIFIER
  let cleanlinessModifier = 0;
  if (state.cleanliness < 40) cleanlinessModifier = -1;
  else if (state.cleanliness > 70) cleanlinessModifier = 1;

  // COFFEE DEMAND
  let coffeeSold = state.prices.coffee <= 350 ? 3 : 1;
  coffeeSold += cleanlinessModifier;

  // BAGEL DEMAND
  let bagelSold = state.prices.bagel <= 300 ? 2 : 1;
  bagelSold += cleanlinessModifier;

  // PROMOTION
  if (state.promoDaysLeft > 0) {
    coffeeSold += 1;
    bagelSold += 1;
  }

  // EVENTS
  if (event?.demandBoost) {
    coffeeSold += event.demandBoost;
    bagelSold += event.demandBoost;
  }

  if (event?.noBagels) {
    bagelSold = 0;
  }

  // CLAMP TO INVENTORY
  coffeeSold = Math.max(0, Math.min(coffeeSold, state.inventory.coffee));
  bagelSold = Math.max(0, Math.min(bagelSold, state.inventory.bagel));

  // UPDATE INVENTORY + CASH
  state.inventory.coffee -= coffeeSold;
  revenue += coffeeSold * state.prices.coffee;

  state.inventory.bagel -= bagelSold;
  revenue += bagelSold * state.prices.bagel;

  // RACCOON EVENT (AFTER SALES)
  if (event?.steal) {
    const stolenCoffee = Math.min(1, state.inventory.coffee);
    const stolenBagel = Math.min(1, state.inventory.bagel);
    state.inventory.coffee -= stolenCoffee;
    state.inventory.bagel -= stolenBagel;
  }

  state.cashCents += revenue;
}

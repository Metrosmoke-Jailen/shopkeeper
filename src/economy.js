export function simulateDay(state) {
  let revenue = 0;

  // Cleanliness
  let cleanlinessModifier = 0;

  if (state.cleanliness < 40) {
    cleanlinessModifier = -1;
  }

  if (state.cleanliness > 70) {
    cleanlinessModifier = 1;
  }

  // Coffee sales
  let coffeeSold = 0;
  if (state.prices.coffee <= 350) {
    coffeeSold = Math.max(0, coffeeSold + cleanlinessModifier);
    coffeeSold = Math.min(coffeeSold, state.inventory.coffee);
  }

  state.inventory.coffee -= coffeeSold;
  revenue += coffeeSold * state.prices.coffee;

  // Bagel sales
  let bagelSold = 0;
  if (state.prices.bagel <= 300) {
    bagelSold = Math.max(0, bagelSold + cleanlinessModifier);
    bagelSold = Math.min(bagelSold, state.inventory.bagel);
  }

  state.inventory.bagel -= bagelSold;
  revenue += bagelSold * state.prices.bagel;

  state.cashCents += revenue;
  state.lastReport = {
    coffeeSold,
    bagelSold,
    revenue
  };
}
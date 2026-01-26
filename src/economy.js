export function simulateDay(state) {
  let revenue = 0;

  // Coffee sales
  let coffeeSold = 0;
  if (state.prices.coffee <= 350) {
    coffeeSold = Math.min(3, state.inventory.coffee);
  } else {
    coffeeSold = Math.min(1, state.inventory.coffee);
  }

  state.inventory.coffee -= coffeeSold;
  revenue += coffeeSold * state.prices.coffee;

  // Bagel sales
  let bagelSold = 0;
  if (state.prices.bagel <= 300) {
    bagelSold = Math.min(2, state.inventory.bagel);
  } else {
    bagelSold = Math.min(1, state.inventory.bagel);
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
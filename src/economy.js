export function simulateDay(state, event) {
  let revenue = 0;

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
    coffeeSold = Math.min(3, state.inventory.coffee);
  } else {
    coffeeSold = Math.min(1, state.inventory.coffee);
  }
  // Apply cleanliness, then clamp to [0, inventory]
coffeeSold = Math.max(0, coffeeSold + cleanlinessModifier);
coffeeSold = Math.min(coffeeSold, state.inventory.coffee);

  state.inventory.coffee -= coffeeSold;
  revenue += coffeeSold * state.prices.coffee;

  // Bagel sales
  let bagelSold = 0;
  if (state.prices.bagel <= 300) {
    bagelSold = Math.min(2, state.inventory.bagel);
  } else {
    bagelSold = Math.min(1, state.inventory.bagel);
  }
  // Apply cleanliness, then clamp to [0, inventory]
bagelSold = Math.max(0, bagelSold + cleanlinessModifier);
bagelSold = Math.min(bagelSold, state.inventory.bagel);

  state.inventory.bagel -= bagelSold;
  revenue += bagelSold * state.prices.bagel;

  if (state.promoDaysLeft > 0) {
  coffeeSold += 1;
  bagelSold += 1;
  }
  
  state.cashCents += revenue;
  state.lastReport = {
  soldByItem: {
    coffee: coffeeSold,
    bagel: bagelSold
  },
  revenue
};
}
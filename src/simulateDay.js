export function simulateDay(state) {
  const coffeeSold = Math.min(
    state.inventory.coffee,
    Math.floor(Math.random() * 4) + state.cleanliness
  );

  const bagelSold = Math.min(
    state.inventory.bagel,
    Math.floor(Math.random() * 3) + state.cleanliness
  );

  state.inventory.coffee -= coffeeSold;
  state.inventory.bagel -= bagelSold;

  const revenue =
    coffeeSold * state.prices.coffee +
    bagelSold * state.prices.bagel;

  state.cashCents += revenue;

  state.lastReport = {
    soldByItem: {
      coffee: coffeeSold,
      bagel: bagelSold,
    },
    revenue,
  };
}

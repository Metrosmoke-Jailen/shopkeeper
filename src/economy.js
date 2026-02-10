import { PRODUCTS } from "./products.js";

export function simulateDay(state, event) {
  let revenue = 0;
  const soldByItem = {};

  let cleanlinessMultiplier = 1;

  if (state.cleanliness < 40) {
    cleanlinessMultiplier = 0.85; // −15% demand
  } else if (state.cleanliness > 70) {
    cleanlinessMultiplier = 1.15; // +15% demand
  }

  const promoMultiplier =
    state.promoDaysLeft > 0 ? 1.25 : 1; // +25% demand
  
  const demandBoost = event?.demandBoost ?? 1;
  const noBagels = event?.noBagels ?? false;
  const raccoonSteal = event?.steal ?? false;
  
  for(const p of PRODUCTS) {
    const {id, wholesaleCents, baseDemand} = p
      // Start from base demand
    let dailySales = baseDemand;

    // --- Daily randomness (±20%) ---
    const randomFactor = 0.8 + Math.random() * 0.4;
    dailySales *= randomFactor;

    // --- Apply modifiers ---
    dailySales *= cleanlinessMultiplier;
    dailySales *= promoMultiplier;

    // --- Round to whole units ---
    dailySales = Math.floor(dailySales);

    // --- Clamp by available inventory ---
    dailySales = Math.min(dailySales, state.inventory[id]);
    dailySales = Math.max(0, dailySales);

    // --- Apply results ---
    state.inventory[id] -= dailySales;
    const itemRevenue = dailySales * state.prices[id];
    revenue += itemRevenue;

    soldByItem[id] = dailySales;
  }

  if (raccoonSteal) {
    for (const p of PRODUCTS) {
      const stolen = Math.min(2, state.inventory[p.id]);
      state.inventory[p.id] -= stolen;
    }
  }

  state.cashCents += revenue;
  
  state.lastReport = {
  soldByItem,
  revenue
};
}
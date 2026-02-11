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
  
  const noBagels = event?.noBagels ?? false;

  let eventDemandMultiplier = 1;
  let eventMessage = "";

  if (event) {
    eventMessage = `${event.name} — ${event.description}`;

    if (event.effect.demandMultiplier) {
      eventDemandMultiplier = event.effect.demandMultiplier;
    }

    if (event.effect.cleanlinessChange) {
      state.cleanliness += event.effect.cleanlinessChange;
      state.cleanliness = Math.max(0, Math.min(100, state.cleanliness));
    }
  }

  // --- Day-level randomness (rolled once per day) ---
let dayMultiplier = 1;
let dayMessage = "";

const roll = Math.random();

if (roll < 0.10) {
  dayMultiplier = 0.70;
  dayMessage = "Terrible day — very few customers showed up.";
} 
else if (roll < 0.30) {
  dayMultiplier = 0.85;
  dayMessage = "Slow day — fewer customers than usual.";
} 
else if (roll < 0.85) {
  dayMultiplier = 1.00;
  dayMessage = "Normal day — steady customer flow.";
} 
else {
  dayMultiplier = 1.25;
  dayMessage = "Great day — a big rush boosted demand!";
}
  
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
    dailySales *= dayMultiplier;
    dailySales *= eventDemandMultiplier;

    if (noBagels && id === "bagel") {
  dailySales = 0;
  }

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

  if (event?.effect?.steal) {
  for (const p of PRODUCTS) {
    const stolen = Math.min(5, state.inventory[p.id]);
    state.inventory[p.id] -= stolen;
  }
}

  state.cashCents += revenue;
  
  state.lastReport = {
  soldByItem,
  revenue,
  dayMessage,
  eventMessage
};
}
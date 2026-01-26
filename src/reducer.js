import { simulateDay } from "./economy.js";
import { randomEvent } from "./events.js";

export function update(state, action) {
  const newState = structuredClone(state);

  if (action.type === "NEXT_DAY") {
    newState.day += 1;
    newState.log.push("A new day begins.");
  }

  if (action.type === "CLEAN") {
    newState.cleanliness = Math.min(100, newState.cleanliness + 10);
    newState.log.push(
      `You cleaned the shop. Cleanliness is now ${newState.cleanliness}.`
    );
  }

  if (action.type === "SET_PRICE") {
    newState.prices[action.item] = action.price;
  }

  if (action.type === "PROMO") {
    if (newState.cashCents >= 300) {
      newState.cashCents -= 300;
      newState.promoDaysLeft = 2;
      newState.log.push("You ran a promotion.");
    } else {
      newState.log.push("Not enough cash to run a promotion.");
    }
  }

  if (action.type === "OPEN_SHOP") {
    const event = randomEvent(newState);
    simulateDay(newState, event);

    if (newState.promoDaysLeft > 0) {
      newState.promoDaysLeft -= 1;
    }

    newState.day += 1;
    newState.log.push("You opened the shop.");
  }

  return newState;
}

import { clampNumber } from "./utils.js";
import { PRODUCTS } from "./products.js";
import { simulateDay } from "./simulateDay.js";

export function update(state, action) {
  const newState = structuredClone(state);

  if (newState.gameOver) return newState;

  if (action.type === "SET_PRICE") {
    newState.prices[action.item] = clampNumber(action.price, 50, 1000);
  }

  if (action.type === "ORDER_STOCK") {
    const item = action.item;
    const qty = clampNumber(action.qty, 1, 20);

    if (newState.orderedToday) {
      newState.log.push("You already placed an order today.");
      return newState;
    }

    const product = PRODUCTS.find(p => p.id === item);
    if (!product) {
      newState.log.push("Invalid item.");
      return newState;
    }

    const totalCost = product.wholesaleCents * qty;

    if (newState.cashCents < totalCost) {
      newState.log.push("Not enough cash to place that order.");
      return newState;
    }

    newState.cashCents -= totalCost;
    newState.inventory[item] += qty;
    newState.orderedToday = true;

    newState.log.push(
      `Ordered ${qty} ${product.name}(s) for $${(totalCost / 100).toFixed(2)}.`
    );
  }

  if (action.type === "OPEN_SHOP") {
    simulateDay(newState);

    const rentCents = 200;
    newState.cashCents -= rentCents;
    newState.log.push(`Paid rent: $${(rentCents / 100).toFixed(2)}.`);

    newState.day += 1;
    newState.orderedToday = false;
  }

  if (newState.cashCents < 0) {
    newState.gameOver = true;
    newState.log.push("You went bankrupt. Game over.");
  }

  if (newState.day > 10 && newState.cashCents >= 6000) {
    newState.gameOver = true;
    newState.log.push("You ran a successful shop! You win!");
  }

  return newState;
}

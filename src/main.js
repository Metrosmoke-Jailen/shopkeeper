import { makeInitialState } from "./state.js";
import { render } from "./render.js";
import { update } from "./reducer.js";
import { saveState, loadState } from "./storage.js";

let state = makeInitialState();
render(state);

function dispatch(action) {
  state = update(state, action);
  render(state);

if (state.gameOver) disableControls();
}

function disableControls() {
  document.querySelectorAll("button, input, select").forEach(el => {
    el.disabled = true;
  });
}

document.getElementById("next-day").addEventListener("click", () => {
  dispatch({ type: "NEXT_DAY" });
});

document.getElementById("clean").addEventListener("click", () => {
  dispatch({ type: "CLEAN" });
});

document.getElementById("open-shop").addEventListener("click", () => {
  dispatch({ type: "OPEN_SHOP" });
});

document.getElementById("promo").addEventListener("click", () => {
  dispatch({ type: "PROMO" });
});

document.getElementById("order-button").addEventListener("click", () => {
  dispatch({
    type: "ORDER_STOCK",
    item: document.getElementById("order-item").value,
    qty: Number(document.getElementById("order-qty").value)
  });
});

document.getElementById("inventory").addEventListener("change", e => {
  if (e.target.id === "price-coffee") {
    dispatch({ type: "SET_PRICE", item: "coffee", price: Number(e.target.value) });
  }
  if (e.target.id === "price-bagel") {
    dispatch({ type: "SET_PRICE", item: "bagel", price: Number(e.target.value) });
  }
});

document.getElementById("save").addEventListener("click", () => {
  saveState(state);
  state.log.push("Game saved.");
  render(state);
});

document.getElementById("load").addEventListener("click", () => {
  const loaded = loadState();
  if (!loaded) {
    state.log.push("No save found.");
    render(state);
    return;
  }
  state = loaded;
  state.log.push("Game loaded.");
  render(state);
  if (state.gameOver) disableControls();
});

document.getElementById("new-game").addEventListener("click", () => {
  state = makeInitialState();
  render(state);
});
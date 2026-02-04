import { makeInitialState } from "./state.js";
import { update } from "./reducer.js";
import { render } from "./render.js";
import { saveState, loadState } from "./storage.js";

let state = makeInitialState();
render(state);

function dispatch(action) {
  state = update(state, action);
  render(state);

  if (state.gameOver) {
    disableControls();
  }
}

document.getElementById("open-shop").addEventListener("click", () => {
  dispatch({ type: "OPEN_SHOP" });
});

document.getElementById("order-button").addEventListener("click", () => {
  const item = document.getElementById("order-item").value;
  const qty = Number(document.getElementById("order-qty").value);

  dispatch({ type: "ORDER_STOCK", item, qty });
});

const inventoryEl = document.getElementById("inventory");

inventoryEl.addEventListener("change", (e) => {
  if (!e.target.classList.contains("price-input")) return;

  const item = e.target.dataset.item;
  const price = Number(e.target.value);

  dispatch({ type: "SET_PRICE", item, price });
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

function disableControls() {
  document.querySelectorAll("button, input, select").forEach(el => {
    el.disabled = true;
  });
}

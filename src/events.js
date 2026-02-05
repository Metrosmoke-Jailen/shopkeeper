export function randomEvent(state) {
  if (Math.random() > 0.3) return null;

  const roll = Math.floor(Math.random() * 4);

  switch (roll) {
    case 0:
      state.log.push("A tour bus arrives!");
      return { demandBoost: 1 };

    case 1:
      state.log.push("A raccoon steals some food!");
      return { steal: true };

    case 2:
      state.log.push("A helpful neighbor cleans up.");
      state.cleanliness += 10;
      return null;

    case 3:
      state.log.push("Bad weather scares away bagel customers.");
      return { noBagels: true };
  }
}
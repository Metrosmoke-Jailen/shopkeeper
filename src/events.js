export const EVENTS = [
  {
    name: "Tour Bus Arrives",
    chance: 0.10,
    description: "A tour bus stops nearby, bringing a surge of customers.",
    effect: {
      demandMultiplier: 1.35
    }
  },
  {
    name: "Raccoon Trouble",
    chance: 0.08,
    description: "A raccoon sneaks in and steals some inventory.",
    effect: {
      steal: true
    }
  },
  {
    name: "Helpful Neighbor",
    chance: 0.07,
    description: "A neighbor helps tidy up the shop.",
    effect: {
      cleanlinessChange: 10
    }
  },
  {
    name: "Bad Weather",
    chance: 0.12,
    description: "Rain keeps many customers at home.",
    effect: {
      demandMultiplier: 0.75
    }
  },
  {
    name: "Local Festival",
    chance: 0.10,
    description: "A nearby festival increases foot traffic.",
    effect: {
      demandMultiplier: 1.30
    }
  },
  {
    name: "Rainstorm",
    chance: 0.15,
    description: "Heavy rain keeps customers home.",
    effect: {
      demandMultiplier: 0.75
    }
  },
  {
    name: "Health Complaint",
    chance: 0.08,
    description: "A cleanliness complaint hurts reputation.",
    effect: {
      cleanlinessChange: -10
    }
  }
];

export function randomEvent() {
  const roll = Math.random();
  let cumulative = 0;

  for (const event of EVENTS) {
    cumulative += event.chance;
    if (roll < cumulative) {
      return event;
    }
  }

  return null;
}
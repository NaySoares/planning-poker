import { getRandomCard, getRandomCardControlled } from "./deck-cards";

export const players = [
  {
    id: 1,
    name: "Player 1",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=1`,
    cardValue: getRandomCard("fibonacci"),
  },
  {
    id: 2,
    name: "Player 2",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=2`,
    cardValue: getRandomCard("fibonacci"),
  },
  {
    id: 3,
    name: "Player 3",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=3`,
    cardValue: getRandomCard("fibonacci"),
  },
  {
    id: 4,
    name: "Player 4",
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=4`,
    cardValue: getRandomCard("fibonacci"),
  }
]

export function getRandomPlayer(quantity: number) {
  const generatedPlayers = [];
  for (let i = 1; i <= quantity; i++) {
    generatedPlayers.push({
      id: i,
      name: `Player ${i}`,
      avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${i}`,
      cardValue: getRandomCardControlled("fibonacci", 8, 1),
    });
  }
  return generatedPlayers;
}
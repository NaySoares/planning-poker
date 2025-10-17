import { getAllCards } from "./deck-cards";

interface IPlayer {
  id: number;
  name: string;
  vote: number;
}

export function calculateConsensus(players: IPlayer[]) {
  const votes = players
    .map(p => p.vote)
    .filter(v => typeof v === "number");

  if (votes.length === 0) return { average: 0, outliers: [] };

  const average = votes.reduce((sum, v) => sum + (isNaN(v) ? 0 : v), 0) / votes.length;

  // tolerância: todas as cartas imediatamente à esquerda e à direita da carta da média
  const cardAvg = getCardOfAverage(average, 'fibonacci');
  const cardAround = getCardsAround(Number(cardAvg.value), 'fibonacci');

  const tolerance = { left: cardAround.left, right: cardAround.right };

  const existsLeft = tolerance.left ? true : false;
  const existsRight = tolerance.right ? true : false;

  // Corte: votos fora da tolerância, ou seja, menores que a carta à esquerda ou maiores que a carta à direita
  const outliers = players.filter(
    p => {
      // ignora votos "cafézinho"
      if (isNaN(p.vote)) return false;

      if (existsLeft && p.vote < Number(tolerance.left!.value)) {
        return true;
      }
      if (existsRight && p.vote > Number(tolerance.right!.value)) {
        return true;
      }
      return false;
    }
  );

  return { average, outliers };
}

const getCardOfAverage = (average: number, deck: 'fibonacci' | 'scrum') => {
  const deckCards = deck === 'fibonacci' ? getAllCards('fibonacci') : getAllCards('scrum');

  // encontra a carta mais próxima da média
  let closestCard = deckCards[0];
  let smallestDiff = Math.abs(Number(closestCard.value) - average);

  for (const card of deckCards) {
    const cardValue = Number(card.value);
    if (!isNaN(cardValue)) {
      const diff = Math.abs(cardValue - average);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestCard = card;
      }
    }
  }

  return closestCard;
};

const getCardsAround = (cardAvg: number, deck: 'fibonacci' | 'scrum') => {
  // retorna a primeira carta a esquerda da carta dada
  const cardsLeft = getFirstCardLeft(cardAvg, deck)

  // retorna a primeira carta a direita da carta dada
  const cardsRight = getFirstCardRight(cardAvg, deck)

  const cardsAround = {
    left: cardsLeft,
    right: cardsRight,
  };

  return cardsAround;
}

const getFirstCardLeft = (cardAvg: number, deck: 'fibonacci' | 'scrum') => {
  const deckCards = deck === 'fibonacci' ? getAllCards('fibonacci') : getAllCards('scrum');

  const cardsLeft = deckCards
    .filter(c => {
      const cardValue = Number(c.value);
      return !isNaN(cardValue) && cardValue < cardAvg;
    })
    .sort((a, b) => Number(b.value) - Number(a.value));

  return cardsLeft[0] || null;
}

const getFirstCardRight = (cardAvg: number, deck: 'fibonacci' | 'scrum') => {
  const deckCards = deck === 'fibonacci' ? getAllCards('fibonacci') : getAllCards('scrum');

  const cardsRight = deckCards
    .filter(c => {
      const cardValue = Number(c.value);
      return !isNaN(cardValue) && cardValue > cardAvg;
    })
    .sort((a, b) => Number(a.value) - Number(b.value));

  return cardsRight[0] || null;
}
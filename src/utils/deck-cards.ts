export const cardsFibonacci = [
  { value: "1", description: "Um" },
  { value: "2", description: "Dois" },
  { value: "3", description: "Três" },
  { value: "5", description: "Cinco" },
  { value: "8", description: "Oito" },
  { value: "13", description: "Treze" },
  { value: "21", description: "Vinte e um" },
  { value: "34", description: "Trinta e quatro" },
  { value: "55", description: "Cinquenta e cinco" },
  { value: "89", description: "Oitenta e nove" },
  { value: "144", description: "Cento e quarenta e quatro" },
  { value: "☕", description: "Cafézinho" },
]

export const cardsScrum = [
  { value: "1", description: "Um" },
  { value: "2", description: "Dois" },
  { value: "3", description: "Três" },
  { value: "5", description: "Cinco" },
  { value: "8", description: "Oito" },
  { value: "13", description: "Treze" },
  { value: "20", description: "Vinte" },
  { value: "40", description: "Quarenta" },
  { value: "100", description: "Cem" },
  { value: "☕", description: "Cafézinho" },
]

export function getRandomCard(deck: 'fibonacci' | 'scrum'): { value: string, description: string } {
  const deckToUse = deck === 'fibonacci' ? cardsFibonacci : cardsScrum;
  const randomIndex = Math.floor(Math.random() * deckToUse.length);
  return deckToUse[randomIndex];
}
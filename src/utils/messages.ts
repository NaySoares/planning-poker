export const messagesCardsFibonacci = {
  1: "Tá na mão!",
  2: "Mamão com açúcar.",
  3: "Não é nenhum bicho de sete cabeças.",
  5: "Agora o bicho começou a pegar.",
  8: "Custa os olhos da cara!",
  13: "Número do azar... e da gambiarra!",
  21: "Descasca esse abacaxi.",
  34: "Essa é só na fé!",
  55: "Nem o café salva essa, chama o Sênior!",
  89: "Agora deu ruim geral!",
  144: "A bruxa tá solta!",
  "☕": "Hora do cafézinho!",
}

export const messagesCardsScrum = {
  1: "Tá na mão!",
  2: "Mamão com açúcar.",
  3: "Não é nenhum bicho de sete cabeças.",
  5: "Agora o bicho começou a pegar.",
  8: "Custa os olhos da cara!",
  13: "Número do azar... e da gambiarra!",
  20: "Descasca esse abacaxi.",
  40: "Essa é só na fé!",
  100: "Nem o café salva essa, chama o Sênior!",
  "☕": "Hora do cafézinho!",
}

export function getMessageCardByValue(deck: 'fibonacci' | 'scrum', value: string | number): string {
  const deckMessages = deck === 'fibonacci' ? messagesCardsFibonacci : messagesCardsScrum;
  return deckMessages[value as keyof typeof deckMessages] || "Sem mensagem disponível.";
}

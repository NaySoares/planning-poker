import { ISelectedCard } from "@/@types/types";
import { cardsFibonacci, cardsScrum } from "@/utils/deck-cards";

interface IContainerCards {
  selectedCard: ISelectedCard
  handleSelectCard: (card: ISelectedCard) => void;
  fibonacci?: boolean;
  startRound: boolean;
  revealCards: boolean;
}

export function ContainerCards({ selectedCard, handleSelectCard, fibonacci = false, startRound, revealCards }: IContainerCards) {

  const cardsToUse = fibonacci ? cardsFibonacci : cardsScrum;
  return (
    <div className={`absolute bottom-0 w-full flex items-center justify-center ${startRound ? 'visible' : 'bottom-[-150px] invisible'} transition-all duration-500`}>
      <div className="h-32 rounded-t-lg bg-gray-800 flex items-center justify-center space-x-3 px-4 shadow-inner w-fit">
        {cardsToUse.map((card, index) => (
          <div
            key={index + 1}
            onClick={() => handleSelectCard(card)}
            className={`w-16 h-24 bg-white text-gray-400 rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold cursor-pointer select-none transition-transform duration-200
          ${selectedCard === card ? "scale-110 ring-4 ring-yellow-400" : ""}
          ${revealCards ? "pointer-events-none opacity-50" : "hover:scale-105"}
          `}
          >
            {card.value}
          </div>
        ))}
      </div>
    </div>
  )
}
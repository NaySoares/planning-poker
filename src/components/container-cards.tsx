import { ISelectedCard } from "@/@types/types";
import { cardsFibonacci, cardsScrum } from "@/utils/deck-cards";
import React from "react";
import { Tooltip } from "./tooltip";
import { getMessageCardByValue } from "@/utils/messages";

interface IContainerCards {
  selectedCard: ISelectedCard
  handleSelectCard: (card: ISelectedCard) => void;
  fibonacci?: boolean;
  startRound: boolean;
  revealCards: boolean;
}

export function ContainerCards({ selectedCard, handleSelectCard, fibonacci = false, startRound, revealCards }: IContainerCards) {

  const backgroundLines = "[background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_20px)]"

  const cardsToUse = fibonacci ? cardsFibonacci : cardsScrum;
  return (
    <div className={`absolute bottom-0 w-full flex items-center justify-center ${startRound ? 'visible' : 'bottom-[-150px] invisible'} transition-all duration-500`}>
      <div className={`h-32 rounded-t-lg bg-green-800 flex items-center justify-center space-x-3 px-4 shadow-inner w-fit ${backgroundLines}`}
      >
        {cardsToUse.map((card, index) => (
          <React.Fragment
            key={index + 1}
          >
            <Tooltip text={getMessageCardByValue(fibonacci ? 'fibonacci' : 'scrum', card.value)}>
              <div
                onClick={() => handleSelectCard(card)}
                className={`w-16 h-24 bg-white text-gray-400 rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold cursor-pointer select-none transition-transform duration-200
                ${selectedCard === card ? "scale-110 ring-4 ring-red-500" : ""}
                ${revealCards ? "pointer-events-none opacity-50" : "hover:scale-105"}
                `}
              >
                {card.value}
              </div>
            </Tooltip>
          </React.Fragment>
        ))}
      </div>
    </div >
  )
}
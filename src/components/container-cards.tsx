import { ISelectedCard } from "@/@types/types";
import { cardsFibonacci, cardsScrum, getSourceImageByCardValue } from "@/utils/deck-cards";
import React from "react";
import { getMessageCardByValue } from "@/utils/messages";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface IContainerCards {
  selectedCard: ISelectedCard
  handleSelectCard: (card: ISelectedCard) => void;
  fibonacci?: boolean;
  startRound: boolean;
  revealCards: boolean;
}

export function ContainerCards({ selectedCard, handleSelectCard, fibonacci = false, startRound, revealCards }: IContainerCards) {

  const backgroundLines = "[background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_20px)]"

  const containerVisible = () => {
    if (revealCards) {
      return 'invisible bottom-[-180px]';
    }

    if (startRound) {
      return 'visible';
    }

    return 'invisible bottom-[-180px]';
  }

  const cardsToUse = fibonacci ? cardsFibonacci : cardsScrum;

  const textStyle = {
    textShadow: '-1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white, 1px 1px 0 white'
  }

  const Card = ({ value, description, isSelected, disabled }: { value: string; description: string; isSelected: boolean; disabled: boolean }) => {
    const originalCard = { value, description };
    return (
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() => handleSelectCard(originalCard)}
            className={`relative w-24 h-36 bg-white text-gray-400 rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold cursor-pointer select-none transition-transform duration-200
                ${isSelected ? "scale-110 ring-4 ring-red-500" : ""}
                ${disabled ? "pointer-events-none opacity-50" : "hover:scale-105"}
                `}
          >
            <img
              src={getSourceImageByCardValue(fibonacci ? 'fibonacci' : 'scrum', value)}
              alt={description}
              className="absolute w-full h-full object-cover rounded-lg"
            />
            <div
              className="relative z-10 w-full h-full text-black font-bold"
            >
              <div className="absolute top-0 left-0" style={textStyle}>
                {value}
              </div>
              <div className="absolute bottom-0 right-0 rotate-180" style={{ ...textStyle }}>
                {value}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getMessageCardByValue(fibonacci ? 'fibonacci' : 'scrum', value)}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <div className={`absolute bottom-0 w-full flex transition-all duration-500 overflow-x-auto ${containerVisible()}`}>
      <div className={`h-fit min-w-max rounded-t-lg bg-green-800 flex justify-center items-center space-x-3 p-4 shadow-inner overflow-x-auto mx-auto ${backgroundLines}`}
      >
        {cardsToUse.map((card, index) => (
          <React.Fragment
            key={index + 1}
          >
            <Card
              value={card.value}
              description={card.description}
              isSelected={selectedCard.value === card.value}
              disabled={revealCards}
            />
          </React.Fragment>
        ))}
      </div>
    </div >
  )
}
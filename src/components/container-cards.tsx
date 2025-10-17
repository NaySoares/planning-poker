import { ISelectedCard } from "@/@types/types";

interface IContainerCards {
  selectedCard: ISelectedCard
  // setSelectedCard: React.Dispatch<React.SetStateAction<ISelectedCard>>;
  handleSelectCard: (card: ISelectedCard) => void;
  fibonacci?: boolean;
  startRound: boolean;
}
const cards = [
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
const cardsFibonacci = [
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

export function ContainerCards({ selectedCard, handleSelectCard, fibonacci = false, startRound }: IContainerCards) {

  const cardsToUse = fibonacci ? cardsFibonacci : cards;
  return (
    <div className={`absolute bottom-0 w-full flex items-center justify-center ${startRound ? 'visible' : 'bottom-[-150px] invisible'} transition-all duration-500`}>
      <div className="h-32 rounded-t-lg bg-gray-800 flex items-center justify-center space-x-3 px-4 shadow-inner w-fit">
        {cardsToUse.map((card, index) => (
          <div
            key={index + 1}
            onClick={() => handleSelectCard(card)}
            className={`w-16 h-24 bg-white text-gray-400 rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold cursor-pointer select-none transition-transform duration-200
          ${selectedCard === card ? "scale-110 ring-4 ring-yellow-400" : ""}
          `}
          >
            {card.value}
          </div>
        ))}
      </div>
    </div>
  )
}
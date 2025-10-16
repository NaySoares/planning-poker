interface IContainerCards {
  selectedCard: string | null;
  setSelectedCard: (card: string) => void;
}

const cards = ["0", "1", "2", "3", "5", "8", "13", "20", "40", "100", "☕"];

export function ContainerCards({ selectedCard, setSelectedCard }: IContainerCards) {
  return (
    <div>
      {/* Container de cartas: bottom */}
      <div className="h-32 bg-gray-800 flex items-center justify-center space-x-3 px-4 shadow-inner">
        {cards.map((card) => (
          <div
            key={card}
            onClick={() => setSelectedCard(card)}
            className={`w-16 h-24 bg-white rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold cursor-pointer select-none transition-transform duration-200
              ${selectedCard === card ? "scale-110 ring-4 ring-yellow-400" : ""}
            `}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  )
}
'use client';
import { ISelectedCard } from "@/@types/types";
import { ContainerCards } from "@/components/container-cards";
import { PokerTable } from "@/components/poker-table";
import { useState } from "react";

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<ISelectedCard>({
    value: "?",
    description: undefined,
  });
  const [round, setRound] = useState(false);

  const handleSelectCard = (card: ISelectedCard) => {
    if (selectedCard.value === card.value) {
      return setSelectedCard({ value: "?", description: undefined });
    }
    setSelectedCard(card);
  };


  return (
    <div className="relative w-full h-screen bg-green-900 flex flex-col overflow-hidden">
      <div className="flex-1 relative flex items-center justify-center">
        <PokerTable selectedCard={selectedCard} />
      </div>
      <button className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer"
        onClick={() => {
          if (round) {
            setSelectedCard({ value: "?", description: undefined })
          }
          setRound(!round)
        }}
      >
        {round ? 'Encerrar rodada' : 'Iniciar rodada'}
      </button>
      <ContainerCards
        selectedCard={selectedCard}
        handleSelectCard={handleSelectCard}
        fibonacci
        startRound={round}
      />
    </div>
  );
}

'use client';
import { ISelectedCard } from "@/@types/types";
import CoinFlip from "@/components/coin";
import { ContainerCards } from "@/components/container-cards";
import { PokerTable } from "@/components/poker-table";
import { useState } from "react";

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<ISelectedCard>({
    value: "?",
    description: '',
  });
  const [round, setRound] = useState(false);
  const [revealCards, setRevealCards] = useState(false);

  const handleSelectCard = (card: ISelectedCard) => {
    if (selectedCard.value === card.value) {
      return setSelectedCard({ value: "?", description: '' });
    }
    setSelectedCard(card);
  };

  const handleReveal = () => {
    if (!revealCards) {
      setRevealCards(true);
    } else {
      // Nova rodada: reseta tudo
      setSelectedCard({ value: "?", description: '' });
      setRevealCards(false);
    }
  };


  return (
    <div className="relative w-full h-screen bg-green-900 flex flex-col overflow-hidden">
      <div className="flex-1 relative flex items-center justify-center">
        <PokerTable selectedCard={selectedCard} revealCards={revealCards} />
      </div>

      <div className="absolute top-4 right-4 flex flex-col items-center justify-center gap-2 p-4">
        <button className=" bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer"
          onClick={() => {
            if (round) {
              setSelectedCard({ value: "?", description: '' })
              setRevealCards(false)
            }
            setRound(!round)
          }}
        >
          {round ? 'Encerrar rodada' : 'Iniciar rodada'}
        </button>

        <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition cursor-pointer disabled:bg-gray-600/90 disabled:cursor-not-allowed"
          onClick={handleReveal}
          disabled={!round || selectedCard.value === "?" || revealCards}
        >
          {revealCards ? 'Nova rodada' : 'Revelar cartas'}
        </button>
      </div>

      <ContainerCards
        selectedCard={selectedCard}
        handleSelectCard={handleSelectCard}
        fibonacci
        startRound={round}
        revealCards={revealCards}
      />
    </div>
  );
}

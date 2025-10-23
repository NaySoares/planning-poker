'use client';
import { ISelectedCard } from "@/@types/types";
import { ContainerCards } from "@/components/container-cards";
import { Modal } from "@/components/modal";
import { PokerTable } from "@/components/poker-table";
import { TaskManager } from "@/components/task-manager";
import { calculateConsensus } from "@/utils/calculate-consensus";
import { getRandomPlayer } from "@/utils/faker";

import { useMemo, useState } from "react";

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<ISelectedCard>({
    value: "?",
    description: '',
  });
  const [round, setRound] = useState(false);
  const [revealCards, setRevealCards] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { average, outliers } = useMemo(
    () => calculateConsensus(getRandomPlayer(10).map(p => ({
      id: p.id,
      name: p.name,
      vote: Number(p.cardValue.value) || 0,
    }))),
    []
  );

  const handleSelectCard = (card: ISelectedCard) => {
    if (selectedCard.value === card.value) {
      return setSelectedCard({ value: "?", description: '' });
    }
    setSelectedCard(card);
  };

  const handleReveal = () => {
    if (!revealCards) {
      setRevealCards(true);
      setIsOpen(true);
    } else {
      // Nova rodada: reseta tudo
      setSelectedCard({ value: "?", description: '' });
      setRevealCards(false);
    }
  };

  const ModalResults = () => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      >
        <div>
          <p className="font-bold text-lg text-black">
            Média das estimativas:{" "}
            <span className="text-blue-600">
              {average.toFixed(1)}
            </span>
          </p>

          {outliers.length > 0 && (
            <div className="mt-2 text-sm text-red-500">
              <p className="font-semibold">Votos fora da média:</p>
              {outliers.map((p) => (
                <div key={p.id}>
                  {p.name}: {p.vote}
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    )
  }

  return (
    <div className="relative w-full h-screen bg-green-900 flex flex-col overflow-hidden">
      <div className="flex-1 relative flex items-center justify-center bg-red-300">
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
          {round ? 'Próxima rodada' : 'Iniciar rodada'}
        </button>

        {round && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition cursor-pointer disabled:bg-gray-600/90 disabled:cursor-not-allowed"
            onClick={handleReveal}
            disabled={!round || selectedCard.value === "?" || revealCards}
          >
            {"Revelar cartas"}
          </button>
        )}
      </div>

      <ContainerCards
        selectedCard={selectedCard}
        handleSelectCard={handleSelectCard}
        fibonacci
        startRound={round}
        revealCards={revealCards}
      />

      <TaskManager />
      <ModalResults />
    </div>
  );
}

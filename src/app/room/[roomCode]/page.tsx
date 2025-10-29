'use client';
import { ISelectedCard } from "@/@types/types";
import { ContainerCards } from "@/components/container-cards";
import { Modal } from "@/components/modal";
import { PokerTable } from "@/components/poker-table";
import { SharedLinkButton } from "@/components/shared-link-button";
import { TaskManager } from "@/components/task-manager";
import { Button } from "@/components/ui/button";
import { useSocketContext } from "@/context/SocketProvider";
import { usePlayer } from "@/store/use-player";
import { usePlayers } from "@/store/use-players";
import { useTasks } from "@/store/use-tasks";
import { calculateConsensus } from "@/utils/calculate-consensus";
import { getRandomPlayer } from "@/utils/faker";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function RoomPage() {
  const [selectedCard, setSelectedCard] = useState<ISelectedCard>({
    value: "?",
    description: '',
  });
  const [round, setRound] = useState(false);
  const [revealCards, setRevealCards] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { roomCode } = useParams<{ roomCode: string }>();
  const { name, avatar } = usePlayer();
  const { setPlayers } = usePlayers();
  const { setTasks } = useTasks();
  const socket = useSocketContext()
  const router = useRouter();

  useEffect(() => {

    if (!roomCode) return

    const playerId = localStorage.getItem('playerId');
    socket.emit("join_room", {
      roomCode,
      playerId,
      name,
      avatar,
    })

    socket.on("notification", (msg: string) => {
      toast(msg);
    })

    socket.on("room:update", (data) => {
      if (data.players) {
        verifyKicked(data.players)
        setPlayers(data.players)
      }

      if (data.tasks) {
        setTasks(data.tasks)
      }
    })

    socket.on("error", handleError);

    return () => {
      socket.off("room:update")
      socket.off("error")
      socket.off("notification")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, roomCode]);

  const handleError = (msg: string) => {
    if (msg === 'Sala não encontrada') {
      router.push('/');
    }

    toast.error(msg);
  };

  const verifyKicked = (players: Array<{ id: string }>) => {
    const playerId = localStorage.getItem('playerId');
    const isPlayerInRoom = players.some(p => p.id === playerId);

    if (!isPlayerInRoom) {
      localStorage.removeItem('playerId');
      socket.disconnect();

      toast.warning("Você foi expulso da sala!");
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }

  };

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


  const Header = ({ roomCode }: { roomCode: string }) => {
    return (
      <header className="w-full p-4 text-white flex gap-2 justify-start bg-transparent items-center">
        <p className="text-sm font-bold">Sala: {roomCode}</p>
        <SharedLinkButton roomCode={roomCode} />
      </header>
    )
  }

  const imageBackground = "/background.jpg";
  const backgroundStyle = {
    backgroundImage: `url(${imageBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'overlay',
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 overflow-hidden"
      style={backgroundStyle}
    >
      <Header roomCode={roomCode} />

      <div className="flex-1 relative flex items-center justify-center">
        <PokerTable selectedCard={selectedCard} revealCards={revealCards} />
      </div>

      <div className="absolute top-4 right-4 flex flex-col items-center justify-center gap-2 p-4">
        <Button className=""
          onClick={() => {
            if (round) {
              setSelectedCard({ value: "?", description: '' })
              setRevealCards(false)
            }
            setRound(!round)
          }}
        >
          {round ? 'Próxima rodada' : 'Iniciar rodada'}
        </Button>

        {round && (
          <Button className="disabled:bg-gray-600/90 disabled:cursor-not-allowed disabled:hover:text-black"
            onClick={handleReveal}
            disabled={!round || selectedCard.value === "?" || revealCards}
          >
            {"Revelar cartas"}
          </Button>
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

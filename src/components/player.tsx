'use client';
import { ISelectedCard } from "@/@types/types";
import { getRandomCard } from "@/utils/deck-cards";
import React, { useEffect } from "react";
import { Card } from "./card";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Crown, UserX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

interface IPlayer {
  size: { width: number; height: number };
  selectedCard: ISelectedCard
  revealCards: boolean;
}

interface IPopverControll {
  children: React.ReactNode;
}

export const Player = ({ size, selectedCard, revealCards }: IPlayer) => {
  const [simulatedCards, setSimulatedCards] = React.useState<{ [key: number]: ISelectedCard }>({});

  const players = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${i + 1}`,
    cardValue: { value: "?", description: '' },
  }));

  const rx = size.width * 0.55;
  const ry = size.height * 0.55;
  const offset = size.width * 0.1;

  useEffect(() => {
    if (revealCards) {
      const randomCards: { [key: number]: ISelectedCard } = {};
      // Simula que cada jogador recebeu uma carta aleatória ao revelar
      players.forEach((p) => {
        if (p.id !== 1) {
          randomCards[p.id] = getRandomCard("fibonacci");
        }
      });
      setSimulatedCards(randomCards);
    } else {
      setSimulatedCards({});
    }
  }, [revealCards]);

  const IPopoverControll = ({ children }: IPopverControll) => {
    return (
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          {children}
        </PopoverTrigger>
        <PopoverContent className="bg-black/50 w-fit p-4 flex gap-2">
          <Tooltip>
            <TooltipTrigger>

              <Button variant="outline" size="icon"
                className="cursor-pointer hover:bg-teal-500 transition hover:text-white"
              >
                <Crown />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tornar mestre</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon"
                className="cursor-pointer transition hover:bg-red-600 hover:text-white"
              >
                <UserX />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Expulsar</TooltipContent>
          </Tooltip>
        </PopoverContent>
      </Popover>

    )
  }

  return (
    <>
      {/* Avatares e cartas */}
      {players.map((p, i) => {
        // Rotaciona 90° para que o primeiro jogador fique no topo
        const angle = (2 * Math.PI * i) / players.length - Math.PI / 2;
        const centerX = size.width / 2;
        const centerY = size.height / 2;

        // Posição do avatar (fora da mesa)
        const avatarX = centerX + (rx + offset) * Math.cos(angle) - 24;
        const avatarY = centerY + (ry + offset) * Math.sin(angle) - 24;

        // Posição da carta
        const cardDistance = offset * 0.9; // controla quão perto da mesa a carta fica
        const cardX = centerX + (rx + offset - cardDistance) * Math.cos(angle) - 20;
        const cardY = centerY + (ry + offset - cardDistance) * Math.sin(angle) - 28;

        // Define se o jogador está na metade superior (sin(angle) < 0)
        const isTop = Math.sin(angle) < 0;

        // Indicação: jogador local (id 1) vê sua carta selecionada
        const isLocalPlayer = p.id === 1;
        const hasVoted = isLocalPlayer && selectedCard.value !== "?";

        return (
          <React.Fragment key={p.id}>
            <Card
              cardX={cardX}
              cardY={cardY}
              angle={angle}
              isTop={isTop}
              card={isLocalPlayer ? selectedCard : simulatedCards[p.id] || { value: "?", description: '' }}
              reveal={revealCards}
            />

            {/* Avatar */}
            {isTop ? (
              <IPopoverControll>

                <div
                  className="absolute flex flex-col items-center transition-all duration-300"
                  style={{
                    left: `${avatarX}px`,
                    top: `${avatarY}px`,
                  }}
                >
                  {/* wrapper fixo para garantir a proporção da imagem */}
                  <span className="text-white text-xs mt-1 whitespace-nowrap">
                    {p.name} {isLocalPlayer && "👑"}
                  </span>
                  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-md bg-gray-900
                 ${hasVoted ? "border-green-500" : "border-white"}`}
                  >
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </IPopoverControll>
            ) : (
              <IPopoverControll>
                <div
                  className="absolute flex flex-col items-center transition-all duration-300"
                  style={{
                    left: `${avatarX}px`,
                    top: `${avatarY}px`,
                  }}
                >
                  {/* wrapper fixo para garantir a proporção da imagem */}
                  <div className={`w-12 h-12 rounded-full overflow-hidden border-2 shadow-md bg-gray-900
                 ${hasVoted ? "border-green-500" : "border-white"}`}
                  >
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-white text-xs mt-1 whitespace-nowrap">
                    {p.name}
                  </span>
                </div>
              </IPopoverControll>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

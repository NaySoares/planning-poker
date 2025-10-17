'use client';
import { ISelectedCard } from "@/@types/types";
import React from "react";

interface IPlayer {
  size: { width: number; height: number };
  selectedCard: ISelectedCard
}

interface ICard {
  cardX: number;
  cardY: number;
  angle: number;
  isTop: boolean;
  cardValue: ISelectedCard;
}

export const Player = ({ size, selectedCard }: IPlayer) => {

  const players = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${i + 1}`,
    cardValue: { value: "?", description: undefined },
  }));

  const rx = size.width * 0.55;
  const ry = size.height * 0.55;
  const offset = size.width * 0.1;


  const Card = ({ cardX, cardY, angle, isTop, cardValue }: ICard) => {
    return (
      <div
        className="absolute w-10 h-14 bg-white rounded-md shadow-lg flex items-center justify-center text-xl font-bold text-gray-800 select-none"
        style={{
          left: `${cardX}px`,
          top: `${cardY}px`,
          transform: isTop ? `rotate(${(angle * 180) / Math.PI + 90}deg)` : `rotate(${(angle * 180) / Math.PI + 90}deg)`,
        }}
      >
        <div
          className={`absolute w-10 h-14 rounded-md shadow-lg flex items-center justify-center flex-col text-sm font-bold ${cardValue.value === "?"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-800"
            }`}
        >
          {cardValue.value}
          {cardValue.description && (
            <span className="text-[8px] text-center font-normal mt-0.5">{cardValue.description}</span>
          )}
        </div>
      </div>
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

        return (
          <React.Fragment key={p.id}>
            <Card
              cardX={cardX}
              cardY={cardY}
              angle={angle}
              isTop={isTop}
              cardValue={isLocalPlayer && selectedCard ? selectedCard : p.cardValue}
            />

            {/* Avatar */}
            {isTop ? (
              <div
                className="absolute flex flex-col items-center transition-all duration-300"
                style={{
                  left: `${avatarX}px`,
                  top: `${avatarY}px`,
                }}
              >
                {/* wrapper fixo para garantir a proporção da imagem */}
                <span className="text-white text-xs mt-1 whitespace-nowrap">
                  {p.name}
                </span>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-900">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div
                className="absolute flex flex-col items-center transition-all duration-300"
                style={{
                  left: `${avatarX}px`,
                  top: `${avatarY}px`,
                }}
              >
                {/* wrapper fixo para garantir a proporção da imagem */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-900">
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
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}

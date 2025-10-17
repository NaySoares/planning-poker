'use client';
import React, { useEffect, useRef, useState } from "react";
import { Player } from "./player";
import { ISelectedCard } from "@/@types/types";
import { TaskCard } from "./task-card";
import CoinFlip from "./coin";

interface IPokerTable {
  selectedCard: ISelectedCard
  revealCards: boolean
}

export function PokerTable({ selectedCard, revealCards }: IPokerTable) {
  const tableRef = useRef(null);
  const [size, setSize] = useState({ width: 600, height: 300 });

  const task = {
    title: "TEST-23",
    description: "A primeira tarefa da semana é criar a landing page com tailwindcss e react. Por favor, certifique-se de que a página seja responsiva e funcione bem em dispositivos móveis e não esqueça de adicionar animações suaves para melhorar a experiência do usuário.",
  };

  useEffect(() => {
    const updateSize = () => {
      if (!tableRef.current) return;

      const screenWidth = window.innerWidth;
      const maxWidth = Math.min(screenWidth * 0.8, 700); // até 700px
      const width = maxWidth;
      const height = maxWidth / 2; // proporção 2:1

      setSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen bg-green-900 flex items-center justify-center">
        {/* Mesa */}
        <div
          ref={tableRef}
          className="relative flex items-center justify-center rounded-[60px] border-8 border-green-800 shadow-2xl transition-all duration-300"
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            background:
              "radial-gradient(circle at center, #14532d 0%, #064e3b 70%, #022c22 100%)",
          }}
        >
          {/* Tapete interno */}
          <div className="absolute inset-8 rounded-[40px] bg-green-700 shadow-inner"></div>

          <TaskCard
            title={task.title}
            description={task.description}
          />

          <Player
            size={size}
            selectedCard={selectedCard}
            revealCards={revealCards}
          />
        </div>
      </div>
    </>
  );
}

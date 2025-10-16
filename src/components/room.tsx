'use client';
import React, { useEffect, useRef, useState } from "react";

export function Room() {
  const tableRef = useRef(null);
  const [size, setSize] = useState({ width: 600, height: 300 });
  const [selectedCard, setSelectedCard] = useState(null);

  const players = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${i + 1}`,
    cardValue: i % 2 === 0 ? "?" : 7,
  }));

  const task = {
    title: "TEST-23",
    description: "A primeira tarefa da semana é criar a landing page com tailwindcss e react. Por favor, certifique-se de que a página seja responsiva e funcione bem em dispositivos móveis e não esqueça de adicionar animações suaves para melhorar a experiência do usuário.",
  };

  const rx = size.width * 0.55;
  const ry = size.height * 0.55;
  const offset = size.width * 0.1;

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

        {/* Quadro central */}
        <div className="absolute flex flex-col items-center justify-center text-center px-6 py-4 bg-white/90 rounded-lg shadow-lg max-w-xs">
          <h2 className="text-sm font-bold text-gray-900">{task.title}</h2>
          <p className="text-xs text-gray-800">{task.description}</p>
        </div>

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

          return (
            <React.Fragment key={p.id}>
              {/* Carta */}
              <div
                className="absolute w-10 h-14 bg-white rounded-md shadow-lg flex items-center justify-center text-xl font-bold text-gray-800 select-none"
                style={{
                  left: `${cardX}px`,
                  top: `${cardY}px`,
                  transform: isTop ? `rotate(${(angle * 180) / Math.PI + 90}deg)` : `rotate(${(angle * 180) / Math.PI + 90}deg)`,
                }}
              >
                <div
                  className={`absolute w-10 h-14 rounded-md shadow-lg flex items-center justify-center flex-col text-xl font-bold ${p.cardValue === "?"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                    }`}
                >
                  {p.cardValue}
                  {p.cardValue !== "?" && (
                    <p className="text-[7px]">sete</p>
                  )}
                </div>
              </div>

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
      </div>
    </div>
  );
}

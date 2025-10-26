import { create } from "zustand";

// Player é a representação do jogador atual
export const usePlayer = create<{
  id: string;
  name: string;
  isMaster: boolean;
  avatar: string;
  cardValue: string;
  setPlayerInfo: (id: string, name: string, isMaster: boolean) => void;
  setCardValue: (cardValue: string) => void;
}>((set) => ({

  id: "",
  name: "",
  isMaster: false,
  avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=2`,
  cardValue: "",

  setPlayerInfo: (id, name, isMaster) =>
    set(() => ({
      id,
      name,
      isMaster,
    })),

  setCardValue: (cardValue) =>
    set(() => ({
      cardValue,
    })),
}));
import { create } from "zustand";

// Player é a representação do jogador atual
export const usePlayer = create<{
  id: string;
  name: string;
  masterId?: string;
  avatar: string;
  cardValue: string;
  setPlayerInfo: (id: string, name: string, masterId: string) => void;
  setCardValue: (cardValue: string) => void;
}>((set) => ({

  id: "",
  name: "",
  masterId: "",
  avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=2`,
  cardValue: "",

  setPlayerInfo: (id, name, masterId) =>
    set(() => ({
      id,
      name,
      masterId,
    })),

  setCardValue: (cardValue) =>
    set(() => ({
      cardValue,
    })),
}));
import { create } from "zustand";

// Player é a representação do jogador atual
export const usePlayer = create<{
  playerId: string;
  name: string;
  isMaster: boolean;
  avatar: string;
  cardValue: string;
  roomCode?: string;
  setRoomCode: (roomCode: string) => void;
  setPlayerInfo: (playerId: string, name: string, isMaster: boolean) => void;
  setCardValue: (cardValue: string) => void;
}>((set) => ({

  playerId: "",
  name: "",
  isMaster: false,
  avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=2`,
  cardValue: "",
  roomCode: undefined,

  setPlayerInfo: (playerId, name, isMaster) =>
    set(() => ({
      playerId,
      name,
      isMaster,
    })),

  setCardValue: (cardValue) =>
    set(() => ({
      cardValue,
    })),

  setRoomCode: (roomCode) =>
    set(() => ({
      roomCode,
    })),
}));
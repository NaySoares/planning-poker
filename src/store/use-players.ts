import { IPlayer } from "@/@types/types";
import { create } from "zustand/react";

// Players é a representação de todos os jogadores na sala
export const usePlayers = create<{
  players: IPlayer[];
  setPlayers: (players: IPlayer[]) => void;
}>((set) => ({
  players: [],
  setPlayers: (players) =>
    set(() => ({
      players,
    })),
}));
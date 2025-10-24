'use client';

import React, { createContext, useContext } from "react";
import type { Socket } from "socket.io-client";
import { useSocket } from "@/hooks/useSocket";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const socket = useSocket(true);
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): Socket => {
  const s = useContext(SocketContext);
  if (!s) throw new Error("useSocketContext must be used inside SocketProvider");
  return s;
};

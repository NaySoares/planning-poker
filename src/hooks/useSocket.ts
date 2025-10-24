'use client';

import { useEffect, useMemo } from "react";
import type { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";

export function useSocket(autoConnect = true): Socket {
  const socket = useMemo(() => getSocket(), []);

  useEffect(() => {
    if (!autoConnect) return;

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      // socket.disconnect();
      // se quiser desconectar ao desmontar, descomente acima
    };
  }, [socket, autoConnect]);

  return socket;
}

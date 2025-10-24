// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  // garante execução apenas no browser
  if (typeof window === "undefined") {
    console.warn("⚠️ getSocket() foi chamado no servidor — retornando socket fake");
    // retorna um objeto "mock" com apenas as assinaturas esperadas
    return {
      on: () => { },
      emit: () => { },
      connect: () => { },
      disconnect: () => { },
      connected: false,
    } as unknown as Socket;
  }

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:3333", {
      autoConnect: false,
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Socket conectado:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket desconectado");
    });
  }

  return socket;
}

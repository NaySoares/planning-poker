'use client';

import { BoxJoinRoom } from "@/components/boxJoinRoom";
import { BoxNewRoom } from "@/components/boxNewRoom";
import { BoxRegister } from "@/components/boxRegister";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useSocketContext } from "@/context/SocketProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [isNewRoom, setIsNewRoom] = useState(false);

  const socket = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRoomUpdate = (data: any) => {
      console.log("📡 Atualização da sala:", data);
    };

    const handleError = (msg: string) => {
      toast.error(msg);
    };

    socket.on("room:update", handleRoomUpdate);
    socket.on("error", handleError);

    return () => {
      socket.off("room:update", handleRoomUpdate);
      socket.off("error", handleError);
    };
  }, [socket]);



  const imageBackground = "/backgroundHome.jpg";

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-700"
      style={{ backgroundImage: `url(${imageBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Header />
      <div className="grid grid-cols-2 flex-1">
        <div className="flex flex-col items-center justify-center gap-6">
          <h3 className="text-4xl font-bold text-white">Comece a jogar</h3>
          {isNewRoom ?
            <BoxRegister
              isNewRoom={isNewRoom}
              setIsNewRoom={setIsNewRoom}
            />
            :
            <BoxNewRoom isNewRoom={isNewRoom} setIsNewRoom={setIsNewRoom} />
          }

        </div>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center justify-center gap-1">
            <h3 className="text-4xl font-bold text-white">Convidados</h3>
            <h4 className="text-xl text-gray-300">Entre em uma sala</h4>
          </div>
          <BoxJoinRoom />
        </div>
      </div>
      <Footer />
    </div>
  );
}

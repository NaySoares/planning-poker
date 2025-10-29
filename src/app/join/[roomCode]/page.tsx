'use client'

import { BoxJoinRoom } from "@/components/boxJoinRoom";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useParams } from "next/navigation";

export default function JoinPage() {
  const { roomCode } = useParams<{ roomCode: string }>();

  const imageBackground = "/background.jpg";
  const backgroundStyle = {
    backgroundImage: `url(${imageBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'overlay',
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 overflow-hidden"
      style={backgroundStyle}
    >
      <Header />
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl text-white font-bold m-4">Poker Planning</h1>
        <BoxJoinRoom roomCode={roomCode} />
      </div>
      <Footer />
    </div>
  )
}
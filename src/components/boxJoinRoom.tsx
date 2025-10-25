import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { joinRoom } from "@/services/api-service";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/store/use-player";


export const BoxJoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const { setPlayerInfo } = usePlayer();

  const validateForm = () => {
    if (!name.trim() || !roomCode.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  }

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await joinRoom({ name, roomCode });
      if (result && "playerId" in result) {
        toast.success("Entrou na sala com sucesso!");
        setName("");
        setRoomCode("");

        localStorage.setItem('playerId', result.playerId);
        setPlayerInfo("", name, "");
        router.push(`/room/${roomCode}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Erro ao entrar na sala. Tente novamente.")
    }
  };

  return (
    <div className="bg-gray-800/80 p-8 rounded-md shadow-md">
      <form className="flex flex-col gap-2 min-w-[300px]" onSubmit={handleJoin}>
        <label className="text-white">Nome</label>
        <input
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
        />

        <label className="text-white">Código da Sala</label>
        <input
          type="text"
          placeholder="Código da Sala"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
        />
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
          Entrar na sala
        </Button>
      </form>
    </div>
  )
};

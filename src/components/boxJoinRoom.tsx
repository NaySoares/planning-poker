import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { joinRoom } from "@/services/api-service";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/store/use-player";

interface IBoxJoinRoom {
  roomCode?: string;
}


export const BoxJoinRoom = ({ roomCode }: IBoxJoinRoom) => {
  const [roomCodeForm, setRoomCodeForm] = useState(roomCode || "");
  const [name, setName] = useState("");

  const router = useRouter();
  const { setPlayerInfo, setRoomCode } = usePlayer();

  const validateForm = () => {
    if (!name.trim() || !roomCodeForm.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  }

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await joinRoom({ name, roomCode: roomCodeForm });
      if (result && "playerId" in result) {
        toast.success("Entrou na sala com sucesso!");
        setName("");
        setRoomCodeForm("");

        localStorage.setItem('playerId', result.playerId);
        setPlayerInfo(result.playerId, name, false);
        setRoomCode(roomCodeForm);
        router.push(`/room/${roomCodeForm}`);
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
          value={roomCodeForm}
          onChange={(e) => setRoomCodeForm(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
        />
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
          Entrar na sala
        </Button>
      </form>
    </div>
  )
};

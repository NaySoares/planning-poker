import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { createRoom } from "@/services/api-service";
import { useRouter } from "next/navigation";
import { usePlayer } from "@/store/use-player";

interface BoxNewRoom {
  isNewRoom: boolean;
  setIsNewRoom: (value: boolean) => void;
}

export const BoxNewRoom = ({ isNewRoom, setIsNewRoom }: BoxNewRoom) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { setPlayerInfo } = usePlayer();

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const result = await createRoom({ email, password });

      if (result && 'room' in result) {
        toast.success("Sala criada com sucesso!");

        localStorage.setItem('playerId', result.playerId);
        setPlayerInfo("", result.user.name, true);

        setEmail("");
        setPassword("");

        router.push(`/room/${result.room.code}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.message || "Erro ao criar a sala. Verifique os dados.");
    }
  }

  const validateForm = () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return false;
    }
    return true;
  }

  return (
    <div className="bg-gray-800/80 p-8 rounded-md shadow-md">
      <form className="flex flex-col gap-2 min-w-[300px]" onSubmit={handleCreateRoom}>
        <label className="text-white">E-mail</label>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
        />

        <label className="text-white">Senha</label>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
        />
        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md w-full">
          Criar sala
        </Button>
        <p
          className="text-center text-gray-300 mt-4 hover:text-teal-600 hover:font-bold cursor-pointer transition duration-200"
          onClick={() => setIsNewRoom(!isNewRoom)}
        >
          {isNewRoom ? 'Criar sala?' : 'Criar uma conta?'}
        </p>
      </form>
    </div>
  );
}

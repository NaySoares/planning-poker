import { Button } from "./ui/button";

interface BoxJoinRoom {
  name: string;
  setName: (value: string) => void;
  roomCode: string;
  setRoomCode: (value: string) => void;
  handleJoin: (e: React.FormEvent) => void;
}

export const BoxJoinRoom = ({ name, setName, roomCode, setRoomCode, handleJoin }: BoxJoinRoom) => (
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
);

import { Button } from "./ui/button";

interface BoxRegister {
  isNewRoom: boolean;
  setIsNewRoom: (value: boolean) => void;
}

export const BoxRegister = ({ isNewRoom, setIsNewRoom }: BoxRegister) => (
  <div className="bg-gray-800/80 p-8 rounded-md shadow-md">
    <form className="flex flex-col gap-2 min-w-[300px]">
      <label className="text-white">Nome</label>
      <input
        type="text"
        placeholder="Nome"
        className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
      />

      <label className="text-white">E-mail</label>
      <input
        type="text"
        placeholder="E-mail"
        className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
      />

      <label className="text-white">Senha</label>
      <input
        type="password"
        placeholder="Senha"
        className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
      />

      <label className="text-white">Confirmar Senha</label>
      <input
        type="password"
        placeholder="Confirmar Senha"
        className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
      />

      <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md w-full">
        Criar Conta
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

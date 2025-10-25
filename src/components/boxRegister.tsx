import { toast } from "sonner";
import { Button } from "./ui/button";
import { useState } from "react";
import { createUser } from "@/services/api-service";

interface BoxRegister {
  isNewRoom: boolean;
  setIsNewRoom: (value: boolean) => void;
}

export const BoxRegister = ({ isNewRoom, setIsNewRoom }: BoxRegister) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateForm = () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await createUser({ name, email, password });

    try {
      if (result) {
        toast.success("Conta criada com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar a conta. Tente novamente.")
    }
  }

  return (
    <div className="bg-gray-800/80 p-8 rounded-md shadow-md">
      <form
        className="flex flex-col gap-2 min-w-[300px]"
        onSubmit={handleSubmit}
      >
        <label className="text-white">Nome</label>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
        />

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

        <label className="text-white">Confirmar Senha</label>
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
        />

        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md w-full">
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
}
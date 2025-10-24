'use client';

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isNewRoom, setIsNewRoom] = useState(false);

  const imageBackground = "/backgroundHome.jpg";

  const BoxNewRoom = () => {
    return (
      <div className="bg-gray-800/80 p-8 rounded-md shadow-md">
        <form className="flex flex-col gap-2 min-w-[300px]">
          <label className="text-white">E-mail</label>
          <input
            type="text"
            placeholder="E-mail"
            className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
          />
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md w-full">
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
    )
  }

  const BoxJoinRoom = () => {
    return (
      <div className="bg-gray-800/80 p-8 rounded-md shadow-md">
        <form className="flex flex-col gap-2 min-w-[300px]">
          <label className="text-white">Código da Sala</label>
          <input
            type="text"
            placeholder="Código da Sala"
            className="px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-teal-500"
          />
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
            Entrar na sala
          </Button>
        </form>
      </div>
    )
  }

  const BoxRegister = () => {
    return (
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
    )
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-700"
      style={{ backgroundImage: `url(${imageBackground})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Header />
      <div className="grid grid-cols-2 flex-1">
        <div className="flex flex-col items-center justify-center gap-6">
          <h3 className="text-4xl font-bold text-white">Comece a jogar</h3>
          {isNewRoom ? <BoxRegister /> : <BoxNewRoom />}

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

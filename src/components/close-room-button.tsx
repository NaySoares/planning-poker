'use client';

import { Button } from "./ui/button";
import { DoorOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "./ui/alert-dialog";
import { useSocketContext } from "@/context/SocketProvider";
import { usePlayer } from "@/store/use-player";
import { useRouter } from "next/navigation";

interface IDialog {
  trigger: React.ReactNode;
  title: string;
  text: string;
  onConfirm: () => void;
}

export const CloseRoomButton = () => {
  const socket = useSocketContext();
  const { roomCode, isMaster } = usePlayer();
  const router = useRouter()

  const handleConfirm = () => {
    if (isMaster) {
      socket.emit("room:close", {
        roomCode
      });
    } else {
      socket.emit("room:leave", {
        roomCode
      });

      router.push("/");
    }
  }

  const Dialog = ({ trigger, title, text, onConfirm }: IDialog) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription asChild>
              {<div dangerouslySetInnerHTML={{ __html: text }} />}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Sair</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  const msgExit = isMaster ? "Você está prestes a fechar a sala. Todos os jogadores serão desconectados." : "Você está prestes a sair da sala.";

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Dialog
            trigger={
              <Button variant="outline" size="icon" className="text-black bg-teal-500 hover:bg-red-600 hover:text-white transition border-0 duration-300">
                <DoorOpen />
              </Button >
            }
            title="Aviso de saída"
            text={msgExit}
            onConfirm={() => handleConfirm()}
          />
        </TooltipTrigger>
        <TooltipContent>Fechar sala</TooltipContent>
      </Tooltip>
    </>
  )
}
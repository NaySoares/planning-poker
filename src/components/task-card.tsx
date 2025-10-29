import { ITask } from "@/@types/types";
import { useSocketContext } from "@/context/SocketProvider";
import { useEffect, useState } from "react";


export const TaskCard = () => {
  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  const socket = useSocketContext();

  useEffect(() => {
    if (!socket) return;
    // TODO: mudar para task:current
    socket.on("task:update", (data: { tasks: ITask[] }) => {
      setCurrentTask(data.tasks[0] || null);
    })
  }, [socket])


  return (
    <div className="absolute flex flex-col items-center justify-center text-center px-6 py-4 bg-white/90 rounded-lg shadow-lg max-w-xs">
      {currentTask ? (
        <>
          <h2 className="text-sm font-bold text-gray-900">{currentTask?.title}</h2>
          {currentTask?.description && <p className="text-xs text-gray-800">{currentTask.description}</p>}
        </>
      ) : (
        <p className="text-sm text-gray-600">Nenhuma tarefa cadastrada.</p>
      )}
    </div>
  );
};

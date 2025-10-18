import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description?: string;
}

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [hiddenBox, setHiddenBox] = useState(true);

  const addTask = () => {
    if (!title.trim()) {
      setError(true);
      return;
    }

    setError(false);
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
    };
    setTasks([newTask, ...tasks]);
    setTitle("");
    setDescription("");
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const ButtonShowBox = () => {
    return (
      <button
        className="fixed bottom-4 left-4 bg-blue-600 text-white text-sm px-2 py-2 rounded shadow hover:bg-blue-700 transition z-50 cursor-pointer"
        onClick={() => setHiddenBox(!hiddenBox)}
      >
        {hiddenBox ? "Mostrar Tarefas" : "Esconder Tarefas"}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 w-80 z-50">
      {hiddenBox ? <ButtonShowBox /> :

        (
          <>
            <AnimatePresence initial={false}>
              <div className="flex flex-col-reverse mb-2 space-y-1 space-y-reverse">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                    className="bg-white/70 hover:bg-white/100 shadow-md rounded p-2 flex justify-between items-start group transition-all duration-300"
                  >
                    <div>
                      <p className="font-semibold text-black">{task.title}</p>
                      {task.description && (
                        <p className="text-xs text-gray-600 group-hover:block hidden transition-all duration-300">{task.description}</p>
                      )}
                    </div>
                    <button
                      className="cursor-pointer text-red-500 hover:text-red-700 ml-2"
                      onClick={() => deleteTask(task.id)}
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>

            {/* Caixa de cadastro */}
            <div className="bg-gray-100 p-3 rounded shadow-md flex flex-col gap-2">
              <div className="flex flex-row justify-between items-center">
                <p className="text-xs font-bold text-black text-center">Cadastre sua tarefa</p>
                <p
                  className="text-gray-600 hover:text-blue-600 hover:scale-105 transition-all duration-300 text-xs font-normal cursor-pointer"
                  onClick={() => setHiddenBox(true)}
                >
                  Esconder
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label className="sr-only">Título da tarefa</label>
                <input
                  type="text"
                  placeholder="Título"
                  className="px-2 py-1 text-black text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {error &&
                  <p className="text-red-500 text-[10px] ">é preciso preencher o título</p>
                }
              </div>
              <div className="flex flex-col gap-1">
                <label className="sr-only">Descrição da tarefa</label>
                <textarea
                  placeholder="Descrição (opcional)"
                  className="px-2 py-1 text-black text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <button
                className="cursor-pointer bg-blue-600 text-white text-sm py-1 rounded hover:bg-blue-700 transition"
                onClick={addTask}
              >
                Cadastrar
              </button>
            </div>
          </>
        )}
    </div>
  );
};

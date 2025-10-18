import { ITask } from "@/@types/types";
import { create } from "zustand";

interface ITaskManager {
  tasks: Array<ITask>;
  addTask: (title: string, description?: string) => void;
  deleteTask: (id: string) => void;
  attTaskVote: (id: string, completed: boolean) => void;
}

export const useTaskManager = create<ITaskManager>((set) => ({
  tasks: [],

  addTask: (title, description) =>
    set((state) => {
      const newTask = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description?.trim() || undefined,
        createdAt: Date.now(),
        completed: false,
      };
      return { tasks: [newTask, ...state.tasks] };
    }),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  attTaskVote: (id, completed) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, completed } : t
      ),
    })),
}));
import { ITask } from "@/@types/types";
import { create } from "zustand";

export const useTasks = create<{
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;
}>((set) => ({
  tasks: [],
  setTasks: (tasks) =>
    set(() => ({
      tasks,
    })),
}));
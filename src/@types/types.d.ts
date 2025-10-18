export interface ISelectedCard {
  value: string | number;
  description?: string;
}

interface IRoom {
  id: string;
  code: string;          // ex: AB12CD
  masterId: string;      // quem criou
  tasks: Task[];
  players: Player[];
  currentTaskId?: string;
  status: "waiting" | "in_progress" | "finished";
}

interface IPlayer {
  id: string;
  name: string;
  avatar?: string;
  isMaster: boolean;
  socketId: string;
  currentVote?: number;
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  createdAt: number;
  completed?: boolean;
}

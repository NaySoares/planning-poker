export interface ISelectedCard {
  value: string | number;
  description?: string;
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  createdAt: number;
  completed?: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface UserDTO {
  name: string;
  email: string;
  password: string;
}

export interface IResponseCreateRoom {
  token: string
  refreshToken: string
  masterId: string
  room: {
    id: string;
    code: string;
    masterId: string;
    currentTask: string | null;
    status: string;
    createdAt: Date;
  }
  user: {
    id: string
    name: string
    email: string
  }
  playerId: string
}

export interface IPlayer {
  id: string
  name: string
  avatar: string
  isMaster: boolean
  socketId: string
  isReady?: boolean
}

export type RoomWithRelations = {
  players: {
    name: string;
    id: string;
    avatar: string | null;
    roomId: string;
    socketId: string | null;
    currentVote: number | null;
    isMaster: boolean;
  }[];
  tasks: {
    id: string;
    createdAt: Date;
    roomId: string;
    description: string | null;
    title: string;
    completed: boolean;
    updatedAt: Date;
  }[];
} & {
  id: string;
  code: string;
  masterId: string;
  currentTask: string | null;
  status: $Enums.RoomStatus;
  createdAt: Date;
} & {
  playerId: string;
}
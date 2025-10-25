import { IResponseCreateRoom, IUser, RoomWithRelations, UserDTO } from '@/@types/types'
import { api } from '@/lib/api'

const errorDefault = { status: 400, message: 'Erro desconhecido' }

export const createUser = async (data: UserDTO): Promise<IUser | Error> => {
  try {
    const response = await api.post('/signup', data)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('Erro ao criar usuário:', error?.message)
    if (error.status >= 400 && error.status < 500) {
      throw error
    } else {
      throw new Error(errorDefault.message)
    }
  }
}

export const createRoom = async (data: { email: string, password: string }): Promise<IResponseCreateRoom | Error> => {
  try {
    const response = await api.post('/room', data)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('Erro ao criar sala:', error?.message)
    if (error.status >= 400 && error.status < 500) {
      throw error
    } else {
      throw new Error(errorDefault.message)
    }
  }
}

export const joinRoom = async (data: { name: string, roomCode: string }): Promise<RoomWithRelations | Error> => {
  try {
    const response = await api.post('/room/join', data)
    return response.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.status >= 400 && error.status < 500) {
      throw error
    } else {
      throw new Error(errorDefault.message)
    }
  }
}
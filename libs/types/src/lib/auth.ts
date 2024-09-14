import { IUser } from './user'


interface IUserAuth {
    login: string
    password: string
    refreshToken: string | null
}

interface IAuthResponse {
    user: IUser,
    accessToken: string
}

interface ITokenPayload {
    userId: number
}

export { IAuthResponse, ITokenPayload, IUserAuth }
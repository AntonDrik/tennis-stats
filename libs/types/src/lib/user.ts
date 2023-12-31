import { IUserAuth } from './auth'
import { IRatingHistory } from './rating-history'


interface IUser {
    id: number
    firstName: string
    lastName: string
    fullName: string
    color: string
    shortFullName: string
    rating: number
    ratingHistory?: IRatingHistory[]
    auth?: IUserAuth
}

export { IUser }
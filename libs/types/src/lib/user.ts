import { IRatingHistory } from './rating-history'


interface IUser {
    id: number
    firstName: string
    lastName: string
    fullName: string
    color: string
    shortFullName: string
    age: number
    ratingHistory?: IRatingHistory[]
}

export { IUser }
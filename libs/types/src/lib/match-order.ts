import { IUser } from './user'


export interface IMatchOrder {
    order: number
    user1: IUser
    user2: IUser
}
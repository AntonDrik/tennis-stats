import { IUser } from './user'


interface IRatingHistory {
    id: number
    user: IUser
    rating: number
    date: Date
}

interface IAvgRatingByDay {
    formattedDate: string,
    rating: number,
    userId: number,
    userFirstName: string,
    userLastName: string,
    userAge: number
    userColor: string
}

export {
    IRatingHistory,
    IAvgRatingByDay
}
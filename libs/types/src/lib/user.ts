/**
 * Интерфейс пользователя
 */
interface IUser {
    id: number
    firstName: string
    lastName: string
    fullName: string
    shortFullName: string
    age: number
}

export { IUser }
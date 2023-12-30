import { IUser } from '@tennis-stats/types'


export type TSeedUser = Omit<IUser, 'id' | 'fullName' | 'shortFullName'>

export const users: TSeedUser[] = [
    {
        firstName: 'Антон',
        lastName: 'Дрик',
        age: 27,
        color: '#C9E8CA'
    },
    {
        firstName: 'Антон',
        lastName: 'Коновалов',
        age: 27,
        color: '#DADCFF'
    },
    {
        firstName: 'Сева',
        lastName: 'Семенчуков',
        age: 26,
        color: '#FBE577'
    }
]

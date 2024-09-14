import { EPermission, IUser, IUserAuth } from '@tennis-stats/types'


export interface ISeedUser extends Omit<IUser, 'id' | 'fullName' | 'shortFullName' | 'auth' | 'permissions'> {
    auth: IUserAuth
    permissions: EPermission[]
}

export const users: ISeedUser[] = [
    {
        firstName: 'Антон',
        lastName: 'Дрик',
        color: '#C9E8CA',
        rating: 100,
        auth: {
            login: 'adryk',
            password: '$2b$10$Xoa8hdfi4CjRfliGmKy83.G3cJ1ro/FOocjXb.q1YCgWW6sG5o2EO',
            refreshToken: null
        },
        permissions: [EPermission.CREATE_USER, EPermission.TOUR_CRUD, EPermission.GAME_SET_CRUD]
    },
    {
        firstName: 'Антон',
        lastName: 'Коновалов',
        color: '#DADCFF',
        rating: 100,
        auth: {
            login: 'toharik',
            password: '$2b$10$EMdencGttrWpLxCrYh0uqujUiGtqOGQZRQlWZbz4XS8rywo.WNKbS',
            refreshToken: null
        },
        permissions: [EPermission.TOUR_CRUD, EPermission.GAME_SET_CRUD]
    },
    {
        firstName: 'Сева',
        lastName: 'Семенчуков',
        color: '#FBE577',
        rating: 100,
        auth: {
            login: 'sewaparts',
            password: '$2b$10$gw0u3EOqv/9hDjuWx7RKA.PaIRxuHxCAGoklHMJLDgM9v4DXiAKuy',
            refreshToken: null
        },
        permissions: [EPermission.TOUR_CRUD, EPermission.GAME_SET_CRUD]
    }
]

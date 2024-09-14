
export interface IPermission {
    id: number
    value: EPermission
}

export enum EPermission {
    CREATE_USER = 'CREATE_USER',
    TOUR_CRUD = 'TOUR_CRUD',
    GAME_SET_CRUD = 'GAME_SET_CRUD'
}

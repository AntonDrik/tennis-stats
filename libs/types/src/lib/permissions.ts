export interface IPermission {
  id: number;
  value: EPermission;
}

export enum EPermission {
  CREATE_USER = 'CREATE_USER',
  TOURNAMENT_CRUD = 'TOURNAMENT_CRUD',
  GAME_SET_CRUD = 'GAME_SET_CRUD',
}

export interface IPermission {
  id: number;
  value: EPermission;
}

export enum EPermission {
  USERS_CRUD = 'USERS_CRUD',
  TOURNAMENT_CRUD = 'TOURNAMENT_CRUD',
  SEASONS_CRUD = 'SEASONS_CRUD',
}

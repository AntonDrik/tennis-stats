export interface IPermission {
  id: number;
  value: EPermission;
}

export enum EPermission {
  CREATE_USER = 'CREATE_USER',
  TOURNAMENT_CRUD = 'TOURNAMENT_CRUD',
}

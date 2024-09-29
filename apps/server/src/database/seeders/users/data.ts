import { EPermission, IUser, IUserAuth } from '@tennis-stats/types';

export interface ISeedUser
  extends Omit<
    IUser,
    'id' | 'fullName' | 'shortFullName' | 'auth' | 'permissions'
  > {
  auth: IUserAuth;
  permissions: EPermission[];
}

export const users: ISeedUser[] = [
  {
    nickname: 'Халява',
    color: '#000',
    rating: 100,
    auth: {
      login: 'system_halyava',
      password: '$2a$10$yk36HIwluHlPwWNGIG52X.1Pgfizf8fm85isvKlHbP.P/CoJHjSbe',
      refreshToken: null,
    },
    permissions: [],
  },
];

import { EPermission } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { meAtom } from '../../core/store';

interface IPermissions {
  has: (permissions: EPermission[]) => boolean;
  canCrudUser: boolean;
  canCrudTournament: boolean;
  canCrudSeasons: boolean;
}

function useUserPermissions(): IPermissions {
  const user = useAtomValue(meAtom);

  const permissions = new Set(user?.permissions.map(({ value }) => value) ?? []);

  const has = (permissions: EPermission[]): boolean => {
    return user?.permissions.some((permission) => permissions.includes(permission.value)) ?? false;
  };

  return {
    has,
    canCrudUser: permissions.has(EPermission.USERS_CRUD),
    canCrudTournament: permissions.has(EPermission.TOURNAMENT_CRUD),
    canCrudSeasons: permissions.has(EPermission.SEASONS_CRUD),
  };
}

export default useUserPermissions;

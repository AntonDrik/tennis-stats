import { EPermission } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import { meAtom } from '../../core/store';

interface IPermissions {
  canCreateUser: boolean;
  canCrudTournament: boolean;
}

function useUserPermissions(): IPermissions {
  const user = useAtomValue(meAtom);

  const permissions = new Set(user?.permissions.map(({ value }) => value) ?? []);

  return {
    canCreateUser: permissions.has(EPermission.CREATE_USER),
    canCrudTournament: permissions.has(EPermission.TOURNAMENT_CRUD),
  };
}

export default useUserPermissions;

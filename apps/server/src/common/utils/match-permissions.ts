import { EPermission, IUser } from '@tennis-stats/types';

export function matchPermissions(permissions: EPermission[], user: IUser) {
  if (!permissions.length || !user?.permissions.length) {
    return true;
  }

  const userPermissions = user.permissions.map((permission) => permission.value);

  return userPermissions.some((permission) => permissions.includes(permission));
}

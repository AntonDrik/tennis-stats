import { EPermission } from '@tennis-stats/types';

export function matchPermissions(
  permissions: EPermission[],
  userPermissions: EPermission[]
) {
  if (!permissions.length) {
    return true;
  }

  return userPermissions.some((permission) => permissions.includes(permission));
}

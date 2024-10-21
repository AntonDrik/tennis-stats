import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IUser } from '@tennis-stats/types';
import { matchPermissions } from '../../common/utils';
import { PERMISSIONS_KEY } from '../decorators';

/**
 * Note that behind the scenes, when a guard returns false, the framework throws a ForbiddenException.
 * If you want to return a different error response, you should throw your own specific exception.
 */

@Injectable()
export default class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];
    const user = context.switchToHttp().getRequest<{ user: IUser }>().user;

    if (!user) {
      return true;
    }

    const permissions = this.reflector.getAllAndOverride(PERMISSIONS_KEY, targets) || [];

    return matchPermissions(permissions, user);
  }
}

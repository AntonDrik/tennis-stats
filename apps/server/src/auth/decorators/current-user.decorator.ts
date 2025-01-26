import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '@tennis-stats/types';

export default createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user: IUser }>();

  return request.user;
});

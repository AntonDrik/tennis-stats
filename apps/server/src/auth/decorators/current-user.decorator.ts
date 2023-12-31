import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@tennis-stats/entities'
import { IUser } from '@tennis-stats/types'
import { plainToInstance } from 'class-transformer'


export default createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<{ user: IUser }>()
        return plainToInstance(User, request.user)
    }
)

import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'


@Injectable()
class LoggedInGuard extends AuthGuard('jwt') {
    
    constructor(private reflector: Reflector) {
        super()
    }
    
    canActivate(context: ExecutionContext) {
        const targets = [context.getHandler(), context.getClass()]
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, targets)
        if (isPublic) {
            return true
        }
        
        return super.canActivate(context)
    }
}

export default LoggedInGuard
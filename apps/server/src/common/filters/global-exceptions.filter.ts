import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { LoggerService } from '../utils'


@Catch()
export default class GlobalExceptionsFilter implements ExceptionFilter {
    
    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly loggerService: LoggerService
    ) {}
    
    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost
        const ctx = host.switchToHttp()
        
        if (process.env.NODE_ENV === 'production') {
            this.loggerService.error(JSON.stringify(exception))
        }
        
        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR
        
        
        httpAdapter.reply(
            ctx.getResponse(),
            {
                statusCode: httpStatus,
                // @ts-ignore
                message: exception['response']
            },
            httpStatus
        )
    }
    
}
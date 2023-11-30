import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import LoggerService from './common/utils/logger.service'
import { IEnvVariables } from './config/env'


const logger = new LoggerService('Nest')

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger,
        abortOnError: true,
        cors: {
            origin: true,
            credentials: true
        }
    })
    
    const reflector = app.get(Reflector)
    const configService = app.get(ConfigService) as ConfigService<IEnvVariables>
    
    app.setGlobalPrefix('api')
    app.use(cookieParser())
    
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
    
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true })
    )
    
    const port = configService.get('PORT')
    await app.listen(port)
    
    logger.app(`Application is running on: http://localhost:${port}`)
}

bootstrap().catch((err) => {
    logger.error(`Bootstrap error: ${err}`)
})

process.on('uncaughtException', function (error) {
    logger.error(`Uncaught exception: ${error.message}`)
})

process.on('warning', e => console.warn(e.stack))
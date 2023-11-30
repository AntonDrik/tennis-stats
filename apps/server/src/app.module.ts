import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { EnvConfigModule } from './config/env'
import { TestModule } from './core/test'


@Module({
    imports: [
        EnvConfigModule,
        TestModule,
        
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'front'),
            exclude: ['/api/(.*)']
        })
    ]
})
export class AppModule {}

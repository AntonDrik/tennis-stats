import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import path  from 'path'
import { EnvConfigModule } from '../config/env'


@Module({
    imports: [
        EnvConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: () => {
                return {
                    type: 'sqlite',
                    database: `${path.resolve()}/apps/server/src/assets/DB.sqlite`,
                    autoLoadEntities: true,
                    logging: false,
                    timezone: 'Z',
                    retryAttempts: 1,
                    synchronize: process.env.NODE_ENV === 'development'
                }
            }
        })
    ]
})
export default class SqliteProviderModule {}

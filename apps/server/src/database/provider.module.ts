import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
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
                    database: `${join(__dirname)}/assets/DB.sqlite`,
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

import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EnvConfigModule, IEnvVariables } from '../config/env'


@Module({
    imports: [
        EnvConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService<IEnvVariables>) => {
                return {
                    type: 'mariadb',
                    url: configService.get('DB_URL'),
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

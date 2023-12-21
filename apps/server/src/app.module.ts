import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { SeederModule, SqliteProviderModule } from './database'
import { EnvConfigModule } from './config/env'
import { MatchOrderModule } from './core/match-order'
import { StatisticsModule } from './core/statistics'
import { GameSetModule } from './core/game-set'
import { PlayersModule } from './core/players'
import { UsersModule } from './core/users'
import { MatchModule } from './core/match'
import { TourModule } from './core/tours'
import { AuthModule } from './core/auth'


@Module({
    imports: [
        EnvConfigModule,
        SqliteProviderModule,
        SeederModule,
        UsersModule,
        TourModule,
        GameSetModule,
        PlayersModule,
        MatchModule,
        MatchOrderModule,
        AuthModule,
        StatisticsModule,
        
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'front'),
            exclude: ['/api/(.*)'],
        }),
    ],
})
export class AppModule {}

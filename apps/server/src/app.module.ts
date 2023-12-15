import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { SeederModule, SqliteProviderModule } from './database'
import { EnvConfigModule } from './config/env'
import { GameSetModule } from './core/game-set'
import { MatchModule } from './core/match'
import { MatchOrderModule } from './core/match-order'
import { PlayersModule } from './core/players'
import { UsersModule } from './core/users'
import { TourModule } from './core/tours'


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
        
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'front'),
            exclude: ['/api/(.*)'],
        }),
    ],
})
export class AppModule {}

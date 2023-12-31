import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

import { SeederModule, SqliteProviderModule } from './database'
import { EnvConfigModule } from './config/env'
import { MatchOrderModule } from './core/match-order'
import { StatisticsModule } from './core/statistics'
import { RatingHistoryModule } from './core/rating-history'
import { PlayersModule } from './core/players'
import { UsersModule } from './core/users'
import { MatchModule } from './core/tours/modules/match'
import { TourModule } from './core/tours'
import { AuthModule } from './auth'


@Module({
    imports: [
        EnvConfigModule,
        SqliteProviderModule,
        SeederModule,
        UsersModule,
        TourModule,
        MatchModule,
        PlayersModule,
        MatchOrderModule,
        AuthModule,
        StatisticsModule,
        RatingHistoryModule,
        
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'front'),
            exclude: ['/api/(.*)'],
        }),
    ],
})
export class AppModule {}

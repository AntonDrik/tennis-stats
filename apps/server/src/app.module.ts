import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { SeederModule, SqliteProviderModule } from './database'
import { EnvConfigModule } from './config/env'
import { SequenceGeneratorModule } from './core/sequence-generator'
import { GameSetsModule } from './core/game-sets'
import { MatchesModule } from './core/matches'
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
        GameSetsModule,
        PlayersModule,
        MatchesModule,
        SequenceGeneratorModule,
        
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'front'),
            exclude: ['/api/(.*)'],
        }),
    ],
})
export class AppModule {}

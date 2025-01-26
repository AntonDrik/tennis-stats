import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { TournamentsModule } from './core/tournaments';
import { SeederModule, SqliteProviderModule } from './database';
import { EnvConfigModule } from './config/env';
import { UsersModule } from './core/users';
import { MatchModule } from './core/match';
import { AuthModule } from './auth';
import { SeasonsModule } from './core/seasons';
import { ProfileModule } from './core/users/modules/profile';

@Module({
  imports: [
    EnvConfigModule,
    SqliteProviderModule,
    SeederModule,
    UsersModule,
    ProfileModule,
    TournamentsModule,
    MatchModule,
    AuthModule,
    SeasonsModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front'),
      exclude: ['/api/(.*)'],
    }),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Match } from '@tennis-stats/entities'
import { GameSetsModule } from '../game-sets'
import { UsersModule } from '../users'
import MatchesRepository from './matches.repository'
import MatchesService from './matches.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([Match]),
        UsersModule,
        GameSetsModule
    ],
    controllers: [],
    providers: [MatchesService, MatchesRepository],
    exports: [MatchesService, MatchesRepository]
})
class MatchesModule {}

export default MatchesModule
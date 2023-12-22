import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameSet, Match } from '@tennis-stats/entities'
import { RatingModule } from '../rating'
import { UsersModule } from '../users'
import { GameSetRepository, GameSetService } from './game-set'
import MatchController from './match.controller'
import MatchRepository from './match.repository'
import MatchService from './match.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([Match, GameSet]),
        UsersModule,
        RatingModule,
    ],
    controllers: [MatchController],
    providers: [
        MatchService,
        GameSetService,
        MatchRepository,
        GameSetRepository
    ],
    exports: [MatchService, GameSetService, MatchRepository]
})
class MatchModule {}

export default MatchModule
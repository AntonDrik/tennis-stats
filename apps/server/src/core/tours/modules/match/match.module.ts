import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameSet, Match } from '@tennis-stats/entities'
import { UsersModule } from '../../../users'
import MatchController from './match.controller'
import MatchRepository from './match.repository'
import MatchService from './match.service'
import { GameSetRepository, GameSetService } from './modules/game-set'



@Module({
    imports: [
        TypeOrmModule.forFeature([Match, GameSet]),
        UsersModule
    ],
    controllers: [MatchController],
    providers: [
        MatchService,
        GameSetService,
        MatchRepository,
        GameSetRepository
    ],
    exports: [
        MatchService,
        GameSetService,
        MatchRepository,
        GameSetRepository
    ]
})
class MatchModule {}

export default MatchModule
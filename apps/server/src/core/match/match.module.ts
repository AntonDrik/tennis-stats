import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Match } from '@tennis-stats/entities'
import { GameSetModule } from '../game-set'
import { UsersModule } from '../users'
import MatchRepository from './match.repository'
import MatchService from './match.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([Match]),
        UsersModule,
        GameSetModule
    ],
    controllers: [],
    providers: [MatchService, MatchRepository],
    exports: [MatchService, MatchRepository]
})
class MatchModule {}

export default MatchModule
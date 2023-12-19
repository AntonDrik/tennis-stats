import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameSet } from '@tennis-stats/entities'
import { UsersModule } from '../users'
import GameSetController from './game-set.controller'
import GameSetRepository from './game-set.repository'
import GameSetService from './game-set.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([GameSet]),
        UsersModule
    ],
    controllers: [GameSetController],
    providers: [GameSetService, GameSetRepository],
    exports: [GameSetService, GameSetRepository]
})
export default class GameSetModule {}

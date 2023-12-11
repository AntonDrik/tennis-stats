import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameSet } from '@tennis-stats/entities'
import { UsersModule } from '../users'
import GameSetsController from './game-sets.controller'
import GameSetsRepository from './game-sets.repository'
import GameSetsService from './game-sets.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([GameSet]),
        UsersModule
    ],
    controllers: [GameSetsController],
    providers: [GameSetsService, GameSetsRepository],
    exports: [GameSetsService, GameSetsRepository]
})
export default class GameSetsModule {}

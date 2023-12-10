import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameSet } from '@tennis-stats/entities'
import { UsersModule } from '../users'
import GameSetsService from './game-sets.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([GameSet]),
        UsersModule
    ],
    controllers: [],
    providers: [GameSetsService],
    exports: [GameSetsService]
})
export default class GameSetsModule {}

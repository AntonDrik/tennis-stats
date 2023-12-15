import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tour } from '@tennis-stats/entities'
import { GameSetModule } from '../game-set'
import { MatchModule } from '../match'
import { MatchOrderModule } from '../match-order'
import ToursRepository from './tours.repository'
import ToursService from './tours.service'
import ToursController from './tours.controller'


@Module({
    imports: [
        TypeOrmModule.forFeature([Tour]),
        MatchModule,
        MatchOrderModule,
        GameSetModule
    ],
    controllers: [ToursController],
    providers: [ToursService, ToursRepository],
})
class ToursModule {}

export default ToursModule
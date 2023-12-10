import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tour } from '@tennis-stats/entities'
import { GameSetsModule } from '../game-sets'
import ToursRepository from './tours.repository'
import ToursService from './tours.service'
import ToursController from './tours.controller'


@Module({
    imports: [
        TypeOrmModule.forFeature([Tour]),
        GameSetsModule,
    ],
    controllers: [ToursController],
    providers: [ToursService, ToursRepository],
})
export default class ToursModule {}

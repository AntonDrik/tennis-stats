import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tour } from '@tennis-stats/entities'
import { MatchesModule } from '../matches'
import ToursRepository from './tours.repository'
import ToursService from './tours.service'
import ToursController from './tours.controller'


@Module({
    imports: [
        TypeOrmModule.forFeature([Tour]),
        MatchesModule
    ],
    controllers: [ToursController],
    providers: [ToursService, ToursRepository],
})
class ToursModule {}

export default ToursModule
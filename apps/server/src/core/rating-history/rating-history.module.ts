import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm'
import { RatingHistory } from '@tennis-stats/entities'
import RatingHistoryController from './rating-history.controller'
import RatingHistoryRepository from './rating-history.repository'
import RatingHistoryService from './rating-history.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([RatingHistory])
    ],
    controllers: [RatingHistoryController],
    providers: [RatingHistoryService, RatingHistoryRepository],
    exports: [RatingHistoryService]
})
class RatingHistoryModule {}

export default RatingHistoryModule
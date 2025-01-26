import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingHistory } from '@tennis-stats/entities';
import { RatingHistoryRepository } from '../../repositories';
import RatingHistoryController from './controllers/rating-history.controller';
import RatingHistoryService from './services/rating-history.service';
import RatingService from './services/rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingHistory])],
  controllers: [RatingHistoryController],
  providers: [RatingService, RatingHistoryService, RatingHistoryRepository],
  exports: [RatingService, RatingHistoryService],
})
class RatingModule {}

export default RatingModule;

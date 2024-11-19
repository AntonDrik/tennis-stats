import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingHistory } from '@tennis-stats/entities';
import RatingController from './controllers/rating.controller';
import RatingHistoryRepository from './repositories/rating-history.repository';
import RatingHistoryService from './services/history.service';
import RatingService from './services/rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingHistory])],
  controllers: [RatingController],
  providers: [RatingService, RatingHistoryService, RatingHistoryRepository],
  exports: [RatingService, RatingHistoryService],
})
class RatingModule {}

export default RatingModule;

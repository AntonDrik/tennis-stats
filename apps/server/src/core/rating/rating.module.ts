import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingHistory } from '@tennis-stats/entities';
import RatingHistoryController from './controllers/history.controller';
import RatingHistoryRepository from './repositories/history.repository';
import RatingHistoryService from './services/history.service';
import RatingService from './services/rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([RatingHistory])],
  controllers: [RatingHistoryController],
  providers: [RatingService, RatingHistoryService, RatingHistoryRepository],
  exports: [RatingService, RatingHistoryService, RatingHistoryRepository],
})
class RatingModule {}

export default RatingModule;

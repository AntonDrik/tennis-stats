import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from '@tennis-stats/entities';
import { MatchModule } from '../match';
import ToursRepository from './repository/tours.repository';
import ToursService from './services/tours.service';
import ToursController from './controllers/tours.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tour]), MatchModule],
  controllers: [ToursController],
  providers: [ToursService, ToursRepository],
  exports: [ToursRepository],
})
class ToursModule {}

export default ToursModule;

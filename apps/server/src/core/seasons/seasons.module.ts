import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from '@tennis-stats/entities';
import { SeasonsRepository, TournamentsRepository } from '../../repositories';
import SeasonsController from './controllers/seasons.controller';
import SeasonsService from './services/seasons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Season])],
  controllers: [SeasonsController],
  providers: [SeasonsService, SeasonsRepository, TournamentsRepository],
  exports: [SeasonsService],
})
class SeasonsModule {}

export default SeasonsModule;

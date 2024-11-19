import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tour } from '@tennis-stats/entities';
import { MatchModule } from '../match';
import { PairsGeneratorModule } from '../pairs-generator';
import { UsersModule } from '../users';
import ToursRepository from './repository/tours.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tour]),
    MatchModule,
    UsersModule,
    PairsGeneratorModule,
  ],
  controllers: [],
  providers: [ToursRepository],
  exports: [ToursRepository],
})
class ToursModule {}

export default ToursModule;

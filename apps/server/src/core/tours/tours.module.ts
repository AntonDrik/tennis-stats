import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tour } from '@tennis-stats/entities'
import { ToursService } from './tours.service'
import { ToursController } from './tours.controller'


@Module({
    imports: [TypeOrmModule.forFeature([Tour])],
    controllers: [ToursController],
    providers: [ToursService],
})
export default class ToursModule {}

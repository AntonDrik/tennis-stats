import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MatchOrder } from '@tennis-stats/entities'
import { UsersModule } from '../users'
import MatchOrderController from './match-order.controller'
import MatchOrderRepository from './match-order.repository'
import MatchOrderService from './match-order.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([MatchOrder]),
        UsersModule
    ],
    controllers: [MatchOrderController],
    providers: [MatchOrderService, MatchOrderRepository],
    exports: [MatchOrderService]
})
class MatchOrderModule {}

export default MatchOrderModule
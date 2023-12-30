import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@tennis-stats/entities'
import { RatingHistoryModule } from '../rating-history'
import UsersRepository from './users.repository'
import UsersController from './users.controller'
import UsersService from './users.service'


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        RatingHistoryModule
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService, UsersRepository]
})
class UsersModule {}

export default UsersModule

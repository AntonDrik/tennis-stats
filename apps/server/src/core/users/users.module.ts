import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@tennis-stats/entities'
import UsersRepository from './users.repository'
import UsersController from './users.controller'
import UsersService from './users.service'


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersRepository]
})
export default class UsersModule {}

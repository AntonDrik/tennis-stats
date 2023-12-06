import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@tennis-stats/entities'
import UsersController from './users.controller'
import UsersService from './users.service'


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: []
})
export default class UsersModule {}

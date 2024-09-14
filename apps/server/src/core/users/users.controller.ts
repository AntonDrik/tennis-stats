import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateUserDto } from '@tennis-stats/dto'
import { EPermission, IUser } from '@tennis-stats/types'
import { CurrentUser, Permissions } from '../../auth/decorators'
import { IdParam } from '../../common/decorators'
import UsersRepository from './users.repository'

import UsersService from './users.service'


@Controller('users')
class UsersController {
    
    constructor(
        private usersService: UsersService,
        private usersRepository: UsersRepository
    ) {}
    
    @Get()
    getAll() {
        return this.usersService.getAll()
    }
    
    @Get('/me')
    getMe(@CurrentUser() me: IUser) {
        return me
    }
    
    @Get('/:id')
    getUser(@IdParam() id: number) {
        return this.usersRepository.findById(id)
    }
    
    @Post()
    @Permissions([EPermission.CREATE_USER])
    create(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto)
    }
}

export default UsersController
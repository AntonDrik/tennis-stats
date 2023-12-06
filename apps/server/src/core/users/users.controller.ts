import { Controller, Get } from '@nestjs/common'

import UsersService from './users.service'


@Controller('users')
class UsersController {
    
    constructor(
        private usersService: UsersService
    ) {}
    
    @Get()
    getAll() {
        return this.usersService.getAll()
    }
}

export default UsersController
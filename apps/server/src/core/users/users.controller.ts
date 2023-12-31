import { Controller, Get } from '@nestjs/common'
import { IUser } from '@tennis-stats/types'
import { CurrentUser } from '../../auth/decorators'

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
    
    @Get('/me')
    getMe(@CurrentUser() me: IUser) {
        return me
    }
}

export default UsersController
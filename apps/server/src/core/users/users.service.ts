import { InjectRepository } from '@nestjs/typeorm'
import { User } from '@tennis-stats/entities'
import { Repository } from 'typeorm'


class UsersService {
    
    constructor(
        @InjectRepository(User)
        public repository: Repository<User>
    ) {}
    
    public getAll() {
        return this.repository.find()
    }
    
}

export default UsersService
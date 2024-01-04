import { Injectable } from '@nestjs/common'
import { UserNotFoundException } from '../../../common/exceptions'
import UsersRepository from '../users.repository'


@Injectable()
class ProfileService {
    
    constructor(private usersRepository: UsersRepository) {}
    
    public async getUserInfo(userId: number) {
        const user = await this.usersRepository.findOneBy({ id: userId })
        
        if (!user) {
            throw new UserNotFoundException()
        }
    }
    
}

export default ProfileService
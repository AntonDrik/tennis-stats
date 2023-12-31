import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User, UserAuth } from '@tennis-stats/entities'
import { Repository } from 'typeorm'
import { ISeedUser, users } from './data'


@Injectable()
export class UserSeederService {
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    
    public create(): Array<Promise<User | null>> {
        return users.map(async (user) =>
            this.userRepository
                .findOneBy({ lastName: user.lastName })
                .then(async (dbUser) => {
                    if (dbUser) {
                        return Promise.resolve(null)
                    }
                    
                    const userForSave = await this.getEntity(user)
                    const saveResult = await this.userRepository.save(userForSave)
                    
                    return Promise.resolve(saveResult)
                })
                .catch((error) => Promise.reject(error))
        )
    }
    
    private async getEntity(seedUser: ISeedUser) {
        const auth = new UserAuth()
        auth.login = seedUser.auth.login
        auth.password = seedUser.auth.password
        auth.refreshToken = seedUser.auth.refreshToken
        
        const user = new User()
        user.firstName = seedUser.firstName
        user.lastName = seedUser.lastName
        user.auth = auth
        
        return user
    }
}

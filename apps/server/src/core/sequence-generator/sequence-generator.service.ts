import { Injectable } from '@nestjs/common'
import { shuffleArray, uniqueCombinations } from '@tennis-stats/helpers'
import { UsersNotFoundException } from '../../common/exceptions'
import { UsersRepository } from '../users'


@Injectable()
class SequenceGeneratorService {
    
    constructor(
        private usersRepository: UsersRepository
    ) {
    }
    
    public async generate() {
        const allUsers = await this.usersRepository.find()
        
        if (!allUsers.length) {
            throw new UsersNotFoundException()
        }
        
        const usersIds = allUsers.map((user) => user.id)
        const allCombinationsIds = uniqueCombinations(usersIds)
        
        const sorted = shuffleArray(allCombinationsIds)
        
        console.log('Комбинации: ', allCombinationsIds)
        console.log('Сортированный: ', sorted)
        
        
        const promises = sorted.map((usersIds) => {
            return this.usersRepository.getUsersByIds(usersIds)
        })
        
        return Promise.all(promises)
    }
    
}

export default SequenceGeneratorService
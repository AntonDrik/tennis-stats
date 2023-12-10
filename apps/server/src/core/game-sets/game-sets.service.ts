import { Injectable } from '@nestjs/common'
import { CreateTourDto } from '@tennis-stats/dto'
import { GameSet } from '@tennis-stats/entities'
import { uniqueCombinations } from '@tennis-stats/helpers'
import { UserNotFoundException } from '../../common/exceptions'
import { UsersRepository } from '../users'


@Injectable()
class GameSetsService {
    
    constructor(
        private usersRepository: UsersRepository
    ) {}
    
    public getGameSetsEntities(dto: CreateTourDto): Promise<GameSet[]> {
        const allCombinationsIds = uniqueCombinations(dto.usersIds)
        
        const multipliedCombinations = allCombinationsIds.map((combination) => {
            return Array.from({ length: dto.setsCount }, () => combination)
        }).flat()
        
        const promises = multipliedCombinations.map(async (usersIds) => {
            const player1Entity = await this.usersRepository.getPlayerEntity(usersIds[0])
            const player2Entity = await this.usersRepository.getPlayerEntity(usersIds[1])
            
            if (!player1Entity || !player2Entity) {
                throw new UserNotFoundException()
            }
            
            const gameSet = new GameSet()
            
            gameSet.player1 = player1Entity
            gameSet.player2 = player2Entity
            
            return gameSet
        })
        
        return Promise.all(promises)
    }
    
}

export default GameSetsService
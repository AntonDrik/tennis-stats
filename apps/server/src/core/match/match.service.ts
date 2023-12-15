import { Injectable } from '@nestjs/common'
import { CreateTourDto } from '@tennis-stats/dto'
import { Match } from '@tennis-stats/entities'
import { uniqueCombinations } from '@tennis-stats/helpers'
import { UserNotFoundException } from '../../common/exceptions'
import { GameSetService } from '../game-set'
import { UsersRepository } from '../users'


@Injectable()
class MatchService {
    
    constructor(
        private usersRepository: UsersRepository,
        private gameSetService: GameSetService
    ) {}
    
    public async getMatchesForTour(dto: CreateTourDto): Promise<Match[]> {
        const allCombinationsIds = uniqueCombinations(dto.usersIds)
        
        const promises = allCombinationsIds.map(async (usersIds) => {
            const player1Entity = await this.usersRepository.getPlayerEntity(usersIds[0])
            const player2Entity = await this.usersRepository.getPlayerEntity(usersIds[1])
            
            if (!player1Entity || !player2Entity) {
                throw new UserNotFoundException()
            }
            
            const gameSets = await this.gameSetService.createEntities(usersIds, dto.setsCount)
            
            const match = new Match()
            match.player1 = player1Entity
            match.player2 = player2Entity
            match.gameSets = gameSets
            
            return match
        })
        
        return Promise.all(promises)
    }
    
}


export default MatchService
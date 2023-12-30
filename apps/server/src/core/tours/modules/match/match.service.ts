import { Injectable } from '@nestjs/common'
import { CreateTourDto, FinishGameSetDto } from '@tennis-stats/dto'
import { Match } from '@tennis-stats/entities'
import { uniqueCombinations } from '@tennis-stats/helpers'
import { DataSource } from 'typeorm'
import { UserNotFoundException } from '../../../../common/exceptions'
import { UsersRepository, UsersService } from '../../../users'
import MatchRepository from './match.repository'
import { GameSetService } from './modules/game-set'


@Injectable()
class MatchService {
    
    constructor(
        private dataSource: DataSource,
        
        private repository: MatchRepository,
        private usersRepository: UsersRepository,
        
        private usersService: UsersService,
        private gameSetService: GameSetService
    ) {}
    
    public async getMatchesForTour(dto: CreateTourDto): Promise<Match[]> {
        const allCombinationsIds = uniqueCombinations(dto.usersIds)

        const promises = allCombinationsIds.map(async (usersIds) => {
            const user1Entity = await this.usersRepository.findOneBy({id: usersIds[0]})
            const user2Entity = await this.usersRepository.findOneBy({id: usersIds[1]})

            if (!user1Entity || !user2Entity) {
                throw new UserNotFoundException()
            }

            const gameSets = await this.gameSetService.createEntities(usersIds, dto.setsCount)

            const match = new Match()
            match.user1 = user1Entity
            match.user2 = user2Entity
            match.gameSets = gameSets

            return match
        })
        
        return Promise.all(promises)
    }
    
    public async finishGameSet(matchId: number, gameSetId: number, dto: FinishGameSetDto) {
        await this.dataSource.transaction(async (manager) => {
            const gameSet = await this.gameSetService.finishGameSet(gameSetId, dto, manager)
            
            if (gameSet.isLastInMatch) {
                const match = await this.repository.findOneBy({ id: matchId })
                
                await this.usersService.updateRating(match, manager)
            }
        })
    }
    
}


export default MatchService
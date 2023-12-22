import { Injectable } from '@nestjs/common'
import { CreateTourDto, FinishGameSetDto } from '@tennis-stats/dto'
import { Match } from '@tennis-stats/entities'
import { uniqueCombinations } from '@tennis-stats/helpers'
import { GameSetNotFoundException, MatchNotFoundException, UserNotFoundException } from '../../common/exceptions'
import { RatingService } from '../rating'
import { GameSetRepository, GameSetService } from './game-set'
import { UsersRepository } from '../users'
import MatchRepository from './match.repository'


@Injectable()
class MatchService {
    
    constructor(
        private matchRepository: MatchRepository,
        private usersRepository: UsersRepository,
        private gameSetRepository: GameSetRepository,
        private gameSetService: GameSetService,
        private ratingService: RatingService
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
    
    public async finishGameSetOrMatch(matchId: number, setId: number, dto: FinishGameSetDto) {
        const gameSet = await this.gameSetRepository.findOneBy({ id: setId })
        
        if (!gameSet) {
            throw new GameSetNotFoundException()
        }
        
        await this.gameSetService.finishGameSet(gameSet, dto)
    
        
        const match = await this.matchRepository.findOneBy({ id: matchId })
        
        if (!match) {
            throw new MatchNotFoundException()
        }
        
        if (gameSet.isLastInMatch) {
            await this.ratingService.updateRating(match)
        }
    }
    
}


export default MatchService
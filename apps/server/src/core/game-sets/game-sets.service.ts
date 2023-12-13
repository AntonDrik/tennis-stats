import { Injectable } from '@nestjs/common'
import { IdDto } from '@tennis-stats/dto'
import { GameSet, Tour } from '@tennis-stats/entities'
import { EGameSetStatus } from '@tennis-stats/types'
import { GameSetNotFoundException, UserNotFoundException } from '../../common/exceptions'
import { UsersRepository } from '../users'
import GameSetsRepository from './game-sets.repository'


@Injectable()
class GameSetsService {
    
    constructor(
        private repository: GameSetsRepository,
        private usersRepository: UsersRepository
    ) {}
    
    public getGameSetsEntities(usersIds: number[], setsCount: number): Promise<GameSet[]> {
        
        const promises = Array.from({ length: setsCount }, async () => {
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
    
    public async startGameSet(dto: IdDto): Promise<GameSet> {
        const gameSet = await this.repository.findOneBy({ id: dto.id })
        
        if (!gameSet) {
            throw new GameSetNotFoundException()
        }
        
        gameSet.status = EGameSetStatus.IN_PROCESS
        gameSet.startDate = new Date()
        await gameSet.save()
        
        return gameSet
    }
    
    public async finishGameSet(dto: IdDto) {
        const gameSet = await this.repository.findOneBy({ id: dto.id })
        
        if (!gameSet) {
            throw new GameSetNotFoundException()
        }
        
        gameSet.status = EGameSetStatus.FINISHED
    }
    
}

export default GameSetsService
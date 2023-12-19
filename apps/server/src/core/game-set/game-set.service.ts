import { Injectable } from '@nestjs/common'
import { FinishGameSetDto, GameSetScoreDto, IdDto } from '@tennis-stats/dto'
import { GameSet, Player } from '@tennis-stats/entities'
import { EGameSetStatus } from '@tennis-stats/types'
import { DataSource } from 'typeorm'
import { GameSetFinishedException, GameSetNotFoundException, UserNotFoundException } from '../../common/exceptions'
import { UsersRepository } from '../users'
import GameSetRepository from './game-set.repository'


@Injectable()
class GameSetService {
    
    constructor(
        private repository: GameSetRepository,
        private usersRepository: UsersRepository,
        private dataSource: DataSource,
    ) {}
    
    public async getGameSet(id: number): Promise<GameSet> {
        const gameSet = await this.repository.findOneBy({ id })
        
        if (!gameSet) {
            throw new GameSetNotFoundException()
        }
        
        return gameSet
    }
    
    public createEntities(usersIds: number[], setsCount: number): Promise<GameSet[]> {
        const promises = Array.from({ length: setsCount }, async (_, i) => {
            const player1Entity = await this.usersRepository.getPlayerEntity(usersIds[0])
            const player2Entity = await this.usersRepository.getPlayerEntity(usersIds[1])
            
            if (!player1Entity || !player2Entity) {
                throw new UserNotFoundException()
            }
            
            return this.repository.createEntity(i + 1, player1Entity, player2Entity)
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
    
    public async finishGameSet(dto: FinishGameSetDto) {
        const gameSet = await this.repository.findOneBy({ id: dto.id })
        
        if (!gameSet) {
            throw new GameSetNotFoundException()
        }
        
        await this.dataSource.transaction(async (manager) => {
            await manager.update(GameSet, { id: dto.id }, {
                status: dto.status
            })
            
            await manager.update(Player, { id: gameSet.player1.id }, {
                score: dto.player1Score,
                isWinner: dto.player1Score > dto.player2Score
            })
            
            await manager.update(Player, { id: gameSet.player2.id }, {
                score: dto.player2Score,
                isWinner: dto.player2Score > dto.player1Score
            })
            
            await manager.update(GameSet, { id: dto.id + 1 }, {
                status: EGameSetStatus.READY_TO_START
            })
        })
    }
    
    public async updateScore(dto: GameSetScoreDto): Promise<GameSet> {
        const gameSet = await this.getGameSet(dto.id)
        
        if (gameSet.isFinished) {
            throw new GameSetFinishedException()
        }
        
        gameSet.player1.score = dto.player1Score
        gameSet.player2.score = dto.player2Score
        
        await gameSet.save()
        
        return gameSet
    }
    
}

export default GameSetService
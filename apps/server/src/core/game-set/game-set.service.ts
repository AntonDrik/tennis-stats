import { Injectable } from '@nestjs/common'
import { FinishGameSetDto, IdDto } from '@tennis-stats/dto'
import { GameSet } from '@tennis-stats/entities'
import { EGameSetStatus } from '@tennis-stats/types'
import { DataSource } from 'typeorm'
import { GameSetNotFoundException, UserNotFoundException } from '../../common/exceptions'
import { UsersRepository } from '../users'
import GameSetRepository from './game-set.repository'


@Injectable()
class GameSetService {
    
    constructor(
        private repository: GameSetRepository,
        private usersRepository: UsersRepository,
        private dataSource: DataSource,
    ) {}
    
    public createEntities(usersIds: number[], setsCount: number): Promise<GameSet[]> {
        const promises = Array.from({ length: setsCount }, async () => {
            const player1Entity = await this.usersRepository.getPlayerEntity(usersIds[0])
            const player2Entity = await this.usersRepository.getPlayerEntity(usersIds[1])
            
            if (!player1Entity || !player2Entity) {
                throw new UserNotFoundException()
            }
            
            return this.repository.createEntity(player1Entity, player2Entity)
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
        await this.dataSource.transaction(async (manager) => {
            await manager.update(GameSet, { id: dto.id }, {
                status: dto.status
            })
            
            await manager.update(GameSet, { id: dto.id + 1 }, {
                status: EGameSetStatus.READY_TO_START
            })
        })
    }
    
}

export default GameSetService
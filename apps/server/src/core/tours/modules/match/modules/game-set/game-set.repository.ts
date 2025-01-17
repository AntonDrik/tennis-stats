import { Injectable } from '@nestjs/common'
import { GameSet, Player } from '@tennis-stats/entities'
import { EGameSetStatus } from '@tennis-stats/types'
import { DataSource, In, Not } from 'typeorm'
import { GameSetNotFoundException } from '../../../../../../common/exceptions'
import BaseRepository from '../../../../../../common/utils/base.repository'
import { IFindManyByIdOptions } from './interfaces/repository.interfaces'


@Injectable()
class GameSetRepository extends BaseRepository<GameSet> {
    
    constructor(dataSource: DataSource) {
        super(GameSet, dataSource)
    }
    
    public async findById(id: number): Promise<GameSet> {
        const gameSet = await this.findOneBy({ id })
        
        if (!gameSet) {
            throw new GameSetNotFoundException()
        }
        
        return gameSet
    }
    
    public findManyByUserId(userId: number, options?: IFindManyByIdOptions) {
        return this.findBy([
            {
                player1: {
                    user: { id: userId }
                },
                ...(options?.onlyFinished ? { status: EGameSetStatus.FINISHED } : {}),
                ...(options?.date ? {
                    match: {
                        tour: { date: options.date }
                    }
                } : {})
            },
            {
                player2: {
                    user: { id: userId }
                },
                ...(options?.onlyFinished ? { status: EGameSetStatus.FINISHED } : {}),
                ...(options?.date ? {
                    match: {
                        tour: { date: options.date }
                    }
                } : {})
            }
        ])
    }
    
    public getAllUnfinished(tourId: number): Promise<GameSet[]> {
        return this.findBy({
            status: Not(In([EGameSetStatus.CANCELED, EGameSetStatus.FINISHED])),
            match: {
                tour: { id: tourId }
            }
        })
    }
    
    public createEntity(player1: Player, player2: Player, number: number, isLast: boolean): GameSet {
        const gameSet = new GameSet()
        
        gameSet.player1 = player1
        gameSet.player2 = player2
        gameSet.number = number
        gameSet.isLastInMatch = isLast
        
        return gameSet
    }
    
}

export default GameSetRepository
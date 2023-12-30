import { Injectable } from '@nestjs/common'
import { Match, User } from '@tennis-stats/entities'
import { getDelta } from '@tennis-stats/helpers'
import { DataSource, EntityManager } from 'typeorm'
import { MatchNotFoundException } from '../../common/exceptions'
import { RatingHistoryService } from '../rating-history'
import UsersRepository from './users.repository'


@Injectable()
class UsersService {
    
    constructor(
        private dataSource: DataSource,
        private ratingHistoryService: RatingHistoryService,
        private repository: UsersRepository,
    ) {}
    
    public getAll(): Promise<User[]> {
        return this.repository.find()
    }
    
    public async updateRating(match: Match | null, transactionManager?: EntityManager) {
        if (!match) {
            throw new MatchNotFoundException()
        }
        
        const players = match.getWinnerLooser()
        
        if (!players) {
            return
        }
        
        const { winner, looser } = players
        
        const delta = getDelta(winner.rating, looser.rating, match.totalScore)
        const winnerNewRating = winner.rating + delta
        const looserNewRating = looser.rating - (delta / 2)
    
        await this.repository.withTransaction(async (manager) => {
            await manager.update(User, { id: winner.id }, {
                rating: winnerNewRating
            })
    
            await manager.update(User, { id: looser.id }, {
                rating: looserNewRating
            })
            
            const allUsers = await manager.find(User)
            await this.ratingHistoryService.makeSnapshot(allUsers, manager)
        }, transactionManager)
    }
    
}

export default UsersService
import { Injectable } from '@nestjs/common'
import { Match, Tour, User } from '@tennis-stats/entities'
import { getRatingDelta } from '@tennis-stats/helpers'
import { DataSource, EntityManager } from 'typeorm'
import { MatchNotFoundException, TourNotFoundException } from '../../common/exceptions'
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
    
    public async updateRating(tour: Tour | null, match: Match | null, transactionManager?: EntityManager) {
        if (!tour) {
            throw new TourNotFoundException()
        }
        
        if (!match) {
            throw new MatchNotFoundException()
        }
        
        const players = match.getWinnerLooser()
        
        if (!players) {
            return
        }
        
        const { winner, looser } = players
        
        const delta = getRatingDelta(winner.rating, looser.rating, tour, match.totalScore)
        
        await this.repository.withTransaction(async (manager) => {
            await manager.update(User, { id: winner.id }, {
                rating: winner.rating + delta
            })
            
            await manager.update(User, { id: looser.id }, {
                rating: looser.rating - delta
            })
            
            const allUsers = await manager.find(User)
            await this.ratingHistoryService.makeSnapshot(allUsers, match.tour.date, manager)
        }, transactionManager)
    }
    
}

export default UsersService
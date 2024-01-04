import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '@tennis-stats/dto'
import { Match, Tour, User, UserAuth } from '@tennis-stats/entities'
import { getRatingDelta } from '@tennis-stats/helpers'
import bcrypt from 'bcrypt'
import { DataSource, EntityManager } from 'typeorm'
import {
    MatchNotFoundException,
    TourNotFoundException,
    UserExistException
} from '../../common/exceptions'
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
    
    public async createUser(dto: CreateUserDto) {
        const foundUser = await this.repository.findByLogin(dto.login)
        
        if (foundUser) {
            throw new UserExistException()
        }
        
        const auth = new UserAuth()
        auth.login = dto.login
        auth.password = await bcrypt.hash(dto.password, 10)
        
        const user = new User()
        user.firstName = dto.firstName
        user.lastName = dto.lastName
        user.rating = dto.rating
        user.color = dto.color
        user.auth = auth
        
        
        await user.save()
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
import { Injectable } from '@nestjs/common/decorators'
import { Match, User } from '@tennis-stats/entities'
import { DataSource } from 'typeorm'
import { UsersRepository } from '../users'


@Injectable()
class RatingService {
    
    constructor(
        private usersRepository: UsersRepository,
        private dataSource: DataSource
    ) {}
    
    public async updateRating(match: Match) {
        const players = this.getPlayers(match)
        
        if (!players) {
            return
        }
        
        const delta = this.getDelta(players.winner.rating, players.looser.rating)
        
        await this.dataSource.transaction(async (manager) => {
            await manager.update(User, { id: players.winner.id }, {
                rating: players.winner.rating + delta
            })
            
            await manager.update(User, { id: players.looser.id }, {
                rating: players.looser.rating - (delta / 2)
            })
        })
    }
    
    private getDelta(winnerRating: number, looserRating: number): number {
        return (100 - (winnerRating - looserRating)) / 10
    }
    
    private getPlayers(match: Match) {
        if (match.sc[0] > match.sc[1]) {
            return {
                winner: match.player1.user,
                looser: match.player2.user
            }
        }
        
        if (match.sc[1] > match.sc[0]) {
            return {
                winner: match.player2.user,
                looser: match.player1.user
            }
        }
        
        return null
    }
    
}

export default RatingService
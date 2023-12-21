import { Injectable } from '@nestjs/common/decorators'
import { GetUsersTotalScoreDto } from '@tennis-stats/dto'
import { IUsersTotalScore } from '@tennis-stats/types'
import { TourRepository } from '../tours'
import { IGamesTotalScoreRawData } from './interfaces/raw-data.interfaces'
import { getTotalGamesScoreQuery } from './sql'


@Injectable()
class StatisticsService {
    
    constructor(
        private tourRepository: TourRepository
    ) {}
    
    public async getStatistics(dto: GetUsersTotalScoreDto): Promise<IUsersTotalScore[]> {
        const query = getTotalGamesScoreQuery(dto)
        const rawData = await this.tourRepository.executeQuery<IGamesTotalScoreRawData>(query)
        
        return rawData.map((item) => {
            const user1 = `${item.user1LastName} ${item.user1FirstName.substring(0, 1)}.`
            const user2 = `${item.user2LastName} ${item.user2FirstName.substring(0, 1)}.`
            
            
            return {
                user1Score: Number(item.user1Score),
                user2Score: Number(item.user2Score),
                totalGames: Number(item.gamesCount),
                usersLabel: `${user1} - ${user2}`
            }
        })
    }
    
}

export default StatisticsService
import { Injectable } from '@nestjs/common/decorators'
import { GetUsersTotalScoreQuery, GetUsersScoreDiffQuery } from '@tennis-stats/dto'
import { IUsersScoreDiff, IUsersTotalScore } from '@tennis-stats/types'

import { TourRepository } from '../tours'
import { IUsersTotalScoreRawData } from './interfaces/raw-data.interfaces'
import { getTotalGamesScoreQuery, getUsersScoreDiff } from './sql'


@Injectable()
class StatisticsService {
    
    constructor(
        private tourRepository: TourRepository
    ) {
    }
    
    public async getUsersTotalScore(dto: GetUsersTotalScoreQuery): Promise<IUsersTotalScore[]> {
        const query = getTotalGamesScoreQuery(dto)
        const rawData = await this.tourRepository.executeQuery<IUsersTotalScoreRawData>(query)
        
        return rawData.map((item) => {
            return {
                user1: {
                    id: Number(item.user1Id),
                    shortName: `${item.user1LastName} ${item.user1FirstName.substring(0, 1)}.`,
                    score: Number(item.user1Score)
                },
                user2: {
                    id: Number(item.user2Id),
                    shortName: `${item.user2LastName} ${item.user2FirstName.substring(0, 1)}.`,
                    score: Number(item.user2Score)
                },
                totalGames: Number(item.gamesCount),
                additionsCount: Number(item.additionsCount)
            }
        })
    }
    
    public getUsersScoreDiff(dto: GetUsersScoreDiffQuery): Promise<IUsersScoreDiff[]> {
        const query = getUsersScoreDiff(dto)
        
        return this.tourRepository.executeQuery<IUsersScoreDiff>(query)
    }
    
}

export default StatisticsService
import { Injectable } from '@nestjs/common/decorators'
import { GetUsersTotalScoreQuery, GetUsersScoreDiffQuery } from '@tennis-stats/dto'
import { maxInCollection, avgOfSet } from '@tennis-stats/helpers'
import { IAllGamesStats, IUsersScoreDiff, IUsersTotalScore, TScoreCaption } from '@tennis-stats/types'

import { TourRepository } from '../tours'
import { GameSetRepository } from '../tours/modules/match'
import isAdditionScore from './helpers/is-addition-score'
import { IUsersTotalScoreRawData } from './interfaces/raw-data.interfaces'
import { getTotalGamesScoreQuery, getUsersScoreDiff } from './sql'


@Injectable()
class StatisticsService {
    
    constructor(
        private tourRepository: TourRepository,
        private gameSetRepository: GameSetRepository
    ) {}
    
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
                gamesCount: Number(item.gamesCount),
                additionsCount: Number(item.additionsCount)
            }
        })
    }
    
    public getUsersScoreDiff(dto: GetUsersScoreDiffQuery): Promise<IUsersScoreDiff[]> {
        const query = getUsersScoreDiff(dto)
        
        return this.tourRepository.executeQuery<IUsersScoreDiff>(query)
    }
    
    public async getAllGamesStats(): Promise<IAllGamesStats> {
        const allGameSets = await this.gameSetRepository.find()
        
        const result: IAllGamesStats = {
            gamesCount: 0,
            additionsCount: 0,
            avgScoreDifference: 0,
            mostPopularScore: `0 | 0`
        }
        const scoreCaptionCollection = new Map<TScoreCaption, number>()
        const scoreDifferenceCollection = new Set<number>()
        
        
        allGameSets.forEach((gameSet) => {
            result.gamesCount += 1
            
            if (isAdditionScore(gameSet)) {
                result.additionsCount += 1
            }
            
            const score = gameSet.scoreCaption
            const foundScoreCaption = scoreCaptionCollection.get(score)
            
            scoreCaptionCollection.set(score, (foundScoreCaption ?? 0) + 1)
            scoreDifferenceCollection.add(Math.abs(gameSet.player1.score - gameSet.player2.score))
        })
        
        return {
            ...result,
            mostPopularScore: maxInCollection(scoreCaptionCollection)[0],
            avgScoreDifference: avgOfSet(scoreDifferenceCollection)
        }
    }
    
}

export default StatisticsService
import { IMatchScore, ITour, IUser } from '@tennis-stats/types'
import mapToArray from './map-to-array'


function getRatingDelta(winnerRating: number, looserRating: number, tour: ITour, matchScore: IMatchScore): number {
    const tourMultiplier = getTourMultiplier(tour)
    const scoreMultiplier = getScoreMultiplier(matchScore)
    
    return ((100 - (winnerRating - looserRating)) / 10) * tourMultiplier * scoreMultiplier
}


function getScoreMultiplier(matchScore: IMatchScore): number {
    
    const scoreDiff = Math.abs(matchScore.user1 - matchScore.user2)
    
    if (scoreDiff === 1) {
        return 0.8
    }
    
    if (scoreDiff === 2) {
        return 1
    }
    
    if (scoreDiff > 2) {
        return 1.2
    }
    
    return 1
}

function getTourMultiplier(tour: ITour): number {
    const tourPlayers = new Map<number, IUser>()
    
    tour.matches.forEach((item) => {
        tourPlayers.set(item.user1.id, item.user1)
        tourPlayers.set(item.user2.id, item.user2)
    })
    
    const tourAvgRating = mapToArray(tourPlayers).reduce((acc, curr) => acc + curr.rating, 0) / tourPlayers.size
    
    
    if (tourAvgRating < 250) {
        return 0.2
    }
    
    if (tourAvgRating >= 250 && tourAvgRating < 350) {
        return 0.25
    }
    
    if (tourAvgRating >= 350 && tourAvgRating < 450) {
        return 0.3
    }
    
    if (tourAvgRating >= 450 && tourAvgRating < 550) {
        return 0.35
    }
    
    if (tourAvgRating > 550) {
        return 0.4
    }
    
    return 1
}

export default getRatingDelta
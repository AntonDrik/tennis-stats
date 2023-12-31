import { IMatchScore } from '@tennis-stats/types'


function getRatingDelta(winnerRating: number, looserRating: number, matchScore: IMatchScore): number {
    const scoreMultiplier = getScoreMultiplier(matchScore)
    
    return ((100 - (winnerRating - looserRating)) / 10) * scoreMultiplier
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

export default getRatingDelta
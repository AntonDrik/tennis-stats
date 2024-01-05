import { TScoreCaption } from './player'


interface IPairStatistic {
    user1: {
        id: number
        shortName: string
        score: number
    },
    user2: {
        id: number
        shortName: string
        score: number
    }
    gamesCount: number
    additionsCount: number
}


interface ICommonStatistic {
    gamesCount: number
    additionsCount: number
    mostPopularScore: TScoreCaption
    avgScoreDifference: number
}

export {
    IPairStatistic,
    ICommonStatistic
}
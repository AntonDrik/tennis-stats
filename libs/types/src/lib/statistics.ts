interface IUsersTotalScore {
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
    totalGames: number
    additionsCount: number
}

interface IUsersScoreDiff {
    user1Id: string
    user2Id: string
    formattedDate: string,
    user1AvgScore: string,
    user2AvgScore: string
}

export {
    IUsersTotalScore,
    IUsersScoreDiff
}
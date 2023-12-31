import { GetUsersScoreDiffQuery, GetUsersTotalScoreQuery } from '@tennis-stats/dto'


const getTotalGamesScoreQuery = (dto: GetUsersTotalScoreQuery): string => {
    
    let whereCondition = ''
    
    if (dto.startDate && dto.endDate) {
        const { startDate, endDate } = dto.transformDatesToDBFormat()
        
        whereCondition = `WHERE tour.date BETWEEN '${startDate}' and '${endDate}'`
    }
    
    return `
        SELECT u1.id                                         as user1Id,
               u2.id                                         as user2Id,
               u1.firstName                                  as user1FirstName,
               u2.firstName                                  as user2FirstName,
               u1.lastName                                   as user1LastName,
               u2.lastName                                   as user2LastName,
               COUNT(IF(p1.isWinner = 1, 1, NULL))          as user1Score,
               COUNT(IF(p2.isWinner = 1, 1, NULL))          as user2Score,
               COUNT(IF(gs.status = 'FINISHED', 1, NULL))  as gamesCount,
               COUNT(IF(p1.score + p2.score > 20, 1, NULL)) as additionsCount
        FROM tour
                 LEFT JOIN \`match\` m on tour.id = m.tourId
                 LEFT JOIN game_set gs on m.id = gs.matchId
                 LEFT JOIN player p1 on gs.player1Id = p1.id
                 LEFT JOIN player p2 on gs.player2Id = p2.id
                 LEFT JOIN user u1 on p1.userId = u1.id
                 LEFT JOIN user u2 on p2.userId = u2.id
            ${whereCondition}
        GROUP BY u1.lastName, u2.lastName
    `
}

const getUsersScoreDiff = (dto: GetUsersScoreDiffQuery): string => {
    
    
    return `
        SELECT u1.id                           as user1Id,
               u2.id                           as user2Id,
               DATE_FORMAT(tour.date, '%d-%m-%Y') as formattedDate,
               AVG(p1.score - p2.score)        as user1AvgScore,
               AVG(p2.score - p1.score)        as user2AvgScore
        FROM tour
                 LEFT JOIN \`match\` m on tour.id = m.tourId
                 LEFT JOIN game_set gs on m.id = gs.matchId
                 LEFT JOIN player p1 on gs.player1Id = p1.id
                 LEFT JOIN player p2 on gs.player2Id = p2.id
                 LEFT JOIN user u1 on p1.userId = u1.id
                 LEFT JOIN user u2 on p2.userId = u2.id
        WHERE u1.id = ${dto.user1Id}
          AND u2.id = ${dto.user2Id}

        GROUP BY formattedDate
    `
}


export {
    getTotalGamesScoreQuery,
    getUsersScoreDiff
}
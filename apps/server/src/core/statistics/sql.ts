import { GetUsersTotalScoreDto } from '@tennis-stats/dto'


const getTotalGamesScoreQuery = (dto: GetUsersTotalScoreDto) => {
    
    let whereCondition = ''
    
    if (dto.startDate && dto.endDate) {
        const { startDate, endDate } = dto.transformDatesToDBFormat()
        
        whereCondition = `WHERE tour.date BETWEEN '${startDate}' and '${endDate}'`
    }
    
    return `
        SELECT u1.firstName                                 as user1FirstName,
               u2.firstName                                 as user2FirstName,
               u1.lastName                                  as user1LastName,
               u2.lastName                                  as user2LastName,
               COUNT(IIF(p1.isWinner = 1, 1, NULL))         as user1Score,
               COUNT(IIF(p2.isWinner = 1, 1, NULL))         as user2Score,
               COUNT(IIF(gs.status IS 'FINISHED', 1, NULL)) as gamesCount
        FROM tour
                 LEFT JOIN match m on tour.id = m.tourId
                 LEFT JOIN game_set gs on m.id = gs.matchId
                 LEFT JOIN player p1 on gs.player1Id = p1.id
                 LEFT JOIN player p2 on gs.player2Id = p2.id
                 LEFT JOIN user u1 on p1.userId = u1.id
                 LEFT JOIN user u2 on p2.userId = u2.id
            ${whereCondition}
        GROUP BY u1.lastName, u2.lastName
    `
}


export {
    getTotalGamesScoreQuery
}
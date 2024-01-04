const getAvgRatingByDaysQuery = () => `
    SELECT DATE_FORMAT(CONVERT_TZ(rating_history.date, '+00:00', '+03:00'), '%d-%m-%Y') as formattedDate,
           rating_history.id                            as ratingHistoryId,
           rating_history.rating                        as rating,
           u.firstName                                  as userFirstName,
           u.lastName                                   as userLastName,
           u.color                                      as userColor,
           u.id                                         as userId
    FROM rating_history
             LEFT JOIN user u on rating_history.userId = u.id
    GROUP BY formattedDate, u.id, ratingHistoryId
    ORDER BY ratingHistoryId
`

export { getAvgRatingByDaysQuery }
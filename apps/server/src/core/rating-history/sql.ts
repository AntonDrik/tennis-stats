const getAvgRatingByDaysQuery = () => `
    SELECT strftime('%d-%m-%Y', rating_history.date) as formattedDate,
           AVG(rating_history.rating)                as rating,
           u.firstName                               as userFirstName,
           u.lastName                                as userLastName,
           u.age                                     as userAge,
           u.color                                   as userColor,
           u.id                                      as userId
    FROM rating_history
             LEFT JOIN user u on rating_history.userId = u.id
    GROUP BY formattedDate, u.id
`

export { getAvgRatingByDaysQuery }
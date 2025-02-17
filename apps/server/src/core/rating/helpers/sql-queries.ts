const getUserRating = (userId: number, year: string) => {
  return `WITH ranked_messages AS (SELECT r.id,
                                          r.date,
                                          r.rating,
                                          ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(r.date, '%Y%m%d') ORDER BY r.id DESC) AS rn
                                   FROM rating_history as r
                                          LEFT JOIN \`tennis-stats\`.user u on u.id = r.userId
                                   WHERE u.id = ${userId}
                                     AND YEAR(r.date) = ${year})
          SELECT *
          FROM ranked_messages
          WHERE rn = 1;`;
};

const getMinMaxUserRating = (userId: number) => {
  return `WITH ranked_messages AS (SELECT r.rating,
                                          ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(r.date, '%Y%m%d') ORDER BY r.id DESC) AS rn
                                   FROM rating_history as r
                                          LEFT JOIN \`tennis-stats\`.user u on u.id = r.userId
                                   WHERE u.id = ${userId})
          SELECT MIN(ranked_messages.rating) as min, MAX(ranked_messages.rating) as max
          FROM ranked_messages
          WHERE rn = 1;`;
};

export { getUserRating, getMinMaxUserRating };

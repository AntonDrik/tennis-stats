const appRoutes = {
    LOGIN: '/login',
    USERS: '/users',
    TOURS_LIST: '/tours',
    TOUR_BY_ID: (id?: number) => id ? `/tours/${id}` : '/tours/:id',
    STATS: '/stats',
    MATCH_ORDER: '/match-order'
}

export {
    appRoutes
}
const appRoutes = {
  LOGIN: '/login',

  USERS: '/users',

  TOURS_LIST: '/tours',

  TOUR_BY_ID: (id?: number) => id ? `/tours/${id}` : '/tours/:id',

  GAME_PROCESS: '/game-process',

  STATS: '/stats',

  MATCH_ORDER: '/match-order',

  PROFILE: (id?: number) => id ? `/profile/${id}` : 'profile/:id'
};

export {
  appRoutes
};

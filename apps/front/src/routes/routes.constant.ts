const appRoutes = {
  LOGIN: '/login',

  USERS: '/users',

  TOURNAMENTS: '/tournaments',

  TOURNAMENT_BY_ID: (id?: number) => (id ? `/tournaments/${id}` : '/tournaments/:id'),

  TOURNAMENT_REGISTRATION: '/tournaments/registration',

  STATS: '/stats',

  PROFILE: (id?: number) => (id ? `/profile/${id}` : 'profile/:id'),

  SETTINGS: '/settings',
};

export { appRoutes };

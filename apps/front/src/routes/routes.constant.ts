const appRoutes = {
  LOGIN: '/login',

  USERS: '/users',

  TOURNAMENTS: '/tournaments',

  TOURNAMENT_BY_ID: (id?: number) => (id ? `/tournaments/${id}` : '/tournaments/:id'),

  TOURNAMENT_REGISTRATION: (id?: number) =>
    id ? `/tournaments/${id}/registration` : '/tournaments/:id/registration',

  STATS: '/stats',

  PROFILE: (id?: number) => (id ? `/profile/${id}` : 'profile/:id'),
};

export { appRoutes };

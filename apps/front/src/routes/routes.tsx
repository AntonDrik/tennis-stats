import React, { ReactElement } from 'react';
import loadable from '@loadable/component';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';

import AuthRoute from './AuthRoute';
import MainRoute from './MainRoute';
import { appRoutes } from './routes.constant';

const AuthPage = loadable(() => import('../pages/auth/AuthPage'));
const UsersPage = loadable(() => import('../pages/users/UsersPage'));
const TournamentsPage = loadable(() => import('../pages/tournaments/TournamentsPage'));
const TournamentPage = loadable(() => import('../pages/tournament/TournamentPage'));
const TournamentRegistrationPage = loadable(
  () => import('../pages/tournament-registration/TournamentRegistrationPage')
);

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'}>
      <Route index element={<Navigate to={appRoutes.TOURNAMENTS} />} />
      <Route path="*" element={<Navigate to={appRoutes.TOURNAMENTS} />} />

      <Route element={<AuthRoute />}>
        <Route path={appRoutes.LOGIN} element={<AuthPage />} />
      </Route>

      <Route element={<MainRoute />}>
        <Route path={appRoutes.USERS} element={<UsersPage />} />

        <Route path={appRoutes.TOURNAMENTS} element={<TournamentsPage />} />

        <Route
          path={appRoutes.TOURNAMENT_REGISTRATION}
          element={<TournamentRegistrationPage />}
        />

        <Route path={appRoutes.TOURNAMENT_BY_ID()} element={<TournamentPage />} />

        {/*<Route path={appRoutes.STATS} element={<StatsPage />} />*/}
        {/*<Route path={appRoutes.PROFILE()} element={<ProfilePage />} />*/}
      </Route>
    </Route>
  )
);

function AppRoutes(): ReactElement {
  return <RouterProvider router={routes} />;
}

export { AppRoutes };

export default routes;

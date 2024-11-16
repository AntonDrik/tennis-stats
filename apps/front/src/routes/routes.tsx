import React, { ReactElement } from 'react';
import loadable from '@loadable/component';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Spinner } from '../shared/components';

import { appRoutes } from './routes.constant';

const AuthRoute = loadable(() => import('./AuthRoute'));
const MainRoute = loadable(() => import('./MainRoute'));

const AuthPage = loadable(() => import('../pages/auth/AuthPage'));
const UsersPage = loadable(() => import('../pages/users/UsersPage'));
const TournamentPage = loadable(() => import('../pages/tournament/TournamentPage'));
const TournamentsPage = loadable(() => import('../pages/tournaments/TournamentsPage'));
const TournamentRegistrationPage = loadable(
  () => import('../pages/tournament-registration/TournamentRegistrationPage')
);

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path={'/'}>
      <Route index element={<Navigate to={appRoutes.TOURNAMENTS} />} />
      <Route path="*" element={<Navigate to={appRoutes.TOURNAMENTS} />} />

      <Route element={<AuthRoute fallback={<Spinner page />} />}>
        <Route path={appRoutes.LOGIN} element={<AuthPage />} />
      </Route>

      <Route element={<MainRoute fallback={<Spinner page />} />}>
        <Route
          path={appRoutes.USERS}
          element={<UsersPage fallback={<Spinner page />} />}
        />

        <Route
          path={appRoutes.TOURNAMENTS}
          element={<TournamentsPage fallback={<Spinner page />} />}
        />

        <Route
          path={appRoutes.TOURNAMENT_REGISTRATION()}
          element={<TournamentRegistrationPage fallback={<Spinner page />} />}
        />

        <Route
          path={appRoutes.TOURNAMENT_BY_ID()}
          element={<TournamentPage fallback={<Spinner page />} />}
        />

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

import React, { ReactElement } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import {
  StatsPage,
  UsersPage,
  AuthPage,
  ProfilePage,
  GameProcessPage,
  TournamentsPage,
  TournamentRegistrationPage,
} from '../pages';
import TournamentPage from '../pages/tournament/TournamentPage';
import AuthRoute from './AuthRoute';
import MainRoute from './MainRoute';
import { appRoutes } from './routes.constant';

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

        <Route path={appRoutes.STATS} element={<StatsPage />} />

        <Route path={appRoutes.TOURNAMENTS} element={<TournamentsPage />} />

        <Route
          path={appRoutes.TOURNAMENT_REGISTRATION}
          element={<TournamentRegistrationPage />}
        />

        <Route
          path={appRoutes.TOURNAMENT_BY_ID()}
          element={<TournamentPage />}
        />

        <Route path={appRoutes.GAME_PROCESS} element={<GameProcessPage />} />

        <Route path={appRoutes.PROFILE()} element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

function AppRoutes(): ReactElement {
  return <RouterProvider router={routes} />;
}

export { AppRoutes };

export default routes;

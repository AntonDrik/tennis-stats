import { Button, Flex } from '@radix-ui/themes';
import { ETournamentStatus } from '@tennis-stats/types';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetTournamentQuery } from '../../core/api';
import { useBackButton } from '../../layouts/MainLayout';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner } from '../../shared/components';
import { useUserPermissions } from '../../shared/hooks';
import useMediaQuery from '../../shared/hooks/useMediaQuery';
import RegistrationAdminMenu from './components/AdminMenu/AdminMenu';
import TournamentRegistrationHeader from './components/Header/Header';
import RegistrationTable from './components/RegistrationTable/RegistrationTable';
import useTournamentRegistrationController from './contollers/TournamentRegistration.controller';

type IRouteParams = {
  id: string;
};

function TournamentRegistrationPage() {
  const params = useParams<IRouteParams>();

  const tournament = useGetTournamentQuery(params?.id, {
    queryHash: 'tournament-registration',
    staleTime: 100,
    refetchOnWindowFocus: true,
  });

  const permissions = useUserPermissions();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');
  const controller = useTournamentRegistrationController(tournament.data);

  useBackButton({
    title: 'К списку Турниров',
    link: appRoutes.TOURNAMENTS,
  });

  if (tournament.isLoading) {
    return <Spinner />;
  }

  if (tournament.data?.status !== ETournamentStatus.REGISTRATION) {
    return <Navigate to={appRoutes.TOURNAMENTS} />;
  }

  return (
    <Page title={'Регистрация на турнир'}>
      <Flex direction={'column'} gap={'4'}>
        <TournamentRegistrationHeader tournament={tournament.data} />

        <Flex justify={'between'}>
          <Button
            variant={'solid'}
            size={isMobileDevice ? '2' : '3'}
            color={!controller.isMeRegistered ? 'green' : 'red'}
            onClick={controller.toggleTournament}
          >
            {!controller.isMeRegistered ? 'Зарегистрироваться' : 'Отменить регистрацию'}
          </Button>

          {permissions.canCrudTournament && (
            <RegistrationAdminMenu
              tournament={tournament.data}
              joinedUsers={controller.joinedList}
            />
          )}
        </Flex>

        <RegistrationTable
          tournamentId={tournament.data.id}
          isAdmin={permissions.canCrudTournament}
          usersList={controller.joinedList}
        />
      </Flex>
    </Page>
  );
}

export default TournamentRegistrationPage;

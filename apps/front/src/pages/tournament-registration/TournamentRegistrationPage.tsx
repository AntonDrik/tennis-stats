import { Button, Flex } from '@radix-ui/themes';
import { ETournamentStatus } from '@tennis-stats/types';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { Navigate, useParams } from 'react-router-dom';
import {
  useGetTournamentQuery,
  useJoinTournamentMutation,
  useLeaveTournamentMutation,
} from '../../core/api';
import { meAtom } from '../../core/store';
import { useBackButton } from '../../layouts/MainLayout';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner } from '../../shared/components';
import { useConfirmModal } from '../../shared/components/Modals';
import { useUserPermissions } from '../../shared/hooks';
import useMediaQuery from '../../shared/hooks/useMediaQuery';
import RegistrationAdminMenu from './components/AdminMenu/AdminMenu';
import TournamentRegistrationHeader from './components/Header/Header';
import RegistrationTable from './components/RegistrationTable/RegistrationTable';

type IRouteParams = {
  id: string;
};

function TournamentRegistrationPage() {
  const params = useParams<IRouteParams>();

  const me = useAtomValue(meAtom);

  const tournament = useGetTournamentQuery(params?.id, {
    queryHash: 'tournament-registration',
    staleTime: 100,
    refetchOnWindowFocus: true,
  });

  const joinTournamentMutation = useJoinTournamentMutation(tournament.data?.id);
  const leaveTournamentMutation = useLeaveTournamentMutation(tournament.data?.id);

  const permissions = useUserPermissions();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const confirmUnregister = useConfirmModal({
    title: 'Отмена регистрации',
    description: 'Вы действительно хотите отменить регистрацию на турнир?',
    confirmTitle: 'Отменить регистрацию',
    denyTitle: 'Назад',
  });

  const joinedList = useMemo(
    () => tournament.data?.registeredUsers ?? [],
    [tournament.data]
  );

  const isRegistered = useMemo(() => {
    return Boolean(joinedList.find((user) => user.id === me?.id));
  }, [joinedList, me?.id]);

  const joinTournament = () => {
    joinTournamentMutation.mutateAsync({ usersIds: [me?.id ?? -1] }).then(() => {
      toast.success('Вы успешно присоединились к турниру');
    });
  };

  const leaveTournament = () => {
    confirmUnregister(() => {
      leaveTournamentMutation.mutateAsync({ id: me?.id ?? -1 }).then(() => {
        toast.success('Вы успешно покинули турнир');
      });
    });
  };

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
            color={!isRegistered ? 'green' : 'red'}
            onClick={!isRegistered ? joinTournament : leaveTournament}
          >
            {!isRegistered ? 'Зарегистрироваться' : 'Отменить регистрацию'}
          </Button>

          {permissions.canCrudTournament && (
            <RegistrationAdminMenu
              tournamentId={tournament.data.id}
              joinedUsers={joinedList}
            />
          )}
        </Flex>

        <RegistrationTable
          tournamentId={tournament.data.id}
          isAdmin={permissions.canCrudTournament}
          usersList={joinedList}
        />
      </Flex>
    </Page>
  );
}

export default TournamentRegistrationPage;

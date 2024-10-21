import { Box, Button, Flex, ScrollArea } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import {
  useGetOpenedTournamentQuery,
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

function TournamentRegistrationPage() {
  const me = useAtomValue(meAtom);

  const openedTournament = useGetOpenedTournamentQuery();
  const joinTournamentMutation = useJoinTournamentMutation();
  const leaveTournamentMutation = useLeaveTournamentMutation();

  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');
  const permissions = useUserPermissions();

  const confirmUnregister = useConfirmModal({
    title: 'Отмена регистрации',
    description: 'Вы действительно хотите отменить регистрацию на турнир?',
    confirmTitle: 'Отменить регистрацию',
    denyTitle: 'Назад',
  });

  const joinedList = useMemo(() => {
    return (openedTournament.data?.registeredUsers ?? []).sort(
      (a, b) => b.rating - a.rating
    );
  }, [openedTournament.data]);

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

  if (openedTournament.isLoading) {
    return <Spinner />;
  }

  if (!openedTournament.data) {
    return <Navigate to={appRoutes.TOURNAMENTS} />;
  }

  return (
    <Page title={'Регистрация на турнир'}>
      <Flex direction={'column'} gap={'4'}>
        <TournamentRegistrationHeader
          tournament={openedTournament.data}
          registeredUsersCount={joinedList.length}
        />

        <Flex justify={'between'}>
          {!isRegistered && (
            <Button
              variant={'solid'}
              size={isMobileDevice ? '2' : '3'}
              color={'green'}
              onClick={joinTournament}
            >
              Зарегистрироваться
            </Button>
          )}

          {isRegistered && (
            <Button
              variant={'solid'}
              size={isMobileDevice ? '2' : '3'}
              color={'red'}
              onClick={leaveTournament}
            >
              Отменить регистрацию
            </Button>
          )}

          {permissions.canCrudTournament && (
            <RegistrationAdminMenu joinedUsers={joinedList} />
          )}
        </Flex>

        <RegistrationTable
          isAdmin={permissions.canCrudTournament}
          usersList={joinedList}
        />
      </Flex>
    </Page>
  );
}

export default TournamentRegistrationPage;

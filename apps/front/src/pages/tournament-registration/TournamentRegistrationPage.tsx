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
import RegistrationAdminMenu from './components/AdminMenu/AdminMenu';
import TournamentRegistrationHeader from './components/Header/Header';
import RegistrationTable from './components/RegistrationTable/RegistrationTable';

function TournamentRegistrationPage() {
  const me = useAtomValue(meAtom);

  const openedTournament = useGetOpenedTournamentQuery();
  const joinTournament = useJoinTournamentMutation();
  const leaveTournament = useLeaveTournamentMutation();

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

  const joinTournamentSelf = () => {
    joinTournament.mutateAsync({ usersIds: [me?.id ?? -1] }).then(() => {
      toast.success('Вы успешно зарегистрировались на турнире');
    });
  };

  const leaveTournamentSelf = () => {
    confirmUnregister(() => {
      leaveTournament.mutateAsync({ id: me?.id ?? -1 }).then(() => {
        toast.success('Вы успешно отменили регистрацию на турнире');
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
              size={'2'}
              color={'green'}
              onClick={joinTournamentSelf}
            >
              Зарегистрироваться
            </Button>
          )}

          {isRegistered && (
            <Button
              variant={'solid'}
              size={'3'}
              color={'red'}
              onClick={leaveTournamentSelf}
            >
              Отменить регистрацию
            </Button>
          )}

          {permissions.canCrudTournament && (
            <RegistrationAdminMenu joinedUsers={joinedList} />
          )}
        </Flex>

        <Box mr={'-3'}>
          <ScrollArea scrollbars="vertical" style={{ height: 'calc(100vh - 232px)' }}>
            <Box pr={'3'}>
              <RegistrationTable
                isAdmin={permissions.canCrudTournament}
                usersList={joinedList}
              />
            </Box>
          </ScrollArea>
        </Box>
      </Flex>
    </Page>
  );
}

export default TournamentRegistrationPage;

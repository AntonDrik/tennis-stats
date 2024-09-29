import { useAtomValue } from 'jotai';
import React, { useMemo } from 'react';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  useGetOpenedTournamentQuery,
  useRegisterUserOnTournamentMutation,
  useUnregisterUserFromTournamentMutation,
} from '../../core/api';
import { meAtom } from '../../core/store';
import { useBackButton } from '../../layouts/MainLayout';
import { appRoutes } from '../../routes/routes.constant';
import { Page, Spinner, useModal } from '../../shared/components';
import { useConfirmModal } from '../../shared/components/Modals';
import { useUserPermissions } from '../../shared/hooks';
import TournamentRegistrationHeader from './components/Header/Header';
import RegistrationTable from './components/RegistrationTable/RegistrationTable';
import AddUsersToTournamentModal from './modals/AddUserModal/AddUserModal';
import StartTournamentModal from './modals/StartTournamentModal/StartTournamentModal';

function TournamentRegistrationPage() {
  const me = useAtomValue(meAtom);

  const openedTournament = useGetOpenedTournamentQuery();
  const registerOnTournament = useRegisterUserOnTournamentMutation();
  const unregisterFromTournament = useUnregisterUserFromTournamentMutation();

  const modal = useModal();
  const navigate = useNavigate();
  const permissions = useUserPermissions();
  const confirmUnregister = useConfirmModal({
    title: 'Вы действительно хотите отменить регистрацию на турнир?',
    confirmTitle: 'Отменить регистрацию',
    denyTitle: 'Назад',
  });

  const usersList = useMemo(() => {
    return openedTournament.data?.registeredUsers ?? [];
  }, [openedTournament.data]);

  const isRegistered = useMemo(() => {
    return Boolean(usersList.find((user) => user.id === me?.id));
  }, [usersList, me?.id]);

  const registerSelf = () => {
    registerOnTournament.mutateAsync({ usersIds: [me?.id ?? -1] }).then(() => {
      toast.success('Вы успешно зарегистрировались на турнире');
    });
  };

  const unregisterSelf = () => {
    confirmUnregister(() => {
      unregisterFromTournament.mutateAsync({ id: me?.id ?? -1 }).then(() => {
        toast.success('Вы успешно отменили регистрацию на турнире');
      });
    });
  };

  const openAddUsersModal = () => {
    modal.open(<AddUsersToTournamentModal />, {
      maxWidth: 'sm',
      fullWidth: true,
    });
  };

  const openStartTournamentModal = () => {
    modal.open(
      <StartTournamentModal
        registeredUsers={usersList}
        onSuccess={(tournamentId) => {
          navigate(appRoutes.TOURNAMENT_BY_ID(tournamentId));
        }}
      />,
      {
        maxWidth: 'sm',
        fullWidth: true,
      }
    );
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
      <Box>
        <TournamentRegistrationHeader
          tournament={openedTournament.data}
          registeredUsersCount={usersList.length}
        />

        <Box
          display={'flex'}
          justifyContent={'flex-start'}
          flexWrap={'wrap'}
          gap={2}
          mb={2}
        >
          {permissions.canCrudTournament && (
            <React.Fragment>
              <Button
                variant={'contained'}
                color={'success'}
                onClick={openStartTournamentModal}
              >
                <PlayArrowIcon sx={{ mr: 1 }} />
                Запустить турнир
              </Button>

              <Button variant={'contained'} onClick={openAddUsersModal}>
                <AddIcon sx={{ mr: 1 }} />
                Добавить пользователей
              </Button>
            </React.Fragment>
          )}

          {!isRegistered && (
            <Button variant={'contained'} onClick={registerSelf}>
              Зарегистрироваться
            </Button>
          )}

          {isRegistered && (
            <Button
              variant={'contained'}
              color={'error'}
              onClick={unregisterSelf}
            >
              Отменить регистрацию
            </Button>
          )}
        </Box>

        <RegistrationTable
          isAdmin={permissions.canCrudTournament}
          usersList={usersList}
        />
      </Box>
    </Page>
  );
}

export default TournamentRegistrationPage;

import { Button, DropdownMenu } from '@radix-ui/themes';
import { ITournament, IUser } from '@tennis-stats/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../../routes/routes.constant';
import { useModal } from '../../../../shared/components';
import useMediaQuery from '../../../../shared/hooks/useMediaQuery';
import { PlayIcon, PlusIcon } from '../../../../shared/svg-icons';
import AddUsersToTournamentModal from '../../modals/AddUserModal/AddUserModal';
import StartTournamentModal from '../../modals/StartTournamentModal/StartTournamentModal';

interface IProps {
  tournament: ITournament;
  joinedUsers: IUser[];
}

function RegistrationAdminMenu(props: IProps) {
  const modal = useModal();
  const navigate = useNavigate();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const openStartTournamentModal = () => {
    modal.open(
      <StartTournamentModal
        tournament={props.tournament}
        onSuccess={(tournamentId) => {
          navigate(appRoutes.TOURNAMENT_BY_ID(tournamentId));
        }}
      />
    );
  };

  const openAddUsersModal = () => {
    modal.open(
      <AddUsersToTournamentModal
        tournamentId={props.tournament.id}
        joinedUsers={props.joinedUsers}
      />
    );
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" size={isMobileDevice ? '2' : '3'} color={'orange'}>
          Действия
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align={'end'}>
        <DropdownMenu.Item onClick={openAddUsersModal}>
          <PlusIcon />
          Добавить пользователей
        </DropdownMenu.Item>

        <DropdownMenu.Item color={'green'} onClick={openStartTournamentModal}>
          <PlayIcon />
          Запустить турнир
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default RegistrationAdminMenu;

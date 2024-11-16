import { Button, DropdownMenu } from '@radix-ui/themes';
import { IUser } from '@tennis-stats/types';
import { useSetAtom } from 'jotai';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../../routes/routes.constant';
import { useModal } from '../../../../shared/components';
import useMediaQuery from '../../../../shared/hooks/useMediaQuery';
import { PlayIcon, PlusIcon } from '../../../../shared/svg-icons';
import { tournamentActiveTabAtom } from '../../../tournament/states/active-tab.state';
import AddUsersToTournamentModal from '../../modals/AddUserModal/AddUserModal';
import StartTournamentModal from '../../modals/StartTournamentModal/StartTournamentModal';

interface IProps {
  tournamentId: number;
  joinedUsers: IUser[];
}

function RegistrationAdminMenu(props: IProps) {
  const setTournamentActiveTab = useSetAtom(tournamentActiveTabAtom);

  const modal = useModal();
  const navigate = useNavigate();
  const isMobileDevice = useMediaQuery('only screen and (max-width : 576px)');

  const openStartTournamentModal = () => {
    modal.open(
      <StartTournamentModal
        tournamentId={props.tournamentId}
        onSuccess={(tournamentId) => {
          setTournamentActiveTab('0');
          navigate(appRoutes.TOURNAMENT_BY_ID(tournamentId));
        }}
      />
    );
  };

  const openAddUsersModal = () => {
    modal.open(
      <AddUsersToTournamentModal
        tournamentId={props.tournamentId}
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

import { Button, DropdownMenu } from '@radix-ui/themes';
import { IUser } from '@tennis-stats/types';
import { useSetAtom } from 'jotai';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../../routes/routes.constant';
import { useModal } from '../../../../shared/components';
import { PlayIcon, PlusIcon } from '../../../../shared/svg-icons';
import { tabsAtom } from '../../../tournament/states/Tabs.state';
import AddUsersToTournamentModal from '../../modals/AddUserModal/AddUserModal';
import StartTournamentModal from '../../modals/StartTournamentModal/StartTournamentModal';

interface IProps {
  joinedUsers: IUser[];
}

function RegistrationAdminMenu(props: IProps) {
  const setTournamentTab = useSetAtom(tabsAtom);

  const modal = useModal();
  const navigate = useNavigate();

  const openStartTournamentModal = () => {
    modal.open(
      <StartTournamentModal
        joinedUsers={props.joinedUsers}
        onSuccess={(tournamentId) => {
          setTournamentTab('0');
          navigate(appRoutes.TOURNAMENT_BY_ID(tournamentId));
        }}
      />
    );
  };

  const openAddUsersModal = () => {
    modal.open(<AddUsersToTournamentModal joinedUsers={props.joinedUsers} />);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft" size={'3'} color={'orange'}>
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

import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { ITournament } from '@tennis-stats/types';
import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFinishTournamentMutation } from '../../../../core/api';
import { appRoutes } from '../../../../routes/routes.constant';
import { useConfirmModal, useModal } from '../../../../shared/components';
import {
  CheckCircleIcon,
  PersonIcon,
  PlayIcon,
  PlusIcon,
  SettingsIcon,
} from '../../../../shared/svg-icons';
import AddUserModal from '../../modals/AddUser/AddUserModal';
import CreateNewTour from '../../modals/CreateNewTour/CreateNewTour';
import AttachPlayoff from '../../modals/AttachPlayoff/AttachPlayoff';

interface IProps {
  tournament: ITournament;
  showAddTourItem?: boolean;
  showAddPersonItem?: boolean;
  showAttachPlayoffItem?: boolean;
  showFinishTournament?: boolean;
}

function TournamentActionsMenu(props: IProps) {
  const tournament = props.tournament;

  const finishTournamentMutation = useFinishTournamentMutation(tournament.id);

  const modal = useModal();
  const navigate = useNavigate();

  const finishTournamentConfirmModal = useConfirmModal({
    title: 'Вы действительно хотите завершить турнир?',
    description: tournament.handleRating
      ? 'Рейтинг пользователей будет пересчитан на основе сыгранных матчей'
      : null,
    confirmTitle: 'Да, завершить',
    denyTitle: 'Нет, отменить',
    confirmButtonProps: { color: 'green' },
  });

  const hasPlayoffMatches = useMemo(() => {
    return tournament.tours.some((tour) => tour.playOffStage);
  }, [tournament.tours]);

  const openCreateTourModal = () => {
    if (hasPlayoffMatches) {
      return;
    }

    modal.open(<CreateNewTour />);
  };

  const openAddUserModal = () => {
    if (hasPlayoffMatches) {
      return;
    }

    modal.open(<AddUserModal />);
  };

  const openAttachPlayoffModal = () => {
    if (hasPlayoffMatches) {
      return;
    }

    modal.open(<AttachPlayoff tournamentId={tournament.id} />);
  };

  const finishTournament = () => {
    finishTournamentConfirmModal(() => {
      finishTournamentMutation.mutateAsync().then(() => {
        toast.success('Турнир завершен');
        navigate(appRoutes.TOURNAMENTS);
      });
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant={'soft'} color={'indigo'} size={'3'}>
          <SettingsIcon />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content align={'end'}>
        {props.showAddTourItem && (
          <DropdownMenu.Item onClick={openCreateTourModal} disabled={hasPlayoffMatches}>
            <PlusIcon />
            Добавить тур
          </DropdownMenu.Item>
        )}

        {props.showAddPersonItem && (
          <DropdownMenu.Item onClick={openAddUserModal} disabled={hasPlayoffMatches}>
            <PersonIcon />
            Добавить пользователя
          </DropdownMenu.Item>
        )}

        {props.showAttachPlayoffItem && (
          <DropdownMenu.Item
            color={'purple'}
            disabled={hasPlayoffMatches}
            onClick={openAttachPlayoffModal}
          >
            <PlayIcon />
            Начать плей-офф
          </DropdownMenu.Item>
        )}

        {props.showAttachPlayoffItem && props.showFinishTournament && <DropdownMenu.Separator />}

        {props.showFinishTournament && (
          <DropdownMenu.Item color={'green'} onClick={finishTournament}>
            <CheckCircleIcon />
            Завершить турнир
          </DropdownMenu.Item>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default TournamentActionsMenu;

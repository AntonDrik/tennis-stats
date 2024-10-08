import { DropdownMenu, IconButton } from '@radix-ui/themes';
import { ITournament } from '@tennis-stats/types';
import React, { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFinishTournamentMutation } from '../../../../../../core/api';
import { appRoutes } from '../../../../../../routes/routes.constant';
import { useConfirmModal, useModal } from '../../../../../../shared/components';
import {
  CheckCircleIcon,
  PlayIcon,
  PlusIcon,
  SettingsIcon,
} from '../../../../../../shared/svg-icons';
import CreateNewTour from '../../../../modals/CreateNewTour/CreateNewTour';
import CreatePlayoff from '../../../../modals/CreatePlayoff/CreatePlayoff';

interface IProps {
  tournament: ITournament;
}

function TournamentAdminMenu({ tournament }: IProps) {
  const finishTournamentMutation = useFinishTournamentMutation();

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

  const openCreatePlayoffModal = () => {
    if (hasPlayoffMatches) {
      return;
    }

    modal.open(<CreatePlayoff tournamentId={tournament.id} />);
  };

  const finishTournament = () => {
    finishTournamentConfirmModal(() => {
      finishTournamentMutation.mutateAsync().then(() => {
        toast.success('Турнир завершен. Рейтинг пересчитан');
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
        <DropdownMenu.Item onClick={openCreateTourModal} disabled={hasPlayoffMatches}>
          <PlusIcon />
          Добавить тур
        </DropdownMenu.Item>

        <DropdownMenu.Item
          color={'purple'}
          disabled={hasPlayoffMatches}
          onClick={openCreatePlayoffModal}
        >
          <PlayIcon />
          Начать плейофф
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item color={'green'} onClick={finishTournament}>
          <CheckCircleIcon />
          Завершить турнир
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default TournamentAdminMenu;

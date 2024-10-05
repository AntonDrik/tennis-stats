import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { parseISOWithFormat } from '@tennis-stats/helpers';
import { ETournamentStatus, ITournament } from '@tennis-stats/types';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  useRemoveTourMutation,
  useFinishTournamentMutation,
  useRemovePlayoffMutation,
} from '../../../../core/api';
import { tournamentAtom } from '../../../../core/store';
import { appRoutes } from '../../../../routes/routes.constant';
import { useModal } from '../../../../shared/components';
import { useConfirmModal } from '../../../../shared/components/Modals';
import { useUserPermissions } from '../../../../shared/hooks';
import CreateNewTour from '../../modals/CreateNewTour/CreateNewTour';
import CreatePlayoff from '../../modals/CreatePlayoff/CreatePlayoff';
import LeaderboardModal from '../../modals/LeaderboardModal/LeaderboardModal';
import { tabsAtom } from '../../state/Tabs.state';

interface IProps {
  tournament: ITournament;
}

function TournamentControlPanel({ tournament }: IProps) {
  const tournamentState = useAtomValue(tournamentAtom);
  const setTabsState = useSetAtom(tabsAtom);

  const removeTourMutation = useRemoveTourMutation(tournamentState);
  const removePlayoffMutation = useRemovePlayoffMutation();
  const finishTournamentMutation = useFinishTournamentMutation();

  const modal = useModal();
  const permissions = useUserPermissions();
  const navigate = useNavigate();

  const isPlayoffStage = tournament.status === ETournamentStatus.PLAYOFF;

  const removeTourConfirmModal = useConfirmModal({
    title: 'Вы действительно хотите удалить тур?',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  const removePlayoffConfirmModal = useConfirmModal({
    title: 'Вы действительно хотите удалить плейофф?',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  const openNewTourModal = () => {
    modal.open(<CreateNewTour />, { maxWidth: 'sm' });
  };

  const openLeaderboard = () => {
    modal.open(<LeaderboardModal tournamentId={tournament.id} />);
  };

  const openCreatePlayoffModal = () => {
    modal.open(<CreatePlayoff tournamentId={tournament.id} />, {
      maxWidth: 'sm',
      fullWidth: true,
    });
  };

  const removePlayoff = () => {
    removePlayoffConfirmModal(() => {
      removePlayoffMutation.mutateAsync().then(() => {
        toast.success('Плейофф успешно удален');
        setTabsState(0);
      });
    });
  };

  const removeTour = () => {
    removeTourConfirmModal(() => {
      removeTourMutation.mutateAsync().then(() => {
        toast.success('Турнир успешно удален');
        setTabsState(0);
      });
    });
  };

  const finishTournament = () => {
    finishTournamentMutation.mutateAsync().then(() => {
      toast.success('Турнир завершен. Рейтинг пересчитан');
      navigate(appRoutes.TOURNAMENTS);
    });
  };

  return (
    <Box mb={3}>
      <Typography variant={'h4'} mb={1}>
        Турнир от {parseISOWithFormat(tournament.date, 'dd.MM.yyyy')}
      </Typography>

      <Stack direction={'row'} gap={2}>
        {permissions.canCrudTournament && (
          <Stack
            direction={'row'}
            gap={2}
            justifyContent={'space-between'}
            width={'100%'}
          >
            {tournament.status !== ETournamentStatus.PLAYOFF && (
              <Stack direction={'row'} gap={1}>
                <Button variant={'contained'} size={'small'} onClick={openNewTourModal}>
                  Добавить тур
                </Button>

                {tournamentState?.selectedTour && (
                  <Button
                    variant={'contained'}
                    size={'small'}
                    color={'error'}
                    onClick={removeTour}
                  >
                    Удалить тур № {tournamentState.selectedTour.number}
                  </Button>
                )}
              </Stack>
            )}

            <Stack direction={'row'} gap={1}>
              <Button variant={'contained'} size={'small'} onClick={openLeaderboard}>
                Таблица лидеров
              </Button>

              <Button
                variant={'contained'}
                size={'small'}
                color={!isPlayoffStage ? 'primary' : 'error'}
                onClick={!isPlayoffStage ? openCreatePlayoffModal : removePlayoff}
              >
                {!isPlayoffStage ? 'Начать плейофф' : 'Удалить плейофф'}
              </Button>

              <Button
                variant={'contained'}
                size={'small'}
                color={'primary'}
                onClick={finishTournament}
              >
                Завершить турнир
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

export default TournamentControlPanel;

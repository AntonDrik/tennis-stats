import { Flex, IconButton, Tabs, Text } from '@radix-ui/themes';
import { ITour } from '@tennis-stats/types';
import { useSetAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useRemovePlayoffMutation, useRemoveTourMutation } from '../../../../core/api';
import { tournamentAtom } from '../../../../core/store';
import { useConfirmModal } from '../../../../shared/components';
import { CloseIcon } from '../../../../shared/svg-icons';
import { useCanManageTournament } from '../../hooks';
import { leaderboardTabAtom } from '../../modals/LeaderboardModal/LeaderboardModal.state';
import { tournamentActiveTabAtom } from '../../states/active-tab.state';

import Styled from './Tabs.styles';

interface IProps {
  tournamentId: number;
  tours: ITour[];
}

function TournamentTabs(props: IProps) {
  const tournamentState = useAtomValue(tournamentAtom);
  const setActiveTab = useSetAtom(tournamentActiveTabAtom);
  const setLeaderboardTab = useSetAtom(leaderboardTabAtom);

  const removeTourMutation = useRemoveTourMutation(tournamentState);
  const removePlayoffMutation = useRemovePlayoffMutation(props.tournamentId);

  const canManageTournament = useCanManageTournament();

  const removeTourConfirmModal = useConfirmModal({
    title: `Вы действительно хотите удалить тур № ${tournamentState.selectedTour?.number}?`,
    description: 'Таблица лидеров будет перестроена',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  const removePlayoffConfirmModal = useConfirmModal({
    title: 'Вы действительно хотите удалить плей-офф?',
    confirmTitle: 'Да, удалить',
    denyTitle: 'Нет, отменить',
  });

  const hasPlayoffMatches = useMemo(() => {
    return props.tours.some((tour) => tour.playOffStage);
  }, [props.tours]);

  const removeTour = () => {
    removeTourConfirmModal(() => {
      removeTourMutation.mutateAsync().then(() => {
        toast.success('Тур успешно удален');
        setActiveTab('0');
      });
    });
  };

  const removePlayoff = () => {
    removePlayoffConfirmModal(() => {
      removePlayoffMutation.mutateAsync().then(() => {
        toast.success('Плей-офф успешно удален');
        setActiveTab('0');
        setLeaderboardTab('tours');
      });
    });
  };

  return (
    <Tabs.List>
      {props.tours
        .filter((tour) => !tour.playOffStage)
        .map((tour, index) => (
          <Tabs.Trigger key={`tour-tab-${tour.id}`} value={index.toString()}>
            <Text>{`Тур ${tour.number}`}</Text>

            <Flex ml={'2'} align={'center'}>
              {canManageTournament && !hasPlayoffMatches && (
                <IconButton
                  variant={'ghost'}
                  size={'1'}
                  radius={'full'}
                  color={'red'}
                  onClick={removeTour}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Flex>
          </Tabs.Trigger>
        ))}

      {hasPlayoffMatches && (
        <Styled.PlayoffTab value={'-1'}>
          Плей-офф
          {canManageTournament && (
            <Flex ml={'2'} align={'center'}>
              <IconButton
                variant={'ghost'}
                size={'1'}
                radius={'full'}
                color={'red'}
                onClick={() => removePlayoff()}
              >
                <CloseIcon />
              </IconButton>
            </Flex>
          )}
        </Styled.PlayoffTab>
      )}
    </Tabs.List>
  );
}

export default TournamentTabs;
